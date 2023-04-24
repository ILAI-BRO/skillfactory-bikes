import React from 'react';
import Form from '../../components/Form/Form.jsx';
import { reportFields, reportFormValues, reportValidationSchema, reportEditFields, reportEditValidationSchema } from '../../components/Form/form.js';
import { createUnauthReport, createReport, getReport, editReport } from '../../service/reports.js';
import { useSelector } from 'react-redux';
import { user } from '../../redux/selectors.js';
import styles from './report.module.scss'
import { getToken } from '../../service/tokenService.js';
import { getOfficers } from '../../service/officers.js';
import { checkAuth } from '../../utils/checkAuth.js';

const Report = () => {

  const userData = useSelector(user);

  const [report, setReport] = React.useState(null);

  const [officers, setOffisers] = React.useState(null);
  const [officersError, setOffisersError] = React.useState(false);

  const [processMessage, setProcessMessage] = React.useState(null);

  const [type, setType] = React.useState('');
  const [officer, setOfficer] = React.useState(null);

  const reportId = window.location.pathname.split('/')[3];

  React.useEffect(() => {
    if(reportId){
      // Налачие reportId говорит о том, что это форма редактирования сообщения, на которую unauth user попасть не должен
      if(checkAuth(userData.data, userData.status)){
        getOfficers()
        .then((data) => setOffisers(data.officers))
        .catch(() => {
          setProcessMessage('Ошибка при получении сотрудников');
          setOffisersError(true);
          setOffisers([]);
        })
        getReport(reportId)
        .then((data) => {
          setReport(data.data)
          setType(data.data.type)
          setOfficer(data.data.officer)
        })
        .catch(() => {
          setProcessMessage('Ошибка при получении данных о сообщении');
        })
      }

    }else{
      if(userData.data && userData.status){
        getOfficers()
        .then((data) => setOffisers(data.officers))
        .catch(() => {
          setProcessMessage('Ошибка при получении сотрудников');
          setOffisersError(true);
          setOffisers([]);
        })
      }
    }
  }, [userData.data, userData.status]);

  const onReportHandler = (values) => {
    setProcessMessage(null)

    if(type.length === 0){
      return setProcessMessage('Выберите тип велосипеда')
    }
    
    if(userData.data && getToken()){
      createReport({...values, type, officer})
      .then(() => setProcessMessage('Заявка успешно создана'))
      .catch(() => setProcessMessage('Не удалось создать заявку'))
    }else{
      createUnauthReport({...values, type})
      .then(() => setProcessMessage('Заявка успешно создана'))
      .catch(() => setProcessMessage('Не удалось создать заявку'))
    }
  };

  const onEditHanlder = (values) => {
    editReport({...values, type, officer, id: report._id})
    .then(() => setProcessMessage('Сообщение успешно обновлено'))
    .catch((data) => setProcessMessage(data.response.data.message))
  }

  const officersLoaded = userData.data && userData.status === 'fulfilled' && officers

  if(reportId && report){
    return (
      <section className="sectionReport">
        <Form 
            fields={reportEditFields}
            formValues={
              {
              ownerFullName: report.ownerFullName, 
              licenseNumber: report.licenseNumber, 
              color: report.color,
              date: report.date,
              description: report.description,
              resolution: report.resolution
              }
            } 
            validationSchema={reportEditValidationSchema} 
            onSubmit={onEditHanlder} 
            submitName="Редактировать"
            formName="Редактирование сообщения"
            processMessage={processMessage}
            isDirty={true}
            isValided={true}
        >
          <div className={styles.selectList}>
            <label htmlFor="type">Тип:</label>
            <select defaultValue={report.type} name="type" onClick={(e) => setType(e.target.value)}>
              <option value="">Выберите тип велосипеда</option>
              <option value="general">Обычный</option>
              <option value="sport">Спортивный</option>
            </select>
          </div>
          {
          userData.data && userData.status === 'fulfilled' && !officersLoaded
          ?
          <p className="process-message">Загрузка сотрудников...</p>
          :
          officersError
          ?
          null
          :
          officers
          &&
          <div className={styles.selectList}>
            <label htmlFor="officer">Сотрудник:</label>
            <select defaultValue={report.officer} name="officer" onClick={(e) => setOfficer(e.target.value)}>
              <option value="">Выберите сотрудника</option>
              {officers.filter((el) => el.approved === true).map((el) => (
                  <option value={el._id} key={el._id}>{el.lastName} {el.firstName}</option>
              ))}
            </select>
          </div>
          }
        </Form>
      </section>
    )
  }else if(!reportId && !report){
    return (
      <section className="sectionReport">
        <Form 
            fields={reportFields}
            formValues={reportFormValues} 
            validationSchema={reportValidationSchema} 
            onSubmit={onReportHandler} 
            submitName="Сообщить"
            formName="Сообщить о краже"
            processMessage={processMessage}
        >
          <div className={styles.selectList}>
            <label htmlFor="type">Тип:</label>
            <select name="type" onClick={(e) => setType(e.target.value)}>
              <option value="">Выберите тип велосипеда</option>
              <option value="general">Обычный</option>
              <option value="sport">Спортивный</option>
            </select>
          </div>
          {
          userData.data && userData.status === 'fulfilled' && !officersLoaded
          ?
          <p className="process-message">Загрузка сотрудников...</p>
          :
          officersError
          ?
          null
          :
          officers
          &&
          <div className={styles.selectList}>
            <label htmlFor="officer">Сотрудник:</label>
            <select name="officer" onClick={(e) => setOfficer(e.target.value)}>
              <option value="">Выберите сотрудника</option>
              {officers.filter((el) => el.approved === true).map((el) => (
                  <option value={el._id} key={el._id}>{el.lastName} {el.firstName}</option>
              ))}
            </select>
          </div>
          }
        </Form>
      </section>
    )
  }
}

export default Report