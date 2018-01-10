import React from 'react'
import pureRender from 'utils/pure-render'
import PropTypes from 'prop-types'

import { Icon, Layout, Avatar, Badge, Popover, Tabs } from 'antd'
// import Avatar from 'components/avatar'

import './style.css'
const { Header } = Layout
const TabPane = Tabs.TabPane

const HeaderComponent = ({ userInfo, logout, collapsed, toggleCollapsed }) => {
  const noticeMenu = (
    <Tabs defaultActiveKey="1" className="notice-tabs" onChange={() => {}}>
      <TabPane tab="通知（5）" key="1">你已查看所有通知</TabPane>
      <TabPane tab="消息（3）" key="2">您已读完所有消息</TabPane>
      <TabPane tab="代办（6）" key="3">你已完成所有待办</TabPane>
    </Tabs>
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
          <Popover overlayClassName="header-notice-popover" placement="bottomRight" content={noticeMenu} trigger="click">
            <a href="javascript:;">
              <Badge count={6}>
                <Icon type="bell" />
              </Badge>
            </a>
          </Popover>
        </li>
        <li className="user">
          <Popover overlayClassName="header-user-popover" placement="bottomRight" content={userInfoMenu} trigger="hover">
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
