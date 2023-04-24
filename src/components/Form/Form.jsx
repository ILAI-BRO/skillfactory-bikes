import React from 'react'
import { Formik, Form as FormikForm } from 'formik';
import FormInput from '../FormInput/FormInput';
import styles from './form.module.scss';
import FormSubmit from '../FormSubmit/FormSubmit';

const Form = ({isValided, isDirty, children, fields, formValues, validationSchema, onSubmit, submitName, formName, processMessage}) => {
  return (
    <div>
        <Formik
        initialValues={formValues}
        onSubmit={(values) => {
          onSubmit(values)
        }
        }
        validationSchema={validationSchema}
        >
        {({values, errors, touched, handleChange, handleBlur, isValid = isValided, dirty = isDirty}) => (
            <FormikForm className={styles.form}>
            <div className={styles.formName}>{formName}</div>
            {fields.map((el) => (
                <FormInput 
                    label={el.label} 
                    name={el.name}
                    type={el.type} 
                    values={values} 
                    onBlur={handleBlur}
                    onChange={handleChange}
                    touched={touched}
                    errors={errors}
                    key={el.id}
                />
            ))}
            { children }
            <FormSubmit isValid={isValid} dirty={dirty} name={submitName}/>
            </FormikForm>
        )}
        </Formik>
        {processMessage && <p className='process-message'>{processMessage}</p>}
    </div>
  )
}

export default Form