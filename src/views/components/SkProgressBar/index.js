import React from 'react'
import PropTypes from 'prop-types'
import TasksIcon from '../../../assets/sk-icons/TasksIcon'

class skProgressBar extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      loading: true,
      measureWidth: null
    }
  }

  componentDidMount () {
    this.setState({measureWidth: this.measure.offsetWidth, loading: false})
  }

  renderColor (color) {
    const skColors = {
      '$cn-font-color': '#4a4a4a',
      '$cn-color-darkgrey': '#4a4a4a',
      '$cn-color-blue': '#57B9E4',
      '$cn-color-yellow': '#FDBA22',
      '$cn-color-pink': '#EA8A8A',
      '$cn-color-white': '#fff',
      '$cn-color-grey': '#a9a9a9',
      '$cn-color-orange': '#ff6d00',
      '$cn-color-red': '#ff4159',
      '$cn-color-green': '#7ed321',
      '$cn-primary-background-color': '#f5f7f9',
      '$cn-blue-cell-background': '#edf5ff',
      '$cn-link-background': 'rgba(85,185,229,0.2)',
      '$cn-form-border': '#CCC',
      '$cn-color-hover-grey': '#e9e9e9'
    }

    let fillColor

    if (color) {
      Object.keys(skColors).forEach(function (item) {
        if (color === item) {
          fillColor = skColors[item]
        }
      })
      if (fillColor) {
        return fillColor
      } else {
        return color
      }
    } else {
      fillColor = '#57B9E4'
      return fillColor
    }
  }

  render () {
    const measureStyle = {
      width: this.props.width,
      height: '8px',
      borderRadius: '8px',
      backgroundColor: `${this.renderColor(this.props.backgroundColor)}75`,
      border: `1px solid ${this.renderColor(this.props.backgroundColor)}`
    }

    const markerStyle = {
      position: 'absolute',
      transform: `translate(${(this.state.measureWidth * this.props.progress) - 16}px, -5px)`,
      width: '16px',
      height: '16px',
      boxSizing: 'border-box',
      border: `1px solid ${this.renderColor(this.props.backgroundColor)}`,
      borderRadius: '8px',
      backgroundColor: 'white',
      boxShadow: '0px 2px 8px rgba(0,0,0,.12)'
    }

    const measureFillStyle = {
      position: 'absolute',
      transform: `translate(${(this.state.measureWidth * this.props.progress) - 16}px, -1px)`,
      width: `${this.state.measureWidth - (this.state.measureWidth * this.props.progress) + 16}px`,
      height: '8px',
      border: `1px solid ${this.renderColor(this.props.backgroundColor)}`,
      borderRadius: '8px',
      backgroundColor: 'white'
    }

    return (
      <div className='sk-progress-container' style={{boxSizing: 'border-box'}}>
        <div className='sk-progress-measure' ref={measure => { this.measure = measure } } style={measureStyle}>
          {this.state.loading
            ? null
            : <div>
              {(this.props.progress >= 1)
                ? null
                : <div className='sk-progress-measure-fill' style={measureFillStyle} />
              }
              <div className='sk-progress-marker' style={markerStyle} />
            </div>
          }
        </div>
      </div>
    )
  }
}

skProgressBar.propTypes = {
  progress: PropTypes.number,
  width: PropTypes.string,
  backgroundColor: PropTypes.string
}

export default skProgressBar
