export default {
  icon: 'appstore',
  title: 'navtest',
  subMenu: [{
    title: 'test',
    path: '/test',
    getComponent: () => System.import('modules/demo')
  }, {
    icon: 'appstore',
    title: 'subNav',
    subMenu: [{
      title: 'test1',
      path: '/test1',
      getComponent: () => System.import('modules/home')
    }, {
      title: 'test2',
      path: '/test2',
      getComponent: () => System.import('modules/404')
    }]
  }]
}
