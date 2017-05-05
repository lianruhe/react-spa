// 监听状态改变，改变进度条进度
import { setProgress } from '../actions/core'

const defaultTypeSuffixes = ['REQUEST', 'SUCCESS', 'FAILURE']

const progress = ({ dispatch }) => next => action => {
  const result = next(action)

  if (action.type === undefined) {
    return result
  }

  const [PENDING, FULFILLED, REJECTED] = defaultTypeSuffixes

  const isPending = `_${PENDING}`
  const isFulfilled = `_${FULFILLED}`
  const isRejected = `_${REJECTED}`

  if (action.type.indexOf(isPending) !== -1) {
    dispatch(setProgress())
  } else if (action.type.indexOf(isFulfilled) !== -1 || action.type.indexOf(isRejected) !== -1) {
    dispatch(setProgress(0))
  }

  return result
}

export default progress
