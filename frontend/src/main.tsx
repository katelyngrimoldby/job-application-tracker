import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { reducer, StateProvider } from './state';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <StateProvider reducer={reducer}>
        <App />
      </StateProvider>
    </BrowserRouter>
  </React.StrictMode>
);
