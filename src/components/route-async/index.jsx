import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'

export default class RouteAsync extends React.Component {
  static propTypes = {
    component: PropTypes.string.isRequired,
    computedMatch: PropTypes.object,
    match: PropTypes.object,
    path: PropTypes.string.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      component: undefined
    }
  }

  getComponent () {
    debugger
    if (this.props.component && typeof this.props.component === 'string') {
      console.log(this.props.component, 111111)
      System.import(this.props.component)
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
    const { computedMatch, match } = this.props
    const { url } = computedMatch || match || {}
    const { component } = this.state
    const path = url ? url + this.props.path : this.props.path

    return (
      <Route path={path} render={(props) => {
        if (!component) {
          this.getComponent()
        }
        return component ? React.createElement(component, props) : null
      }} />
    )
  }
}
