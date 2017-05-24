import isPlainObject from 'lodash/isPlainObject'
import assignWith from 'lodash/assignWith'

/**
 * 合并对象
 * 当一级属性是对象时执行合并，否则执行覆盖
 * @example
 *   merge({a: {b: 1}}, {a: {c: 1}}) => {a: {b: 1, c: 1}}
 *   merge({a: {b: { x: 1 }}}, {a: {b: { y: 2 }}}) => {a: {b: { y: 2 }}}
 * @method
 * @param  {object} object  目标对象
 * @param  {array}  sources 待合入对象列表
 * @return {object}         目标对象
 */
export default (object, ...sources) => assignWith(object, ...sources, (objValue, srcValue) => {
  if (isPlainObject(srcValue)) {
    if (!isPlainObject(objValue)) {
      objValue = {}
    }
    return { ...objValue, ...srcValue }
  }
  return srcValue
})
