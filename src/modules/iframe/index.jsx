import React from 'react'
import propTypes from 'prop-types'

import MAP from './route-map'

import 'styles/app/iframe.css'

export default class Iframe extends React.Component {
  static propTypes = {
    location: propTypes.object.isRequired
  }

  render () {
    const { pathname } = this.props.location
    const src = MAP[pathname]

    return (
      <iframe src={src} id="extend-iframe" frameBorder="0">{this.props.location.pathname}连接服务器错误！</iframe>
    )
  }
}
