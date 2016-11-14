import React, {
  Component
  /* , PropTypes */
} from 'react'

export default class Home extends Component {

  // static propTypes = {
  //   children: PropTypes.element
  // };
  //
  componentWillMount () {}

  render () {
    return (
      <div style={{height: '100%', width: '100%', backgroundColor: 'red'}}>
        this is a home page!
      </div>
    )
  }
}
