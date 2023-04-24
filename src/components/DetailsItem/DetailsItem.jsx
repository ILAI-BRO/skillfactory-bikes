import React from 'react';
import styles from './detailsItem.module.scss'
import { valueParser } from '../../utils/valueParsers';
import { bikeValues, statusValues } from '../../utils/valueParsers';

const DetailsItem = ({name, value}) => {
  return (
    <li className={styles.detailsItem}>
      <span>{name}:</span>
      {
      name === 'Тип'
      ? 
      valueParser(bikeValues, value)
      :
      name === 'Статус'
      ? 
      valueParser(statusValues, value)
      :
      name === 'Одобрен'
      ?
      value ? 'Да' : 'Нет'
      :
      value ? value : 'Нет данных'
      }
     </li>
  )
}

export default DetailsItem