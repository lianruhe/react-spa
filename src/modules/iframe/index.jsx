import React, { PureComponent } from 'react'
import Iframe from 'react-iframe'
import { getUrlParam } from 'opiece-utils/lib/tools'

import { Spin } from 'antd'

import 'styles/app/iframe.css'

export default class IframeComponent extends PureComponent {
  render () {
    const paramUrl = getUrlParam('url')
    const match = paramUrl.match(/^https?:\/\/[^/]+/) || []
    const redirect = ({ origin, data }) => {
      if (origin === match[0]) {
        const { messageType, url } = data || {}
        if (messageType === 'childMessageRedirect' && url) {
          typeof url === 'number' ? window.history.go(url) : window.location.href = url
        }
      }
    }
    if (window.attachEvent) {
      window.detachEvent('message', redirect)
      window.attachEvent('message', redirect)
    } else {
      window.removeEventListener('message', redirect)
      window.addEventListener('message', redirect)
    }

    return (
      <div id="iframe-wrapper">
        <Spin tip="加载中..." size="large" />
        {/* <iframe src={url} id="extend-iframe" frameBorder="0">{url}: 连接服务器错误！</iframe> */}
        <Iframe
          key={Date.now()}
          url={paramUrl}
          width="100%"
          height="100%"
          display="block"
          position="absolute"
          allowFullScreen />
      </div>
    )
  }
}
