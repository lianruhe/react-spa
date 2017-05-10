/**
 *  路由配置信息
 */
export default [{
  from: '/',
  to: '/home',
  exact: true
}, {
  path: '/home',
  getComponent: () => System.import('modules/home'),
  exact: true
}, {
  path: '/login',
  getComponent: () => System.import('modules/login'),
  exact: true
}, {
  path: '/demo',
  getComponent: () => System.import('modules/demo'),
  exact: true
}, {
  getComponent: () => System.import('modules/404')
}]
