import React from 'react'
import Base from 'components/base'
// import PropTypes from 'prop-types'
// import autobind from 'autobind-decorator'
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
// import { setProgress, showProgress, hideProgress } from 'store/actions/core'
import { Row, Col } from 'antd'
import 'styles/app/home.css'

// @connect(state => ({
//   progress: state.core.progress
// }), dispatch => ({
//   ...bindActionCreators({ setProgress, showProgress, hideProgress }, dispatch)
// }))
export default class Home extends Base {
  render () {
    return (
      <Row id="ui-home" type="flex" justify="center" align="middle">
        <Col>
          <img src="static/images/home-welcome.jpg" width="300px" />
          <span className="text">欢迎回来</span>
        </Col>
      </Row>
    )
  }
}
