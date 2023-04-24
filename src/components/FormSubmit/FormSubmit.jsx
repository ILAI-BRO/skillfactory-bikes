import React from 'react'
import styles from './formSubmit.module.scss'

const FormSubmit = ({isValid, dirty, name}) => {
  return (
    <button disabled={!isValid && !dirty} type="submit" className={styles.formSubmit}>{name}</button>
  )
}

export default FormSubmit