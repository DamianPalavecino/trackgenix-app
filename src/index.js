import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './Routes/index.js';
import './index.css';
import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Layout />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
