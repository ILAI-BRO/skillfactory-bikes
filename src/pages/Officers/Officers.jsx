import React from 'react'
import { useSelector } from 'react-redux';
import { user } from '../../redux/selectors';
import { checkAuth } from '../../utils/checkAuth';
import { getOfficers } from '../../service/officers'
import ListItem from '../../components/ListItem/ListItem';
import styles from './officers.module.scss'

const Officers = () => {
    const userData = useSelector(user);

    const [officers, setOfficers] = React.useState(null);
    const [errorMessage, setErrorMessage] = React.useState(null);

    React.useEffect(() => {
        if(checkAuth(userData.data, userData.status)){
            getOfficers()
            .then((data) => setOfficers(data.officers))
            .catch(() => setErrorMessage('Ошибка при получении данных о сотруднике'))
        }else{
            window.location.href = '/'
        }
    }, [userData.data, userData.status]);

    const officerIsLoaded = userData.data && userData.status === 'fulfilled' && officers

  return (
    <section className="sectionOfficers">
        {
        errorMessage
        ?
        <p className="error-message">Ошибка при получении данных сотрудника</p>
        :
        officerIsLoaded && !errorMessage
        ?
        <>
        <ul className="officers">
            {officers.map((el) => (
                <ListItem officer={el} key={el._id} type="officer"/>
            ))}
        </ul>
        <a href="/officers/create" className={styles.officersLink}>Создать сотрудника</a>
        </>
        :
        null
        }
    </section>
  )
}

export default Officers