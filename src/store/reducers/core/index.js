import { handleActions } from 'redux-actions'
import { SET_PROGRESS, SET_AUTH, SET_USER } from '../../constants/action-types'

export default handleActions({

  [SET_PROGRESS]: (state, action) => ({
    ...state,
    progress: action.payload || 0
  }),

  [SET_AUTH]: (state, action) => {
    return {
      ...state,
      authorized: !!action.payload
    }
  },

  [SET_USER]: (state, action) => {
    return {
      ...state,
      user: action.payload
    }
  }

}, {
  progress: 0,
  authorized: false,
  user: {}
})
