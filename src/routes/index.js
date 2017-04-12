// react routers
export default {
  path: '/',
  getComponent: () => System.import('app'),
  indexRoute: {
    getComponent: () => System.import('app/home')
  },
  childRoutes: [{
    path: 'home',
    getComponent: () => System.import('app/home')
  }, {
    path: 'login',
    getComponent: () => System.import('app/login')
  }, {
    path: '*',
    getComponent: () => System.import('app/404')
  }]
}
