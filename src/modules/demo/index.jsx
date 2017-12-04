import React from 'react'
import Base from 'components/base'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setProgress, showProgress, hideProgress } from 'store/actions/core'
import { Button } from 'antd'
import QueueAnim from 'rc-queue-anim'
// import download from 'download'
// import Grid from 'opiece-react-components/lib/grid'
import request from 'opiece-utils/lib/request'
import { APP_RES } from 'utils/config'
import 'styles/app/demo.css'

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

  state = {
    show: true,
    loading: false
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

  downloadFile (url) {
    try {
      const elemIF = document.createElement('iframe')
      elemIF.src = url
      elemIF.style.display = 'none'
      elemIF.onload = () => {
        console.log('下载文件好像不行～ ～')
      }
      elemIF.onloadeddata = () => {
        console.log('onloadeddata～ ～')
      }
      elemIF.ownerDocument.onloadeddata = () => {
        console.log('onloadeddata～ ～')
      }
      elemIF.ownerDocument.onreadystatechange = () => {
        console.log(1111, elemIF.ownerDocument.readyState)
      }
      document.body.appendChild(elemIF)
    } catch (e) {
      console.log(e)
    }

    // download(url, 'dist').then(() => {
    //   console.log('done!')
    // })
  }

  render () {
    return (
      <div id="ui-demo">
        <div className="demo-box">
          <div className="demo-title">
            进度条控制
          </div>
          <div className="demo-content">
            <Button className="progress-btn" type="primary" onClick={this.progressUp}>进度条++</Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button className="progress-btn" type="primary" onClick={this.progressDown}>进度条--</Button>
          </div>
          <div className="demo-content">
            <Button className="progress-btn" type="primary" onClick={this.progressShow}>进度条加载</Button>
          </div>
        </div>
        <div className="demo-box">
          <div className="demo-title">
            请求测试
          </div>
          <div className="demo-content">
            <Button type="primary" onClick={this.handleRequest}>请求</Button>
          </div>
        </div>
        <div className="demo-box">
          <div className="demo-title">
            动画
          </div>
          <div className="demo-content">
            <p className="buttons">
              <Button type="primary" onClick={ () => {
                this.setState({
                  show: !this.state.show
                })
              }}>切换</Button>
            </p>
            <QueueAnim className="demo-content"
              animConfig={[
                { opacity: [1, 0], translateY: [0, 50] },
                { opacity: [1, 0], translateY: [0, -50] }
              ]}>
              {this.state.show ? [
                <div className="demo-thead" key="a" />,
                <div className="demo-tbody" key="b">
                  <ul>
                    <li />
                    <li />
                    <li />
                  </ul>
                </div>
              ] : null}
            </QueueAnim>
          </div>
        </div>
        <div className="demo-box">
          <div className="demo-title">
            下载文件
          </div>
          <div className="demo-content">
            {/* <Button type="primary" onClick={() => this.downloadFile('http://155.16.142.11:100/soft/browser/chrome/AxureRP_for_chorme_0_6_2.crx')}>下载</Button> */}
            <Button type="primary" onClick={() => this.downloadFile('/static/font/iconfont.woff')}>下载</Button>
          </div>
        </div>
      </div>
    )
  }
}
