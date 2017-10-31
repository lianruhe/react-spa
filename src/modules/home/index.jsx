import React from 'react'
import Base from 'components/base'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setProgress, showProgress, hideProgress } from 'store/actions/core'
import { Row, Col } from 'antd'
import 'styles/app/home.css'

@connect(state => ({
  progress: state.core.progress
}), dispatch => ({
  ...bindActionCreators({ setProgress, showProgress, hideProgress }, dispatch)
}))
export default class Home extends Base {
  static propTypes = {
    progress: PropTypes.number,
    setProgress: PropTypes.func,
    showProgress: PropTypes.func,
    hideProgress: PropTypes.func
  }

  @autobind
  progressUp () {
    const { progress, setProgress } = this.props
    const curProgress = progress + 20
    setProgress(curProgress >= 100 ? 100 : curProgress)
  }

  @autobind
  progressDown () {
    const { progress, setProgress } = this.props
    const curProgress = progress - 10
    setProgress(curProgress <= 0 ? 0 : curProgress)
  }

  @autobind
  progressShow () {
    const { showProgress, hideProgress } = this.props
    showProgress()
    setTimeout(() => {
      hideProgress()
    }, 4000)
  }

  render () {
    return (
      <Row id="ui-home" type="flex" justify="center" align="middle">
        <Col>
          <img src="static/images/home-welcome.jpg" width="300px" />
          <span className="text">欢迎回来
            {/* <span className="text-a">运</span>
            <span className="text-b">行</span>
            <span className="text-c">中...</span> */}
          </span>
          {/* <h2>试运行...</h2> */}
        </Col>
      </Row>
    )
  }
}
