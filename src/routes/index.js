/**
 *  路由配置信息
 */
// import demo from './demo'
import navtest from './navtest'

export default [{
  from: '/',
  to: '/home',
  exact: true   // 存在问题
}, {
  icon: 'appstore',
  title: '系统菜单',
  subMenu: [{
    title: '首页',
    path: '/home',
    getComponent: () => System.import('modules/home')
  }, {
    title: '示例',
    path: '/demo',
    getComponent: () => System.import('modules/demo')
  }, {
    title: '404',
    path: '/404',
    getComponent: () => System.import('modules/404')
  }]
}, {
  path: '/login',
  getComponent: () => System.import('modules/login')
},
  navtest,
{
  getComponent: () => System.import('modules/404'),
  exact: false
}]
