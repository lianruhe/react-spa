/**
 *  路由配置信息
 *  title   [string]    路由名称
 *  icon    [string]    字体图标
 *  path    [string]    路径
 *  from    [string]    重定向始
 *  to      [string]    重定向到
 *  exact   [bool]      绝对匹配
 *  getComponent  [string]    获得模块
 */

import demo from './demo'

export default [{
  from: '/',
  to: '/home',
  exact: true // 重定向
}, {
  icon: 'home',
  title: '系统菜单',
  subMenu: [{
    title: '首页',
    path: '/home',
    getComponent: () => System.import('modules/home')
  }, {
    title: '404',
    path: '/404',
    getComponent: () => System.import('modules/404')
  }]
},
...demo,
{
  path: '/login',
  getComponent: () => System.import('modules/login')
},
{
  getComponent: () => System.import('modules/404'),
  exact: false
}]
