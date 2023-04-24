import React from 'react'
import styles from './editLink.module.scss';

const EditLink = ({href}) => {
  return (
    <a href={href} className={styles.editLink}>Редактировать</a>
  )
}

export default EditLink