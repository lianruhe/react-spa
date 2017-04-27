import React from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import RouteAsync from 'components/route-async'

// import Login from 'modules/login'
import Notfound from 'modules/404'
// import Home from 'modules/home'
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
      <Redirect from="/" to="/home" />
      <Route component={Notfound} />
    </Switch>
  </HashRouter>
)

export default App
