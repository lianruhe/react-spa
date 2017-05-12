/**
 *  路由配置信息
 */
import demo from './demo'

export default [{
  from: '/',
  to: '/home',
  exact: true
}, {
  path: '/home',
  getComponent: () => System.import('modules/home')
}, {
  path: '/login',
  getComponent: () => System.import('modules/login')
},
  ...demo,
{
  getComponent: () => System.import('modules/404'),
  exact: false
}]
