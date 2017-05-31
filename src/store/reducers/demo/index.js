import { handleActions } from 'redux-actions'
import { GET_DEMO_LIST } from '../../constants/action-types'

export default handleActions({

  [GET_DEMO_LIST]: (state, action) => ({
    ...state,
    progress: action.payload || 0
  })

}, {
  progress: 0
})
