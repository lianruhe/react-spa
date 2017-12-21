import React from 'react'
import { Row, Col, Spin } from 'antd'

export default class PageLoading extends React.PureComponent {
  render () {
    return (
      <Row type="flex" justify="space-around" align="middle" style={{ height: '100%' }}>
        <Col>
          <Spin size="large" />
        </Col>
      </Row>
    )
  }
}
