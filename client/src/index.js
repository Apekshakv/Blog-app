import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import {thunk }from 'redux-thunk';
import reducers from './reducers';
import { BrowserRouter } from 'react-router-dom'; 
import Routesr from './routes';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);

const root = document.getElementById('root');
const rootelement = ReactDOM.createRoot(root);
rootelement.render(
  <BrowserRouter>
    <Provider store={store}>
      <Routesr />
    </Provider>
  </BrowserRouter>
);
