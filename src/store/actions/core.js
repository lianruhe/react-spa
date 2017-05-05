import { createAction } from 'redux-actions'
import { SET_PROGRESS, SET_AUTH } from '../constants/action-types'

export const progress = createAction(SET_PROGRESS)
export const setProgress = payload => {
  return dispatch => {
    let num = payload
    if (num < 0) {
      num = 0
    }
    if (num > 100) {
      num = 100
    }

    // 改变 progress
    dispatch(progress(num))

    // 完成 500ms 之后，设置为 0
    if (num === 100) {
      setTimeout(() => {
        dispatch(progress(0))
      }, 500)
    }
  }
}

export const setAuth = createAction(SET_AUTH,
  payload => payload)
