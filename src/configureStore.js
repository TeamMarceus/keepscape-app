import { configureStore as createStore } from '@reduxjs/toolkit';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'reduxjs-toolkit-persist';
import hardSet from 'reduxjs-toolkit-persist/lib/stateReconciler/hardSet';
import createWebStorage from 'reduxjs-toolkit-persist/lib/storage/createWebStorage';

import rootReducer, { APP_REDUX_KEY } from './ducks/index';

const createNoopStorage = () => ({
  getItem() {
    return Promise.resolve(null);
  },
  setItem(_key, value) {
    return Promise.resolve(value);
  },
  removeItem() {
    return Promise.resolve();
  },
});

const storage =
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : createNoopStorage();

export const configureStore = () => {
  const persistConfig = {
    key: APP_REDUX_KEY,
    storage,
    stateReconciler: hardSet,
    keyPrefix: '',
    timeout: 2000, // https://github.com/rt2zz/redux-persist/issues/816
  };
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  // create store
  const store = createStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });

  return store;
};
