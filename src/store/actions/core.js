import { createAction } from 'redux-actions'
import { SET_PROGRESS, SET_AUTH } from '../constants/action-types'

export const setProgress = createAction(SET_PROGRESS,
  payload => {
    return payload
  })

export const setAuth = createAction(SET_AUTH,
  payload => payload)
