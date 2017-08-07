/**
 * 封装的 form
 * @param {string} className    自定义类名
 * @param {array} items         FormItems 构建需要的值
 * @param {func} handleSubmit   提交触发的方法
 * @param {object} props        Form 其它的一些参数
 * @param {object} formData     Form 初始化参数
 */
import React from 'react'
// import Base from 'components/base'
import PropTypes from 'prop-types'

import FormClass from './form'
// import './style.css'

export default class RcForm extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    items: PropTypes.array.isRequired,
    handleSubmit: PropTypes.func
  }

  render () {
    const { className, items, handleSubmit, ...props } = this.props
    let cls = 'component-form'
    if (className) {
      cls += (' ' + className)
    }

    return (
      <div className={cls}>
        <FormClass wrappedComponentRef={inst => { this.formRef = inst }} items={items} handleSubmit={handleSubmit} {...props} />
      </div>
    )
  }
}
