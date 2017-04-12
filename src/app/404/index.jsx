import React from 'react'
import Icon from 'components/Icon/index.jsx'
import 'styles/app/404.css'

const Error = () => (
  <div className="ui-notfound">
    <div className="header"><Icon type="tools" />404</div>
    <div>
      <button>返回</button>
      <button>首页</button>
    </div>
  </div>
)

export default Error
