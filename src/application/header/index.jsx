import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Icon } from 'antd'
import Avatar from 'components/avatar'

const Header = ({ authorized, logout }) => {
  return (
    <div id="header">
      <h1>管理系统</h1>
      <div className="content">
        <ul>
          <li className="user">
            <a href="javascript:;">
              <Avatar className="circle" size="small">
                <img src="images/wx@2x.png" />
              </Avatar>
              <span>管理员</span>
            </a>
          </li>
          <li className="logout">
            <a href="javascript:;" onClick={logout}><Icon type="logout" /></a>
          </li>
        </ul>
      </div>
    </div>
  )
}

Header.propTypes = {
  authorized: PropTypes.bool,
  logout: PropTypes.func
}

export default connect(state => ({
  authorized: state.core.authorized
}))(Header)
