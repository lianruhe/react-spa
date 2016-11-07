import React, { Component, PropTypes } from 'react'
import { browserHistory, Router, Route, IndexRoute } from 'react-router'
import { Provider } from 'react-redux'

// ========================================================
// initial routes
// ========================================================
const walkRoutes = sets =>
  Object.keys(sets).map(path => {
    const value = sets[path]

    return (
      <Route key={path} path={path} component={value.component}>
        { value.indexroute &&
          <IndexRoute component={value.indexroute} /> }
        { value.childroutes &&
          walkRoutes(value.childroutes) }
      </Route>
    )
  })

class AppContainer extends Component {
  static propTypes = {
    routes: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    const { routes, store } = this.props

    return (
      <Provider store={store}>
        <div style={{ height: '100%' }}>
          <Router history={browserHistory}>
            { walkRoutes(routes) }
          </Router>
        </div>
      </Provider>
    )
  }
}

export default AppContainer
