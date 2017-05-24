import React, {
  Component
} from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import autobind from 'autobind-decorator'
import LoginForm from './form'
import { login } from 'store/actions/core'
// import { login } from 'store/actions/tokens'

import 'styles/app/login.css'

@connect(state => ({
  authorized: state.core.authorized
}), dispatch => ({
  ...bindActionCreators({ login }, dispatch)
}))
export default class Login extends Component {
  static propTypes = {
    // setAuth: PropTypes.func,
    login: PropTypes.func,
    authorized: PropTypes.bool
  }

  @autobind
  login (values) {
    console.log('login:', values)
    // this.props.setAuth(true)
    this.props.login({
      method: 'post',
      body: values
    })
  }

  render () {
    const { authorized } = this.props
    if (authorized) {
      return (
        <Redirect to="/home" />
      )
    }
    return (
      <div className="ui-login">
        <LoginForm handleLogin={this.login} />
      </div>
    )
  }
}
