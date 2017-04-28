import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

export default class RouteAsync extends React.Component {
  static propTypes = {
    getComponent: PropTypes.func,
    path: PropTypes.string,
    from: PropTypes.string,
    to: PropTypes.string
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
    const { from, to, path } = this.props

    // 登录认证
    const isAuthorization = true
    if (!isAuthorization && path !== '/login') {
      return (
        <Route {...this.props} render={props => (
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
      from && to ? <Redirect from={from} to={to} /> : <Route {...this.props} render={render} />
    )
  }
}
