import React from 'react'
import styles from './logoutButton.module.scss';
import { removeToken } from '../../service/tokenService';

const LogoutButton = () => {

  const onClickHandler = () => {
    removeToken();
    window.location.href = '/'
  }

  return (
    <button className={styles.logoutButton} onClick={onClickHandler}>
        Выйти
    </button>
  )
}

export default LogoutButton