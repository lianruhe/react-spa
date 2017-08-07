/**
* form 渲染的节点
* @param {array} items         FormItems 构建需要的值
* {
*   id: 'key',
*   label: 'label',
*   col: 'Form Item props',
*   element: 'FormItem element',
*   options: 'getFieldDecorator options'
* }
* @param {func} handleSubmit   提交触发的方法
 */
import React, {
  Component
} from 'react'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'
import mapPropsToFields from './mapPropsToFields'

import { Form } from 'antd'
const FormItem = Form.Item

export default Form.create({
  mapPropsToFields
})(class FormClass extends Component {
  static propTypes = {
    form: PropTypes.object,
    items: PropTypes.array.isRequired,
    handleSubmit: PropTypes.func
  }

  @autobind
  handleSubmit (e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values)
        // delete values['__opeation']
        Object.keys(values).forEach(key => {
          if (typeof values[key] === 'undefined' || values[key] === '') {
            delete values[key]
          }
        })
        this.props.handleSubmit(values)
      }
    })
  }

  render () {
    const { form, items, handleSubmit, ...props } = this.props
    delete props.formData
    const { getFieldDecorator } = form

    const formItemLayout = props.layout === 'vertical' ? null : {
      labelCol: { span: 6, offset: 1 },
      wrapperCol: { span: 17 }
    }
    return (
      <Form onSubmit={this.handleSubmit} {...props}>
        {
          items.map((item, index) =>
            <FormItem key={index} label={item.label} {...formItemLayout} {...item.col}>
              { getFieldDecorator(item.id, item.options)(item.element) }
            </FormItem>
          )
        }
      </Form>
    )
  }
})
