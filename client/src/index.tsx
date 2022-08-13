import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { App } from './App/App';
import { store } from './store/store';
import './index.css';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

const initialOptions = {
  'client-id':
    'ASFWp9d9fDDQpBFGI52PPJ4dGTSOJIaYO-6gX0nmEf83mahp2yltw9ozxnaavtkzXZk9aKk5ut9cf9T5',
  currency: 'EUR',
};

const app = (
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PayPalScriptProvider options={initialOptions}>
          <App />
        </PayPalScriptProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(app);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
