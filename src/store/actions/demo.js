import { createAction } from 'redux-actions'
import request from 'opiece-utils/lib/request'
import { APP_RES } from 'utils/config'
import { GET_DEMO_LIST } from '../constants/action-types'
import { DEMO_LIST_API } from '../constants/apis'

export const getDemoList = createAction(GET_DEMO_LIST, () => request(`${APP_RES.base}${DEMO_LIST_API}`))
