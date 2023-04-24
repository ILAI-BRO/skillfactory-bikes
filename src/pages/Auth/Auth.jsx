import React from 'react'
import Form from '../../components/Form/Form.jsx'
import { 
  loginFields, 
  loginFormValues, 
  loginValidationSchema, 
  registerFields, 
  registerFormValues, 
  registerValidationSchema } from '../../components/Form/form.js'
import { useDispatch } from 'react-redux'
import { fetchLogin, fetchRegister } from '../../redux/user/userSlice.js'
import { setToken } from '../../service/tokenService.js'

const Auth = ({type}) => {

    const dispatch = useDispatch();

    const [processMessage, setProcessMessage] = React.useState(null);

    const onLoginHandler = async (values) => {
        dispatch(fetchLogin(values))
        .then((data) => {
          if('error' in data){
            setProcessMessage('Введены неверные данные');
          }else{
            setProcessMessage('Вы успешно авторизованы');
            setToken(data.payload.data.token)
          }
        })
        .catch(() => {
            setProcessMessage('Ошибка работы сервера');
        })
    };

    const onRegisterHandler = async (values) => {
        dispatch(fetchRegister(values))
        .then((data) => {
          if('error' in data){
            setProcessMessage('Пользователь уже зарегистрирован');
          }else{
            setProcessMessage('Вы успешно зарегистрированы, перенаправляем на вход...');
    
            setTimeout(() => {
              window.location.href = '/login'
            }, 2000)
          }
        })
        .catch(() => {
            setProcessMessage('Ошибка работы сервера');
        })
    };

  return (
    <section className="sectionAuth">
        {
        type === 'registration'
        ?
        <Form 
          fields={registerFields}
          formValues={registerFormValues} 
          validationSchema={registerValidationSchema} 
          onSubmit={onRegisterHandler} 
          submitName="Зарегистрироваться"
          formName="Регистрация"
          processMessage={processMessage}
        />
        :
        type === 'login'
        ?
        <Form 
          fields={loginFields} 
          formValues={loginFormValues} 
          validationSchema={loginValidationSchema} 
          onSubmit={onLoginHandler} 
          submitName="Вход"
          formName="Войти"
          processMessage={processMessage}
        />
        :
        null
        }
    </section>
  )
}

export default Auth