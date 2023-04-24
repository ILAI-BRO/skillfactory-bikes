import React from 'react'
import styles from './listItem.module.scss'
import DetailsItem from '../DetailsItem/DetailsItem'

const reportDetails = [
  {id: 1, name: 'ФИО владельца', value: 'ownerFullName'},
  {id: 2, name: 'Номер лицензии', value: 'licenseNumber'},
  {id: 3, name: 'Цвет', value: 'color'},
  {id: 4, name: 'Тип', value: 'type'},
  {id: 5, name: 'Решение', value: 'resolution'},
];

const officerDetails = [
  {id: 1, name: 'Имя', value: 'firstName'},
  {id: 2, name: 'Фамилия', value: 'lastName'},
  {id: 3, name: 'Email', value: 'email'},
  {id: 4, name: 'Одобрен', value: 'approved'},
];

const ListItem = ({report, officer, type}) => {
  if(type === 'officer'){
    return (
      <li className={styles.listItem}>
          <ul className="details">
              {officerDetails.map((el) => (
                <DetailsItem name={el.name} value={officer[`${el.value}`]} key={el.id}/>
              ))}
          </ul>
          <a href={`/officers/id=${officer._id}`} className={styles.listItemLink}>Подробнее</a>
      </li>
    )
  }else if(type === 'report'){
    return (
      <li className={styles.listItem}>
          <ul className="details">
              {reportDetails.map((el) => (
                <DetailsItem name={el.name} value={report[`${el.value}`]} key={el.id}/>
              ))}
          </ul>
          <a href={`/reports/id=${report._id}`} className={styles.listItemLink}>Подробнее</a>
      </li>
    )
  }
}

export default ListItem