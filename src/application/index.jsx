import React from 'react'
import { Switch } from 'react-router'
import { history } from 'store'
import { ConnectedRouter } from 'react-router-redux'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import RouteAsync from './route-async'
import routes from 'routes'
import { Progress } from 'antd'

import 'antd/lib/style/index.css'
import 'styles/index.css'

const App = ({ progress }) => {
  const showProgress = progress > 0 && progress < 100

  return (
    <div id="container">
      {showProgress && <Progress id="progress" percent={progress} showInfo={false} strokeWidth={5} />}
      <ConnectedRouter history={history}>
        <Switch>
          {routes.map((route, index) => {
            return (
              <RouteAsync {...route} key={index} />
            )
          })}
        </Switch>
      </ConnectedRouter>
    </div>
  )
}

App.propTypes = {
  progress: PropTypes.number
}

export default connect(state => ({
  progress: state.core.progress
}))(App)
