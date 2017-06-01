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

import { Form } from 'antd'
const FormItem = Form.Item

export default Form.create({
  mapPropsToFields: props => props.formData || {}
})(class FormClass extends Component {
  static propTypes = {
    form: PropTypes.object,
    items: PropTypes.array.isRequired,
    handleSubmit: PropTypes.func.isRequired
  }

  @autobind
  handleSubmit (e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        this.props.handleSubmit(values)
      }
    })
  }

  render () {
    const { form, items, handleSubmit, ...props } = this.props
    const { getFieldDecorator } = form

    const formItemLayout = {
      labelCol: { span: 3, offset: 1 },
      wrapperCol: { span: 15 }
    }
    return (
      <Form onSubmit={this.handleSubmit} className="login-form" {...props}>
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
