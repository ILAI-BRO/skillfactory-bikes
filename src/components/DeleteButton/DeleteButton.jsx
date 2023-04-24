import React from 'react'
import styles from './deleteButton.module.scss'

const DeleteButton = ({removeFunction, id, redirectTo, setErrorMessage}) => {

    const onClickHandler = () => {
        removeFunction(id)
        .then(() => window.location.pathname = `${redirectTo}`)
        .catch(() => setErrorMessage('Не удалось удалить сообщение'))
    }

  return (
    <button className={styles.deleteButton} onClick={onClickHandler}>
        Удалить
    </button>
  )
}

export default DeleteButton