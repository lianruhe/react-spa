import React from 'react'
import PropTypes from 'prop-types'
import Base from 'components/base'
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'antd'
import routes from 'routes'
import './style.css'
const SubMenu = Menu.SubMenu

// 构造 openkeys 对象
const openKeys = {}
const addKeys = (routes, keys) => routes.filter(route => route.title).forEach(route => {
  if (!route.subMenu && route.path) {
    openKeys[route.path] = keys
  } else {
    addKeys(route.subMenu, keys.concat([route.title]))
  }
})
addKeys(routes, [])

// 多级菜单
const ancestorKeys = {}
Object.keys(openKeys).forEach(key => {
  const len = openKeys[key].length
  if (len > 1) {
    ancestorKeys[openKeys[key][len - 1]] = openKeys[key].slice(0, -1)
  }
})

export default class Aside extends Base {
  static propTypes = {
    pathname: PropTypes.string
  }

  constructor (props) {
    super(props)

    this.state = {
      openKeys: openKeys[props.pathname] || []
    }
  }

  getAncestorKeys = (key) => {
    return ancestorKeys[key] || []
  }

  onOpenChange = (openKeys) => {
    const state = this.state
    const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1))
    const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1))

    let nextOpenKeys = []
    if (latestOpenKey) {
      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey)
    }
    if (latestCloseKey) {
      nextOpenKeys = this.getAncestorKeys(latestCloseKey)
    }
    this.setState({ openKeys: nextOpenKeys })
  }

  componentWillReceiveProps (nextProps) {
    const { pathname } = this.props
    if (pathname !== nextProps.pathname) {
      this.setState({
        openKeys: openKeys[nextProps.pathname] || []
      })
    }
  }

  render () {
    const { pathname } = this.props
    const { openKeys } = this.state

    const domMenu = routes => routes.filter(route => route.title).map(route => {
      if (route.subMenu && route.subMenu.length) {
        const {title, icon, subMenu} = route
        return (
          <SubMenu key={title} title={<span>{icon && <Icon type={icon} />}<span>{title}</span></span>}>
            { domMenu(subMenu) }
          </SubMenu>
        )
      }
      const {title, path} = route
      return (
        <Menu.Item key={path}>
          {pathname === path ? title : <Link to={path || ''}>{title}</Link>}
        </Menu.Item>
      )
    })

    return (
      <div id="aside">
        <h1 id="admin-title">管理系统</h1>
        <Menu theme="light"
          // onClick={this.handleClick}
          openKeys={openKeys}
          selectedKeys={[pathname]}
          style={{ width: 210 }}
          onOpenChange={this.onOpenChange}
          mode="inline">
          { domMenu(routes) }
        </Menu>
      </div>
    )
  }
}
