import React from 'react'

const App = props => (
  <div>
    {props.children}
  </div>
)

App.propTypes = {
  children: React.PropTypes.element
}

export default App

// import React, {
//   Component
//   /* , PropTypes */
// } from 'react'
//
// export default class App extends Component {
//
//   static propTypes = {
//     children: React.PropTypes.element
//   };
//
//   render () {
//     return (
//       <div>
//         {this.props.children}
//       </div>
//     )
//   }
// }
