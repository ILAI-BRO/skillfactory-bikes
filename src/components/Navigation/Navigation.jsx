import React from 'react'
import styles from './navigation.module.scss';

const navigation = [
    {id: 1, path: '/reports', isProtected: true, name: 'Заявки'},
    {id: 2, path: '/officers', isProtected: true, name: 'Сотрудники'}
]

const Navigation = () => {
  return (
    <nav className="navigation">
        {navigation.map((el) => (
             <a href={el.path} className={styles.navigationLink} key={el.id}>{el.name}</a>
        ))}
    </nav>
  )
}

export default Navigation