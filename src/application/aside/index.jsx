import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'antd'
import routes from 'routes'
const SubMenu = Menu.SubMenu

const openKeys = {}
const addKeys = (routes, keys) => routes.filter(route => route.title).forEach(route => {
  if (!route.subMenu && route.path) {
    openKeys[route.path] = keys
  } else {
    addKeys(route.subMenu, keys.concat([route.title]))
  }
})
addKeys(routes, [])

export default class Aside extends React.Component {
  static propTypes = {
    pathname: PropTypes.string
  }

  constructor (props) {
    super(props)

    this.state = {
      current: '/404',
      openKeys: []
    }
  }

  handleClick = (e) => {
    console.log('click ', e)
    this.setState({
      current: e.key
    })
  }

  getAncestorKeys = (key) => {
    const map = {
      subNav: ['nav2']
    }
    return map[key] || []
  }

  onOpenChange = (openKeys) => {
    console.log(openKeys)
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

  render () {
    const domMenu = routes => routes.filter(route => route.title).map(route => {
      if (route.subMenu && route.subMenu.length) {
        const {title, icon, subMenu} = route
        return (
          <SubMenu key={title} title={<span><Icon type={icon} /><span>{title}</span></span>}>
            { domMenu(subMenu) }
          </SubMenu>
        )
      }
      const {title, path} = route
      return (
        <Menu.Item key={path}><Link to={path}>{title}</Link></Menu.Item>
      )
    })
    const { pathname } = this.props

    return (
      <div id="aside">
        <Menu theme="dark"
          // onClick={this.handleClick}
          defaultOpenKeys={openKeys[pathname]}
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
