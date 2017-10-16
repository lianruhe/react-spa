import React from 'react'
import pureRender from 'utils/pure-render'
// import PropTypes from 'prop-types'
import Form from 'opiece-react-components/lib/form'
import { Input, Icon, Button } from 'antd'
// import './style.css'

const DemoForm = () => {
  const handleSubmit = values => {
    console.log('submit ' + values)
  }
  const items = [{
    label: '用户名',
    id: 'name',
    options: {
      rules: [{ required: true, message: 'Please select your country!' }]
    },
    element: <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
  }, {
    label: '密码',
    id: 'password',
    options: {
      rules: [{ required: true, message: 'Please input your Password!' }]
    },
    element: <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
  }, {
    id: 'opeation',
    col: {
      labelCol: { span: 0 },
      wrapperCol: { span: 12, offset: 6 }
    },
    element: <span><Button type="primary" htmlType="submit">Submit</Button><Button>Cancel</Button></span>
  }]
  const formData = {
    name: {
      value: '123'
    }
  }
  return (
    <Form className="ui-demo-form" layout="horizontal" items={items} handleSubmit={handleSubmit} formData={formData} />
  )
}

export default pureRender(DemoForm)
