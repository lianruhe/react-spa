/**
 * demo
 */
export default [{
  path: '/demo',
  getComponent: () => System.import('modules/demo'),
  name: '示例一',
  parent: '示例'
}, {
  path: '/demo1',
  getComponent: () => System.import('modules/home'),
  name: '示例二',
  parent: '示例'
}, {
  path: '/nav',
  getComponent: () => System.import('modules/home'),
  name: '示例三',
  parent: 'Navigtation'
}, {
  path: '/nav1',
  getComponent: () => System.import('modules/home'),
  name: '示例四',
  parent: ['Navigtation', 'subNav']
}, {
  path: '/nav2',
  getComponent: () => System.import('modules/home'),
  name: '示例五',
  parent: 'Navigtation'
}]
