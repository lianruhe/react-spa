import React from 'react'

// import MAPS from './maps'
import style from './index.css'

export const Icon = ({ type }) => (
  // <svg width="22" height="22" viewBox="0 0 1024 1024">
  //   <path d={MAPS[props.type]}></path>
  // </svg>
  <i className={ style['c-icon'] }>{ type }</i>
)

Icon.propTypes = {
  type: React.PropTypes.string
}

export default Icon
