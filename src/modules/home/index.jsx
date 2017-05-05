import React, { Component } from 'react'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setProgress } from 'store/actions/core'

@connect(state => ({
  progress: state.core.progress
}), dispatch => ({
  ...bindActionCreators({ setProgress }, dispatch)
}))
export default class Home extends Component {
  static propTypes = {
    progress: PropTypes.number,
    setProgress: PropTypes.func
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

  // componentWillMount () {
  //   const that = this
  //   const timer = setInterval(() => {
  //     const { progress, setProgress } = that.props
  //     if (progress >= 80) {
  //       clearInterval(timer)
  //     } else {
  //       setProgress(progress + 10)
  //     }
  //   }, 500)
  // }
  //
  // componentDidMount () {
  //   this.props.setProgress(100)
  //   setTimeout(() => {
  //     this.props.setProgress(0)
  //   }, 600)
  // }

  render () {
    return (
      <div id="ui-home">
        this is a home page!
        <div>
          <button onClick={this.progressUp}>UP</button>
          <button onClick={this.progressDown}>DOWN</button>
        </div>
      </div>
    )
  }
}
