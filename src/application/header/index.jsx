import React from 'react'
import pureRender from 'utils/pure-render'
import PropTypes from 'prop-types'

import { Icon, Layout, Avatar, Badge, Popover } from 'antd'
// import Avatar from 'components/avatar'

import './style.css'
const { Header } = Layout

const HeaderComponent = ({ userInfo, logout, collapsed, toggleCollapsed }) => {
  const noticeMenu = (
    <div>
      {/* <p>机构：{swjgmc}</p>
      <p>身份：{sfmc}</p> */}
      <p>暂无新消息</p>
    </div>
  )

  const userInfoMenu = (
    <div>
      <p>系统管理员</p>
      <p>修改密码</p>
    </div>
  )

  return (
    <Header id="header">
      <Icon
        className="trigger"
        type={collapsed ? 'menu-unfold' : 'menu-fold'}
        onClick={toggleCollapsed}
      />
      <ul>
        <li className="notice">
          <Popover overlayClassName="header-popover" placement="bottomRight" content={noticeMenu} trigger="hover">
            <a href="javascript:;">
              <Badge count={6}>
                <Icon type="notification" />
              </Badge>
            </a>
          </Popover>
        </li>
        <li className="user">
          <Popover overlayClassName="header-popover" placement="bottomRight" content={userInfoMenu} trigger="hover">
            <a href="javascript:;">
              {/* <Avatar className="circle" size="small">
                <img src="static/images/wx@2x.png" />
              </Avatar> */}
              <Avatar className="avatar" src="static/images/wx@2x.png" />
              <span>管理员</span>
            </a>
          </Popover>
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
