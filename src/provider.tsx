'use client';

import {Provider} from 'react-redux';
import {PropsWithChildren} from 'react';

import {store} from '@/app/store';

export function StoreProvider({children}: PropsWithChildren) {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      {children}
      {/* </PersistGate> */}
    </Provider>
  );
}
