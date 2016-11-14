import { applyMiddleware, compose, createStore } from 'redux'
import persistState from 'redux-localstorage'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import { routerMiddleware } from 'react-router-redux'
import browserHistory from './middlewares/history'
// import { browserHistory } from 'react-router'
// import { updateLocation } from './location'
import rootReducer from './reducers'

export default (initialState = {}) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [thunk, promise, routerMiddleware(browserHistory)]

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = [persistState(['env', 'tokens', 'auth'])]

  if (__DEV__) {
    const devToolsExtension = window.devToolsExtension
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension())
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )
  store.asyncReducers = {}

  // To unsubscribe, invoke `store.unsubscribeHistory()` anytime
  // store.unsubscribeHistory = browserHistory.listen(updateLocation(store))

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  return store
}
