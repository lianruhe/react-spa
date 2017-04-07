
export default {
  path: '/',
  getComponent: () => System.import('app/index'),
  indexRoute: {
    getComponent: () => System.import('app/home/index')
  },
  childRoutes: [{
    path: 'home',
    getComponent: () => System.import('app/home/index')
  }, {
    path: 'login',
    getComponent: () => System.import('app/login/index')
  }, {
    path: '*',
    getComponent: () => System.import('app/404/index')
  }]
}
