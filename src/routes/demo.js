export default [{
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
  }, {
    title: '表单',
    path: '/demo-form',
    getComponent: () => System.import('modules/demo/form')
  }, {
    title: 'test',
    path: '/demo-test',
    getComponent: () => System.import('modules/demo/test')
  }, {
    title: '百度',
    path: '/iframe-baidu',
    getComponent: () => System.import('modules/iframe')
  }, {
    title: '本站',
    path: '/iframe-table',
    getComponent: () => System.import('modules/iframe')
  }]
}]
