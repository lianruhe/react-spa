import React from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import RouteAsync from 'components/route-async'

import Login from 'modules/login'
import Notfound from 'modules/404'
import Home from 'modules/home'
import 'antd/lib/style/index.css'

const App = () => (
  <HashRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Redirect from="/home" to="/" />
      <Route path="/login" component={Login} />
      {/* <Route render={() => {
        const temp = require('modules/404')()
        console.log(temp)
        return temp
      }} /> */}
      {/* <RouteAsync path="/404" component="modules/404" /> */}
    </Switch>
  </HashRouter>
)

export default App
