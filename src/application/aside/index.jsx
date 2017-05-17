import React from 'react'
// import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'antd'
import routes from 'routes'
const SubMenu = Menu.SubMenu

const isArr = arg => Array.isArray(arg)

const navRoutes = routes.filter(route => route.navPath && isArr(route.navPath))
const navObj = {}
const addNavObj = (navPath, result, route) => {
  if (navPath.length <= 1) {
    result[navPath[0]] = route
    return
  }
  if (!result[navPath[0]]) {
    result[navPath[0]] = {}
  }
  addNavObj(navPath.slice(1), result[navPath[0]], route)
}
navRoutes.forEach(route => {
  addNavObj(route.navPath, navObj, route)
})
// console.log(navObj, 'vvvvvvvvv')

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
          {
            Object.keys(navObj).map(key => {
              if (navObj[key].getComponent) {
                return (<Menu.Item key={navObj[key].path}><Link to={navObj[key].path}>{key}</Link></Menu.Item>)
              }
              return (<SubMenu key={key} title={<span><Icon type="appstore" /><span>{key}</span></span>}>{
                Object.keys(navObj[key]).map(subKey => {
                  if (navObj[key][subKey].getComponent) {
                    return (<Menu.Item key={navObj[key][subKey].path}><Link to={navObj[key][subKey].path}>{subKey}</Link></Menu.Item>)
                  }
                  return (<SubMenu key={subKey} title={<span><Icon type="appstore" /><span>{subKey}</span></span>}>{
                    Object.keys(navObj[key][subKey]).map(k => {
                      if (navObj[key][subKey][k].getComponent) {
                        return (<Menu.Item key={navObj[key][subKey][k].path}><Link to={navObj[key][subKey][k].path}>{k}</Link></Menu.Item>)
                      }
                    })
                  }</SubMenu>)
                })
              }</SubMenu>)
            })
          }
          {/* <SubMenu key="system" title={<span><Icon type="mail" /><span>系统菜单</span></span>}>
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
          </SubMenu> */}
        </Menu>
      </div>
    )
  }
}
