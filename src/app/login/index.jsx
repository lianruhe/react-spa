import React, {
  Component
} from 'react'
import LoginForm from './form'
import 'styles/app/login.css'

export default class Login extends Component {

  // static propTypes = {
  //   children: PropTypes.element
  // };

  render () {
    return (
      <div className="ui-login">
        <LoginForm />
      </div>
    )
  }
}
