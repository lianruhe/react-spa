import React from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Button } from 'antd'
import { getDemoList } from 'store/actions/demo'

@connect(state => ({
  results: state.demo.results
}), dispatch => ({
  ...bindActionCreators({ getDemoList }, dispatch)
}))
export default class Test extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      count: 0
    }
  }

  static propTypes = {
    results: propTypes.object,
    getDemoList: propTypes.func
  }

  render () {
    const { count } = this.state
    const addFn = () => {
      this.setState({
        count: count + 1
      })
    }
    const minusFn = () => {
      this.setState({
        count: count - 1
      })
    }

    return (
      <div>
        <h1>this is a demo!</h1>
        <h2>count: {count}</h2>
        <p>
          <Button type="primary" onClick={addFn}> + </Button>
          <Button onClick={minusFn}> - </Button>
          <Button type="primary" onClick={this.props.getDemoList}> getList </Button>
        </p>
        <pre>{JSON.stringify(this.props.results, null, 2)}</pre>
      </div>
    )
  }
}
