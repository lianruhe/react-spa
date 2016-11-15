// import users from './users'

export default {
  path: '/',
  component: require('app/index'),
  indexRoute: {
    component: require('app/home/index')
  },
  childRoutes: [{
    path: 'home',
    component: require('app/home/index')
  }, {
    path: 'login',
    component: require('app/login/index')
  }, {
    path: '*',
    component: require('app/404/index')
  }]
}
