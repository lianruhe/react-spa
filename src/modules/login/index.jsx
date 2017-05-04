import React, {
  Component
} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import LoginForm from './form'
import { login } from 'store/actions/tokens'

import 'styles/app/login.css'

@connect(state => ({
  tokens: state.tokens
}), dispatch => ({
  ...bindActionCreators(login, dispatch)
}))
export default class Login extends Component {
  static propTypes = {
    login: PropTypes.func
  };

  login () {
    console.log(1111)
  }

  render () {
    return (
      <div className="ui-login">
        <LoginForm />
        <button onClick={login} >test</button>
      </div>
    )
  }
}
