import React from 'react'
import ReactDOM from 'react-dom'
import { hashHistory, Router } from 'react-router'
import { Provider } from 'react-redux'
import createStore from './store'
import { AppContainer } from 'react-hot-loader'

// ========================================================
// Store Instantiation
// ========================================================
const initialState = window.___INITIAL_STATE__
const store = createStore(initialState)

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('app')
// initial routes
// const walkRoutes = sets =>
//   Object.keys(sets).map(path => {
//     const value = sets[path]
//
//     return (
//       <Route key={path} path={path} component={asyncLoader(value.component)}>
//         { value.indexroute &&
//           <IndexRoute component={asyncLoader(value.indexroute)} /> }
//         { value.childroutes &&
//           walkRoutes(value.childroutes) }
//       </Route>
//     )
//   })

let render = () => {
  const routes = require('./routes')
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <div style={{ height: '100%' }}>
          <Router history={ hashHistory } children={ routes } />
        </div>
      </Provider>
    </AppContainer>,
    MOUNT_NODE
  )
}

// ========================================================
// Developer Tools Setup
// ========================================================
// if (__DEV__) {
//   if (window.devToolsExtension) {
//     window.devToolsExtension.open()
//   }
// }

// This code is excluded from production bundle
if (__DEV__) {
  if (module.hot) {
    // Development render functions
    const renderApp = render
    const renderError = (error) => {
      const RedBox = require('redbox-react')

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
    }

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp()
      } catch (error) {
        renderError(error)
      }
    }

    // Setup hot module replacement
    module.hot.accept('app', () => {
      render()
    })
  }
}

// ========================================================
// Go!
// ========================================================
render()
