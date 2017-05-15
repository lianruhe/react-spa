/**
 * demo
 */
export default [{
  path: '/demo',
  getComponent: () => System.import('modules/demo'),
  navPath: ['示例']
}, {
  path: '/demo1',
  getComponent: () => System.import('modules/demo'),
  navPath: ['nav', 'demo1']
}, {
  path: '/demo2',
  getComponent: () => System.import('modules/demo'),
  navPath: ['nav', 'demo2']
}, {
  path: '/demo3',
  getComponent: () => System.import('modules/demo'),
  navPath: ['nav2', 'demo3']
}, {
  path: '/demo4',
  getComponent: () => System.import('modules/demo'),
  navPath: ['nav2', 'subNav', 'demo4']
}]
