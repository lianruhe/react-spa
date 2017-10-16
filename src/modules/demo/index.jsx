import React from 'react'
import Base from 'components/base'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setProgress, showProgress, hideProgress } from 'store/actions/core'
import { Button } from 'antd'
// import Grid from 'opiece-react-components/lib/grid'
import request from 'utils/request'
import { APP_RES } from 'utils/config'
import 'styles/app/home.css'

@connect(state => ({
  progress: state.core.progress
}), dispatch => ({
  ...bindActionCreators({ setProgress, showProgress, hideProgress }, dispatch)
}))
export default class Demo extends Base {
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

  @autobind
  handleRequest () {
    const body = new FormData()
    body.append('name', 'test')
    const cancelContentType = req => {
      const headers = req.headers
      delete headers['Content-Type']
      return req
    }
    request(`${APP_RES.base}/api/test`, {
      body,
      method: 'post',
      interceptors: {
        request: [cancelContentType]
      }
    }).then(response => { console.log(response) })
  }

  render () {
    return (
      <div id="ui-home">
        <div>
          进度条控制：
          <Button className="progress-btn" type="primary" onClick={this.progressUp}>+</Button>
          <Button className="progress-btn" type="primary" onClick={this.progressDown}>-</Button>
        </div>
        <div>
          进度条模拟:
          <Button className="progress-btn" type="primary" onClick={this.progressShow}>SHOWPROGRESS</Button>
        </div>
        <div>
          请求测试:
          <Button type="primary" onClick={this.handleRequest}>请求测试</Button>
        </div>
      </div>
    )
  }
}
