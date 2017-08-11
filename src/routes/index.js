/**
 *  路由配置信息
 */
import demo from './demo'

export default [{
  from: '/',
  to: '/home',
  exact: true // 重定向
}, {
  icon: 'appstore',
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
