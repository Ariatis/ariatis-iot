// Library import
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

// CSS import
import './style/index.css'
import './style/spacelab.min.css'

// Component import
import App from './App'

// Services import
import * as serviceWorker from './serviceWorker'

// Redux Reducers
import reducers from './reducers/index'

// Middlewares import
import { applyMiddleware, compose, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import { createPromise } from 'redux-promise-middleware'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const middleware = applyMiddleware(createPromise(), thunk, createLogger())
const store = createStore(reducers, composeEnhancer(middleware))

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
), document.getElementById('root'))

export default store

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
