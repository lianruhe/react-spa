import React from 'react'
import Base from 'components/base'
import PropTypes from 'prop-types'

import FormClass from './form'

export default class RcForm extends Base {
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
        <FormClass
          wrappedComponentRef={inst => { this.formRef = inst }}
          items={items}
          handleSubmit={handleSubmit}
          {...props} />
      </div>
    )
  }
}
