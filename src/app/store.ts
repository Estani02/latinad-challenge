import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {persistStore, persistReducer} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

import campaignReducer from '@/features/campaignSlice';
import {mySaga} from '@/features/sagas';

const createNoopStorage = () => {
  return {
    getItem(_key: unknown) {
      return Promise.resolve(null);
    },
    setItem(_key: unknown, value: unknown) {
      return Promise.resolve(value);
    },
    removeItem(_key: unknown) {
      return Promise.resolve();
    },
  };
};

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

const persistConfig = {
  key: 'root',
  storage,
};

const persistedCampaignReducer = persistReducer(persistConfig, campaignReducer);

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    campaign: persistedCampaignReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({thunk: false, serializableCheck: false}).concat(sagaMiddleware),
});

sagaMiddleware.run(mySaga);

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
