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
    title: '404',
    path: '/404',
    getComponent: () => System.import('modules/404')
  }]
}, {
  icon: 'appstore',
  title: 'demo',
  subMenu: [{
    title: '小组件',
    path: '/demo1',
    getComponent: () => System.import('modules/demo')
  }, {
    title: '表格',
    path: '/demo-table',
    getComponent: () => System.import('modules/demo/table')
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
