import { handleActions } from 'redux-actions'

export default handleActions({

  LOGIN: (state, action) => {
    return {
      ...state,
      ...action.payload
    }
  },

  LOGOUT: (state, action) => ({
    ...action.payload
  })

}, {})
