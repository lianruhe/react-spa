import React from 'react'
import { HashRouter, Switch } from 'react-router-dom'
import RouteAsync from './route-async'

import routes from 'routes'
import 'antd/lib/style/index.css'

const App = () => {
  const num = new Date().toLocaleString()
  return (
    <div id="container">
      <div id="progress">{num}</div>
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
