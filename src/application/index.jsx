import React from 'react'
import { Switch } from 'react-router'
import { history } from 'store'
import { ConnectedRouter } from 'react-router-redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import autobind from 'autobind-decorator'
import { setAuth } from 'store/actions/core'

import RouteAsync from './route-async'
import Header from './header'
import Aside from './aside'
import routes from 'routes'
import { Progress, Layout } from 'antd'

import 'styles/index.css'
const { Content } = Layout

const routeArray = []
// 过滤出不用渲染的 route，整理成数组，后面 level 过滤也在这里做
const filterRoute = arr => {
  arr.forEach(route => {
    if (route.getComponent || (route.from && route.to)) {
      // level 过滤可以在这里操作
      routeArray.push(route)
    } else if (route.subMenu) {
      filterRoute(route.subMenu)
    }
  })
}
filterRoute(routes)

@connect(state => ({
  progress: state.core.progress,
  authorized: state.core.authorized
}), dispatch => ({
  ...bindActionCreators({ setAuth }, dispatch)
}))
export default class App extends React.Component {
  static propTypes = {
    progress: PropTypes.number,
    authorized: PropTypes.bool,
    setAuth: PropTypes.func
  }

  constructor (props) {
    super(props)
    this.state = {
      pathname: '',
      collapsed: false
    }
  }

  @autobind
  logout () {
    this.props.setAuth(false)
  }

  @autobind
  setPathname (pathname) {
    if (pathname !== this.state.pathname) {
      this.setState({
        pathname
      })
    }
  }

  @autobind
  toggleCollapsed () {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  render () {
    const { progress, authorized } = this.props
    const { pathname, collapsed } = this.state
    const isLogin = !authorized && pathname === '/login'
    return (
      <ConnectedRouter history={history}>
        <Layout
          id="container"
          className={`ant-layout-has-sider ${!isLogin ? '' : 'unauthed'}`} >
          {
            !isLogin &&
            <Aside pathname={pathname} collapsed={collapsed} />
          }
          {
            progress > 0 && progress <= 100 &&
            <Progress id="progress" percent={progress} showInfo={false} strokeWidth={3} />
          }
          <Layout id="wrapper">
            {
              !isLogin &&
              <Header userInfo={authorized} logout={this.logout} collapsed={collapsed} toggleCollapsed={this.toggleCollapsed} />
            }
            <Content id="main">
              <div id="main-wrapper">
                <Switch>
                  {routeArray.map((route, index) => {
                    return (
                      <RouteAsync {...route} key={index} authorized={authorized} setPathname={this.setPathname} />
                    )
                  })}
                </Switch>
              </div>
            </Content>
          </Layout>
        </Layout>
      </ConnectedRouter>
    )
  }
}
