import React from 'react'
import pureRender from 'utils/pure-render'
import PropTypes from 'prop-types'

import { Icon, Layout, Avatar } from 'antd'
// import Avatar from 'components/avatar'

import './style.css'
const { Header } = Layout

const HeaderComponent = ({ userInfo, logout, collapsed, toggleCollapsed }) => {
  return (
    <Header id="header">
      <Icon
        className="trigger"
        type={collapsed ? 'menu-unfold' : 'menu-fold'}
        onClick={toggleCollapsed}
      />
      <ul>
        <li className="user">
          <a href="javascript:;">
            {/* <Avatar className="circle" size="small">
              <img src="static/images/wx@2x.png" />
            </Avatar> */}
            <Avatar className="avatar" src="static/images/wx@2x.png" />
            <span>管理员</span>
          </a>
        </li>
        <li className="logout">
          <a href="javascript:;" onClick={logout}><Icon type="logout" /></a>
        </li>
      </ul>
    </Header>
  )
}

HeaderComponent.propTypes = {
  userInfo: PropTypes.bool,
  logout: PropTypes.func,
  collapsed: PropTypes.bool,
  toggleCollapsed: PropTypes.func
}

export default pureRender(HeaderComponent)
