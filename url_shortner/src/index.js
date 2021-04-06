

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './js/app';
import { Provider } from 'react-redux'
// import store from './js/store/index'

import * as serviceWorker from './serviceWorker';

// import index from "./js/index";
ReactDOM.render(
  // <Provider store={store}>  
  // <Provider>
    <App />,
  // </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA



// https://www.valentinog.com/blog/redux/