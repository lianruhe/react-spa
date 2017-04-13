// redirect route
const checkAuth = (nextState, replace, next) => {
  console.log(nextState)
  const auth = false // getStorage('tokenInfo')
  if (nextState.location.pathname !== '/login' && !auth) {
    replace('/login')
  }
  next()
}

export default [{
  path: '/login',
  getComponent: () => System.import('app/login')
}, {
  path: '/',
  getComponent: () => System.import('app'),
  onEnter: checkAuth,
  indexRoute: {
    getComponent: () => System.import('app/home')
  },
  childRoutes: [{
    path: 'home',
    getComponent: () => System.import('app/home')
  }, {
    path: '*',
    getComponent: () => System.import('app/404')
  }]
}]
