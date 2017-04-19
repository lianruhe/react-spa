// import React from 'react'
// // import propTypes from 'prop-types'
// import 'antd/lib/style/index.css'
//
// const App = props => (
//   <div>
//     {props.children}
//   </div>
// )
//
// App.propTypes = {
//   children: React.PropTypes.element
// }
//
// export default App

import React, {
  Component
} from 'react'
import PropTypes from 'prop-types'

export default class App extends Component {

  static propTypes = {
    children: PropTypes.element
  };

  render () {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}
