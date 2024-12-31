'use client';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {PropsWithChildren} from 'react';

import {store, persistor} from '@/app/store';

export function StoreProvider({children}: PropsWithChildren) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
