import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from '@store/store.ts';
import { Provider } from 'react-redux';
// import { GlobalStyles } from '@styles/GlobalStyles.ts';
import Appo from './Appo.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <GlobalStyles /> */}
      <Appo />
    </Provider>
  </React.StrictMode>
);
