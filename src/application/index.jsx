import React from 'react'
import { HashRouter, Switch } from 'react-router-dom'
import RouteAsync from './route-async'

import routes from 'routes'
import 'antd/lib/style/index.css'

const App = () => (
  <HashRouter>
    <Switch>
      {routes.map((route, index) => {
        return (
          <RouteAsync {...route} key={index} />
        )
      })}
    </Switch>
  </HashRouter>
)

export default App
