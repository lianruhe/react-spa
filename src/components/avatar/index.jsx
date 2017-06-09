import React from 'react'
import pureRender from 'utils/pure-render'
import PropTypes from 'prop-types'

import './style.css'

const Avatar = ({ className, children, size }) => {
  let cls = 'avatar'
  if (className) {
    cls += (' ' + className)
  }
  if (/^(large|small)?$/.test(size)) {
    cls += (' ' + size)
  }

  return (
    <i className={cls}>
      { children }
    </i>
  )
}

Avatar.propTypes = {
  className: PropTypes.string,
  children: PropTypes.element,
  size: PropTypes.string
}

export default pureRender(Avatar)
