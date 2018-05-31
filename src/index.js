import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import reducer from './reducers'
import simpleMiddleWare from './middleware/index.js'
import App from './containers/app'
import io  from 'socket.io-client'

require("babel-core/register");
require("babel-polyfill");

const configureStore = (reducer) => createStore(
  combineReducers({
    routing: routerReducer,
    example: reducer,
  }),
  composeEnhancers(
  applyMiddleware(
    simpleMiddleWare(socket),
    thunk
  )),
)

// global.socket = io('localhost:3000')
global.socket = io('http://63978e6a.ngrok.io')
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = configureStore(reducer)
const history = syncHistoryWithStore(browserHistory, store)

/*socket.on('action', function(s) {
    console.log(s);
})*/

ReactDom.render((
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App} />
    </Router>
  </Provider>
), document.getElementById('Matcha'))
