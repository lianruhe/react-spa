/**
 * 创建 error toast middleware
 */
import { message } from 'antd'

const showMessage = payload => {
  message.error('request error!')
  // if (payload && payload.message) {
  //   message.error(payload.message)
  // }
}

export default ({ dispatch }) => next => action => {
  const { payload, error } = action

  // 请求报错提示
  if (error) {
    showMessage(payload)
  }

  return next(action)
}
