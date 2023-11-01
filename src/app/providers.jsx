'use client';

import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { persistStore } from 'reduxjs-toolkit-persist';
import { PersistGate } from 'reduxjs-toolkit-persist/integration/react';
import { Toaster } from 'sonner';

import ScreenLoader from '@/components/ScreenLoader';

import { configureAxios } from '../configureAxios';
import { configureStore } from '../configureStore';

import AppEffects from './effects';

const store = configureStore();
configureAxios(store);

export default function Providers({children}) {

  return (
    <Provider store={store}>
      <PersistGate
        loading={<ScreenLoader />}
        persistor={persistStore(store)}
      >
        <PayPalScriptProvider options={{ 'client-id': 'AeXdWR_JCCE07lzAcsR4oi636nYHSdbOAefAHfOOC57CeWOW1bJQYnkFGAskYJw8lPuOKaoA8l2bz_LV', 'currency': 'PHP' }}>
          <AppEffects> {children} </AppEffects>
        </PayPalScriptProvider>
        <Toaster />
      </PersistGate>
    </Provider>
  );
}

Providers.propTypes = {
  children: PropTypes.any,
};
