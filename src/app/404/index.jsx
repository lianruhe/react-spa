import React from 'react'
// import Icon from 'components/Icon/index.jsx'
import 'styles/app/404.css'

const Error = () => (
  <div className="ui-notfound">
    <div className="logo">
      {/* <img src="images/404.png" /> */}
    </div>
    <div className="content-wrapper">
      <div className="header">404</div>
      <div className="content">looks like you're lost</div>
      <div className="operate">
        <a>go to home</a>
      </div>
    </div>
  </div>
)

export default Error
