import React from 'react';
import styles from './header.module.scss';
import Navigation from '../Navigation/Navigation';
import Actions from '../Actions/Actions';
import LogoutButton from '../LogoutButton/LogoutButton';
import { useSelector } from 'react-redux';
import logo from '../../assets/images/logo.svg';
import { user } from '../../redux/selectors';

const Header = () => {

  const userData = useSelector(user);

  const userIsLoaded = userData.status === 'fulfilled' || userData.status === 'rejected' || userData.status === 'idle'

  return (
    <header className={styles.header}>
        <div className="container">
            <div className={styles.headerInner}>
                <a href="/">
                  <img src={logo} alt="BikesRent" className="logo" width={90} height={70}/>
                </a>
                {
                userData.data && userIsLoaded
                &&
                <Navigation />
                }
                <div className={styles.actionsWrapper}>
                  {
                  userIsLoaded
                  &&
                  <>
                  <Actions />
                  {
                  userData.data
                  &&
                  <LogoutButton />
                  }
                  </>
                  }
                </div>
            </div>
        </div>
    </header>
  )
}

export default Header