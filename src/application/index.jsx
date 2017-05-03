import React from 'react'
import { HashRouter, Switch } from 'react-router-dom'
import RouteAsync from './route-async'
import routes from 'routes'
import { Progress } from 'antd'

import 'antd/lib/style/index.css'
import 'styles/index.css'

const App = () => {
  const num = 30
  return (
    <div id="container">
      <Progress id="progress" percent={num} showInfo={false} strokeWidth={5} />
      <HashRouter>
        <Switch>
          {routes.map((route, index) => {
            return (
              <RouteAsync {...route} key={index} />
            )
          })}
        </Switch>
      </HashRouter>
    </div>
  )
}

export default App
