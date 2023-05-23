import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

document.oncontextmenu= new Function( "return false" );

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);

serviceWorkerRegistration.register();