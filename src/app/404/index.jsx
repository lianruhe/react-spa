import React, {
  Component
  /* , PropTypes */
} from 'react'
// import Header from 'components/Header';
import Icon from 'components/Icon/index.jsx'
// import { Icon2 } from 'components/Icon'
console.log(Icon)
export default class Error extends Component {

  // static propTypes = {
  //   children: PropTypes.element
  // };

  render () {
    return (
      <div>
        <div><Icon type="tools" />404</div>
        <div>
          <button>返回</button>
          <button>首页</button>
        </div>
      </div>
    )
  }
}

// export default () => (
//   <div>
//     <div><Icon />404</div>
//     <div>
//       <button>返回</button>
//       <button>首页</button>
//     </div>
//   </div>
// )
