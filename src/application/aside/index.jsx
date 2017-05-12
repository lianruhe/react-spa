import React from 'react'
// import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'antd'
const SubMenu = Menu.SubMenu

export default class Aside extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      current: '/404'
    }
  }

  handleClick = (e) => {
    console.log('click ', e)
    this.setState({
      current: e.key
    })
  }

  render () {
    return (
      <div id="aside">
        <Menu theme="dark"
          onClick={this.handleClick}
          style={{ width: 210 }}
          defaultOpenKeys={['sub2', 'sub3']}
          selectedKeys={[this.state.current]}
          mode="inline">
          <SubMenu key="system" title={<span><Icon type="mail" /><span>系统菜单</span></span>}>
            <Menu.Item key="/home"><Link to="/home">首页</Link></Menu.Item>
            <Menu.Item key="/404"><Link to="/404">404</Link></Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigtion Two</span></span>}>
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="7">Option 7</Menu.Item>
              <Menu.Item key="8">Option 8</Menu.Item>
            </SubMenu>
          </SubMenu>
          <SubMenu key="sub4" title={<span><Icon type="setting" /><span>Navigation Three</span></span>}>
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <Menu.Item key="11">Option 11</Menu.Item>
            <Menu.Item key="12">Option 12</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    )
  }
}
