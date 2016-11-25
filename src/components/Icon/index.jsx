import React from 'react'
require('./index.css')
import MAPS from './maps'

export const Icon = ({ type }) => (
  // <svg width="22" height="22" viewBox="0 0 1024 1024">
  //   <path d={MAPS[props.type]}></path>
  // </svg>
  <i className="c-icon">{MAPS[type]}</i>
)

Icon.propTypes = {
  type: React.PropTypes.string
}

export default Icon
