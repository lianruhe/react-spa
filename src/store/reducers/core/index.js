import { handleActions } from 'redux-actions'
import { SET_PROGRESS, SET_AUTH } from '../../constants/action-types'

export default handleActions({

  [SET_PROGRESS]: (state, action) => ({
    ...state,
    progress: action.payload || 0
  }),

  [SET_AUTH]: (state, action) => {
    console.log(action, 1111111111)
    return {
      ...state,
      authorized: !!action.payload
    }
  }

}, {
  progress: 0,
  authorized: false
})
