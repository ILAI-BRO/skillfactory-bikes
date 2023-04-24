import React from 'react'
import { getReports } from '../../service/reports'
import { useSelector } from 'react-redux';
import { user } from '../../redux/selectors';
import { checkAuth } from '../../utils/checkAuth';
import ListItem from '../../components/ListItem/ListItem';

const Reports = () => {

    const userData = useSelector(user);

    const [reports, setReports] = React.useState(null);
    const [errorMessage, setErrorMessage] = React.useState(null);

    React.useEffect(() => {
        if(checkAuth(userData.data, userData.status)){
            getReports()
            .then((data) => setReports(data.data))
            .catch(() => setErrorMessage('Ошибка при получении заявок'))
        }else{
            window.location.href = '/'
        }
    }, [userData.data, userData.status]);

    const reportsIsLoaded = userData.data && userData.status === 'fulfilled' && reports

  return (
    <section className="sectionReports">
        {
        errorMessage
        ?
        <p className="error-message">Ошибка при получении заявок</p>
        :
        reportsIsLoaded && !errorMessage
        ?
        <ul className="reports">
            {
            reports.length
            ?
            reports.map((el) => (
                <ListItem report={el} key={el._id} type="report"/>
            ))
            :
            <p className="error-message">Сообщений не существует</p>
            }
        </ul>
        :
        null
        }
    </section>
  )
}

export default Reports