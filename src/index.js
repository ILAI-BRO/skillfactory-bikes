import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { router } from './components/Router/Router';
import Layout from './components/Layout/Layout';
import store from './redux/store';
import './styles/globals.scss';
import { getToken } from './service/tokenService';
import { fetchMe } from './redux/user/userSlice';

const root = ReactDOM.createRoot(document.getElementById('root'));

  if(getToken()){
    store.dispatch(fetchMe())
  }

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Layout>
        <RouterProvider router={router} />
      </Layout>
    </Provider>
  </React.StrictMode>
);
