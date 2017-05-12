import { createAction } from 'redux-actions'
import { SET_PROGRESS, SET_AUTH } from '../constants/action-types'

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
// export const setAuth = () => {
//   return dispatch => {
//
//   }
// }
