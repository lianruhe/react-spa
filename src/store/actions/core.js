import { createAction } from 'redux-actions'
import { SET_PROGRESS, SET_AUTH, SET_USER } from '../constants/action-types'
// import request from 'opiece-utils/lib/request'
// import { APP_RES } from 'utils/config'
// import { LOGIN_API } from '../constants/apis'

export const setProgress = createAction(SET_PROGRESS)
let timer = null
export const showProgress = () => {
  return dispatch => {
    // 如果已经存在则不再执行
    if (timer) {
      return
    }

    let num = 10
    timer = setInterval(() => {
      num += 5
      if (num <= 90) {
        // 改变 progress
        dispatch(setProgress(num))
      }
    }, 400)
  }
}
export const hideProgress = () => {
  return dispatch => {
    clearInterval(timer)
    timer = null

    dispatch(setProgress(100))
    // 完成 500ms 之后，设置为 0
    setTimeout(() => {
      dispatch(setProgress(0))
    }, 500)
  }
}

// let prom = null
export const setAuth = createAction(SET_AUTH,
  payload => new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(payload)
    }, 500)
  }))

export const setUser = createAction(SET_USER)

export const login = payload => {
  return dispatch => {
    dispatch(setAuth(true))
    dispatch(setUser({
      username: 'test'
    }))
    // request(`${APP_RES.base}${LOGIN_API}`, payload).then(data => {
    //   dispatch(setAuth(true))
    //   dispatch(setUser(data))
    // }).catch(data => {
    //   dispatch(setUser(data))
    // })
  }
}
