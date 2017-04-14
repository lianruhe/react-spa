// redirect route
const checkAuth = (nextState, replace, next) => {
  const auth = true // getStorage('tokenInfo')
  if (!auth) {
    replace({
      pathname: '/login',
      query: {
        redirect: nextState.location.pathname
      }
    })
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
