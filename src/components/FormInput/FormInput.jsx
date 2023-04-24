import React from 'react';
import { Field } from 'formik';
import styles from './formInput.module.scss'

const FormInput = ({label, name, onBlur, onChange, values, touched, errors, type}) => {
  return (
    <div className={styles.formInputWrapper}>
      <label htmlFor={name}>{label}:</label>
      <Field type={type} onBlur={onBlur} onChange={onChange} name={name} value={!values[`${name}`] ? '' : values[`${name}`]} className={styles.formInput}/>
      {touched[`${name}`] && errors[`${name}`] && <p className='error-message'>{errors[`${name}`]}</p>}
    </div>
  )
}

export default FormInput