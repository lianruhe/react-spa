export default [{
  icon: 'rocket',
  title: 'demo',
  subMenu: [{
    title: '小组件',
    path: '/demo',
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
    title: '百度',
    path: '/iframe-baidu',
    getComponent: () => System.import('modules/iframe')
  }]
}]
