import React from 'react'
import PropTypes from 'prop-types'

// import MAPS from './maps'
import './index.css'

export const Icon = ({ type }) => (
  // <svg width="22" height="22" viewBox="0 0 1024 1024">
  //   <path d={MAPS[props.type]}></path>
  // </svg>
  <i className="c-icon">{ type }</i>
)

Icon.propTypes = {
  type: PropTypes.string
}

export default Icon
