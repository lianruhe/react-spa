import React from 'react'
import Base from 'components/base'
import { Redirect, Route } from 'react-router'
import PropTypes from 'prop-types'

export default class RouteAsync extends Base {
  static propTypes = {
    setPathname: PropTypes.func,
    location: PropTypes.object,
    getComponent: PropTypes.func,
    path: PropTypes.string,
    from: PropTypes.string,
    to: PropTypes.string,
    exact: PropTypes.bool,
    authorized: PropTypes.bool
  }

  constructor (props) {
    super(props)
    this.state = {
      component: undefined
    }
  }

  componentWillMount () {
    // 设置 pathname
    const { setPathname, location } = this.props
    setPathname(location.pathname)
  }

  getComponent () {
    if (this.props.getComponent && typeof this.props.getComponent === 'function') {
      this.props.getComponent()
        .then(component => {
          this.setState({
            component
          })
        })
        .catch(e => {
          console.error(e)
          throw new Error(e)
        })
    }
  }

  render () {
    const { from, to, path, authorized, exact = true } = this.props

    // 重定向
    if (from && to) {
      return (
        <Redirect from={from} to={to} />
      )
    }

    // 登录认证验证
    if (!authorized && path !== '/login') {
      return (
        <Redirect exact="false" from={path} to="/login" />
      )
    }

    const { component } = this.state
    const render = props => {
      if (!component) {
        this.getComponent()
      }
      return component ? React.createElement(component, props) : null
    }

    return (
      <Route path={path} exact={exact} render={render} />
    )
  }
}
