import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { GlobalStyle } from './styles/global';
import Modal from 'react-modal';

//appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
