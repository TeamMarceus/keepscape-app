'use client';

import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { persistStore } from 'reduxjs-toolkit-persist';
import { PersistGate } from 'reduxjs-toolkit-persist/integration/react';

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
        <AppEffects> {children} </AppEffects>
      </PersistGate>
    </Provider>
  );
}

Providers.propTypes = {
  children: PropTypes.any,
};
