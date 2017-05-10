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

const App = ({ progress, authorized }) => {
  return (
    <div id="container" className={authorized ? '' : 'unauthed'} >
      {progress > 0 && progress <= 100 && <Progress id="progress" percent={progress} showInfo={false} strokeWidth={3} />}
      <div id="header">
        <h1>管理系统</h1>
      </div>
      <div id="wrapper">
        <div id="main">
          <ConnectedRouter history={history}>
            <Switch>
              {routes.map((route, index) => {
                return (
                  <RouteAsync {...route} key={index} authorized={authorized} />
                )
              })}
            </Switch>
          </ConnectedRouter>
        </div>
        <div id="aside">
          aside
        </div>
      </div>
    </div>
  )
}

App.propTypes = {
  progress: PropTypes.number,
  authorized: PropTypes.bool
}

export default connect(state => ({
  progress: state.core.progress,
  authorized: state.core.authorized
}))(App)
