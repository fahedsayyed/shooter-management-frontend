import React, { Suspense } from 'react';
import './index.scss'

import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import Spinner from './views/spinner/Spinner';
import './utils/i18n';
import store, { persistor } from './store/Store';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <Suspense fallback={<Spinner />}>
      <BrowserRouter>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Suspense>
  </Provider>,
);
