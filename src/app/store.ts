import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {persistStore} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import {mySaga} from '@/features/sagas';

// const createNoopStorage = () => {
//   return {
//     getItem(_key: unknown) {
//       return Promise.resolve(null);
//     },
//     setItem(_key: unknown, value: unknown) {
//       return Promise.resolve(value);
//     },
//     removeItem(_key: unknown) {
//       return Promise.resolve();
//     },
//   };
// };

// const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

// const persistConfig = {
//   key: 'auth',
//   storage,
// };

// const persistedAuthReducer = persistReducer(persistConfig);

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {},
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({thunk: false}).concat(sagaMiddleware),
});

sagaMiddleware.run(mySaga);

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
