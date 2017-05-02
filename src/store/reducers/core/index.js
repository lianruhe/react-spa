import { handleActions } from 'redux-actions'

export default handleActions({

  SET_PROGRESS: (state, action) => ({
    progress: action.payload.progress || 0
  }),

  SET_AUTH: (state, action) => ({
    authorized: !!action.payload.authorized
  })

}, {
  progress: 0,
  authorized: true
})
