import React from 'react'
import PropTypes from 'prop-types'
import { SketchPicker } from 'react-color'

export default class SketchExample extends React.Component {
  static propTypes = {
    defaultValue: PropTypes.object,
    onChange: PropTypes.func
  }

  state = {
    displayColorPicker: false,
    color: this.props.defaultValue || {
      r: '82',
      g: '158',
      b: '242',
      a: '1'
    }
  }

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  }

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  }

  handleChange = color => {
    this.setState({ color: color.rgb })

    this.props.onChange && this.props.onChange(color)
  }

  render () {
    const styles = {
      color: {
        width: '36px',
        height: '14px',
        borderRadius: '2px',
        background: `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`
      },
      swatch: {
        padding: '4px',
        background: '#fff',
        borderRadius: '4px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer'
      },
      popover: {
        position: 'absolute',
        zIndex: '1001'
      },
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px'
      }
    }

    return (
      <div>
        <div style={ styles.swatch } onClick={ this.handleClick }>
          <div style={ styles.color } />
        </div>
        { this.state.displayColorPicker && <div style={ styles.popover }>
          <div style={ styles.cover } onClick={ () => this.handleClose() } />
          <SketchPicker color={ this.state.color } onChange={ this.handleChange } />
        </div> }

      </div>
    )
  }
}
