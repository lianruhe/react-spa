import React from 'react'
import propTypes from 'prop-types'

import 'styles/app/iframe.css'

export default class Iframe extends React.Component {
  static propTypes = {
    location: propTypes.object.isRequired
  }

  render () {
    return (
      <iframe src="http://www.baidu.com" id="extend-iframe" scrolling="no" frameBorder="0">{this.props.location.pathname}服务器错误！</iframe>
    )
  }
}
