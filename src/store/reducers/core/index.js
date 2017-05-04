import { handleActions } from 'redux-actions'
import { SET_PROGRESS, SET_AUTH } from '../../constants/action-types'

export default handleActions({

  [SET_PROGRESS]: (state, action) => ({
    progress: action.payload || 0
  }),

  [SET_AUTH]: (state, action) => ({
    authorized: !!action.payload.authorized
  })

}, {
  progress: 0,
  authorized: true
})
