import React from 'react'
import { Redirect, Route } from 'react-router'
import PropTypes from 'prop-types'

export default class RouteAsync extends React.Component {
  static propTypes = {
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

    // 登录认证验证
    if (!authorized && path !== '/login') {
      return (
        <Route path={path} exact={exact} render={props => (
          <Redirect to={{
            pathname: '/login',
            state: {
              from: props.location
            }
          }} />
        )} />
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
      from && to ? <Redirect from={from} to={to} /> : <Route path={path} exact={exact} render={render} />
    )
  }
}
