// 引用immutable.js的使用，重写组件的 shouldComponentUpdate，减少组件不必要的更新，优化性能
import { is, fromJS } from 'immutable'

export default component => {
  component.prototype.shouldComponentUpdate = function (nextProps, nextState) {
    return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
  }
  return component
}
