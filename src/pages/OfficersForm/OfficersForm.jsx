import React from 'react'
import Form from '../../components/Form/Form.jsx'
import { officerFields, officerFormValues, officerValidationSchema, officerEditFields } from '../../components/Form/form.js';
import styles from './officersForm.module.scss'
import { createOfficer, editOfficer } from '../../service/officers.js';
import { getOfficer } from '../../service/officers.js';
import { useSelector } from 'react-redux';
import { user } from '../../redux/selectors.js';
import { checkAuth } from '../../utils/checkAuth.js';

const OfficersForm = () => {

  const userData = useSelector(user);

    const [officer, setOfficer] = React.useState(null);

    const [processMessage, setProcessMessage] = React.useState(null);

    const [approved, setApproved] = React.useState(false);

    const onCreateHandler = (values) => {
      createOfficer({...values, approved})
      .then(() => setProcessMessage('Сотрудник успешно зарегистрирован'))
      .catch((data) => setProcessMessage(data.response.data.message))
    }

    const onEditHaldler = (values) => {
      editOfficer({...values, approved, id: officer._id})
      .then(() => setProcessMessage('Данные сотрудника успешно изменены'))
      .catch((data) => setProcessMessage(data.response.data.message))
    }

    const officerId = window.location.pathname.split('/')[3];

    React.useEffect(() => {
      if(checkAuth(userData.data, userData.status)){
        if(officerId){
          getOfficer(officerId)
          .then((data) => {
            setOfficer(data.data); 
            setApproved(data.data.approved)
          })
          .catch((data) => setProcessMessage(data.response.data.message))
        }
      }
    }, [userData.data, userData.status])

  if(officerId && officer){
      return(
        <section className="sectionOfficersCreate">
          <Form 
            fields={officerEditFields}
            formValues={{firstName: officer.firstName, lastName: officer.lastName}} 
            onSubmit={onEditHaldler}
            submitName="Редактировать"
            formName="Редактировать сотрудника"
            processMessage={processMessage}
            isDirty={true}
            isValided={true}
          >
          <div className={styles.checkbox}>
            <label htmlFor="approved">Одобрить:</label>
            <input type="checkbox" name="approved" defaultChecked={officer.approved} value={approved} onChange={() => setApproved(prev => !prev)}/>
          </div>
          </Form> 
      </section>
      )
  }else if(!officer && !officerId){
    return (
      <section className="sectionOfficersCreate">
          <Form 
            fields={officerFields}
            formValues={officerFormValues} 
            validationSchema={officerValidationSchema} 
            onSubmit={onCreateHandler} 
            submitName="Создать сотрудника"
            formName="Создать"
            processMessage={processMessage}
          >
          <div className={styles.checkbox}>
            <label htmlFor="approved">Одобрить:</label>
            <input type="checkbox" name="approved" value={approved} onChange={() => setApproved(prev => !prev)}/>
          </div>
          </Form> 
      </section>
    )
  }
}

export default OfficersForm