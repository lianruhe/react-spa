// import users from './users'

export default {
  '/': {
    title: '首页',
    component: require('app/home/index'),
    childroutes: {
      login: {
        title: '登录',
        component: require('app/login/index')
      },
      // // ...users,
      '*': {
        component: require('app/404/index')
      }
    }
  }
}
