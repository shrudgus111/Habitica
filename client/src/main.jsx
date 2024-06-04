import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client';
import './index.css';
// import { store } from '@store/store.ts';
import store from '@/store/index.js'
// import { GlobalStyles } from '@styles/GlobalStyles.ts';
import { BrowserRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next';
import App from './App.jsx'
import './i18n'; // import만 해두면 된다.
import '@/assets/css/reset.css'


// 어플리케이션이 실행될 때 초기 데이터를 가져옴
// store.dispatch(fetchNotice(1));

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode> 태그로 이 감싸져있으면
  // 개발모드에서 (개발 단계시 오류를 잘 잡기위해) 두 번씩 렌더링함
  <React.StrictMode>
     
    <Provider store={store}>
   
      <BrowserRouter>
      {/* <GlobalStyles /> */}
        <App />
      </BrowserRouter>
     
    </Provider>
    
   </React.StrictMode>
)
