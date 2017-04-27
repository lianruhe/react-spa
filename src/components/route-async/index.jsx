import React from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'

export default class RouteAsync extends React.Component {
  static propTypes = {
    getComponent: PropTypes.func.isRequired,
    path: PropTypes.string.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      component: undefined
    }
  }

  componentWillMount () {
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
    const { path } = this.props
    const { component } = this.state

    return (
      <Route {...this.props} path={path} render={props => {
        return component ? React.createElement(component, props) : null
      }} />
    )
  }
}
