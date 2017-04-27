// redirect route
// const checkAuth = (nextState, replace, next) => {
//   const auth = true // getStorage('tokenInfo')
//   if (!auth) {
//     replace({
//       pathname: '/login',
//       query: {
//         redirect: nextState.location.pathname
//       }
//     })
//   }
//
//   next()
// }

// export default [{
//   path: '/login',
//   getComponent: () => System.import('app/login')
// }, {
//   path: '/',
//   getComponent: () => System.import('app'),
//   indexRoute: {
//     getComponent: () => System.import('app/home')
//   },
//   childRoutes: [{
//     path: 'home',
//     getComponent: () => System.import('app/home')
//   }, {
//     path: '*',
//     getComponent: () => System.import('app/404')
//   }]
// }]

export default [{
  path: '/home',
  getComponent: () => System.import('modules/home'),
  exact: true,
  meta: {
    auth: false,
    title: '首页',
    name: 'home',
    level: ''
  }
}, {
  path: '/login',
  getComponent: () => System.import('modules/login'),
  exact: true,
  meta: {
    auth: false,
    title: '实例',
    name: 'count',
    level: ''
  }
}]
