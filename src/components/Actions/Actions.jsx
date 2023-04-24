import React from 'react'
import styles from './actions.module.scss'
import { useSelector } from 'react-redux'
import { user } from '../../redux/selectors'

const actions = [
  {id: 1, name: 'Войти', href: '/login', color: 'var(--light-blue)', hideWithAuth: true},
  {id: 2, name: 'Регистрация', href: '/registration', color: 'var(--light-red)', hideWithAuth: true},
  {id: 3, name: 'Сообщить о краже', href: '/report', color: 'var(--light-red)', hideWithAuth: false}
]

const Actions = () => {

  const userData = useSelector(user);

  const userIsLoaded = userData.status === 'fulfilled' || userData.status === 'rejected' || userData.status === 'idle'

  return (
    userIsLoaded
    &&
    <div className={styles.actions}>
      {actions.map((el) => (
        userData.data && userData.status === 'fulfilled'
        &&
        el.hideWithAuth
        ?
        null
        :
        <a href={el.href} className={styles.actionItem} style={{background: `${el.color}`}} key={el.id}>
          {el.name}
        </a>
      ))}
    </div>
  )
}

export default Actions