import React from 'react'
import { getReport } from '../../service/reports'
import { getOfficer, removeOfficer } from '../../service/officers'
import DetailsItem from '../../components/DetailsItem/DetailsItem'
import { useSelector } from 'react-redux'
import { user } from '../../redux/selectors'
import { checkAuth } from '../../utils/checkAuth'
import DeleteButton from '../../components/DeleteButton/DeleteButton'
import EditLink from '../../components/EditLink/EditLink'
import { removeReport } from '../../service/reports'
import styles from './details.module.scss'

const reportDetails = [
    {id: 1, name: 'ФИО владельца', value: 'ownerFullName'},
    {id: 2, name: 'Номер лицензии', value: 'licenseNumber'},
    {id: 3, name: 'Цвет', value: 'color'},
    {id: 4, name: 'Тип', value: 'type'},
    {id: 5, name: 'Доп. информация', value: 'description'},
    {id: 6, name: 'Статус', value: 'status'},
    {id: 7, name: 'Сотрудник', value: 'officer'},
    {id: 8, name: 'Решение', value: 'resolution'},
]

const officerDetails = [
    {id: 1, name: 'Имя', value: 'firstName'},
    {id: 2, name: 'Фамилия', value: 'lastName'},
    {id: 3, name: 'Email', value: 'email'},
];

const Details = ({type}) => {

    const userData = useSelector(user);

    const [report, setReport] = React.useState(null);
    const [errorMessage, setErrorMessage] = React.useState(null);

    const [officer, setOfficer] = React.useState(null);

    React.useEffect(() => {
        if(checkAuth(userData.data, userData.status)){

            if(type === 'officers'){
                getOfficer(window.location.pathname.split('=')[1])
                .then((data) => setOfficer(data.data))
                .catch((data) => setErrorMessage(data.response.data.message))
            }else if(type === 'reports'){
                getReport(window.location.pathname.split('=')[1])
                .then((data) => {
                    setReport(data.data)
                    if(data.data.officer){
                        getOfficer(data.data.officer)
                        .then((data) => setOfficer(data.data))
                        .catch((data) => setErrorMessage(data.response.data.message))
                    }
                })
                .catch((data) => setErrorMessage(data.response.data.message))
            }
        }else{
            window.location.href = '/'
        }
    }, [])

    if(type === 'officers'){
        return (
            <section className="sectionDetails">
                {
                officer
                &&
                <>
                {officerDetails.map((el) => (
                    <DetailsItem name={el.name} value={officer[`${el.value}`]} key={el.id}/>
                ))}

                <div className={styles.actions}>
                    {userData.data.data.user.id !== officer._id && <DeleteButton removeFunction={removeOfficer} id={officer._id} redirectTo="/officers" setErrorMessage={setErrorMessage} />}
                    <EditLink href={`/officers/edit/${officer._id }`}/>
                </div>
                </>
                }
                {errorMessage && <p className='error-message'>{errorMessage}</p>}
            </section>
        )
    }else if(type === 'reports'){
        return (
            <section className="sectionDetails">
                {
                report
                &&
                <>
                {
                report.officer && officer
                ?
                reportDetails.map((el) => (
                    el.name === 'Сотрудник'
                    ?
                    <DetailsItem name={el.name} value={`${officer.firstName} ${officer.lastName} `} key={el.id}/>
                    :
                    <DetailsItem name={el.name} value={report[`${el.value}`]} key={el.id}/>
                ))
                :
                reportDetails.map((el) => (
                    <DetailsItem name={el.name} value={report[`${el.value}`]} key={el.id}/>
                ))
                }
                <div className={styles.actions}>
                    <DeleteButton removeFunction={removeReport} id={report._id} redirectTo="/reports" setErrorMessage={setErrorMessage} />
                    <EditLink href={`/reports/edit/${report._id }`}/>
                </div>
                </>
                }
                {errorMessage && <p className='error-message'>{errorMessage}</p>}
            </section>
        )
    }
}

export default Details