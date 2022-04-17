import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { StorageContext } from './context';
import { storage } from './storage';
import { widgets } from './widgets';
import { controls } from './controls';
import { toJS } from 'mobx';

window.storageLog = (p = storage) => console.log(toJS(p));

for (let i = 0; i < widgets.length; i++) {
  storage.registerWidget(widgets[i]);
}

for (let i = 0; i < controls.length; i++) {
  storage.registerControl(controls[i]);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StorageContext.Provider value={storage}>
      <App />
    </StorageContext.Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();