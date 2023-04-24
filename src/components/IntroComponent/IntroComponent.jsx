import React from 'react'
import styles from './introComponent.module.scss';
import Actions from '../Actions/Actions';

const IntroComponent = () => {
  return (
    <div className={styles.introComponent}>
        <h1 className={styles.introComponentTitle}>BikesRent</h1>
        <p className={styles.introComponentText}> Известная компания, занимающаяся прокатом велосипедов в крупных городах России,
        испытывает проблемы с частой кражей их имущества (велосипедов).
        Как возможное решение проблемы, компания хочет вести учёт этих случаев и отслеживать прогресс.</p>
        <div className={styles.introComponentActions}>
          <Actions />
        </div>
    </div>
  )
}

export default IntroComponent