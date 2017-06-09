import React from 'react'
import pureRender from 'utils/pure-render'
import { Icon } from 'antd'
import 'styles/app/404.css'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Error = ({ history }) => {
  const goback = () => {
    console.log(history)
    history.goBack()
  }

  return (
    <div className="ui-notfound">
      <div className="content-wrapper">
        <div className="logo" />
        <div className="content">
          <p className="header">404</p>
          <p className="title">Looks like you're lost</p>
          <p className="text">The page you are looking for not availble!</p>
        </div>
      </div>
      <div className="operate">
        <a onClick={goback}>
          <Icon type="arrow-left" />
          <span className="goback">go back</span>
        </a>
        <Link to="/home">
          <span className="gohome">go to home</span>
          <Icon type="arrow-right" />
        </Link>
      </div>
    </div>
  )
}

Error.propTypes = {
  history: PropTypes.object
}

export default pureRender(Error)
