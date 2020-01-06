import React from 'react'
import PropTypes from 'prop-types'

class WeightIcon extends React.Component {
  render () {
    console.log(this.props.color, this.props.weight)
    let weight = this.props.weight
    let gray = 'rgba(0, 0, 0, 0.05)'
    let impact
    let colorSet = {
      'one': {color: gray, opacity: '100%'},
      'two': {color: gray, opacity: '100%'},
      'three': {color: gray, opacity: '100%'}
    }

    if (weight === 0) {
      impact = 'none'
    } else if (weight < 0.05) {
      impact = 'low'
      colorSet.one.color = this.props.color
    } else if (weight < 0.15) {
      impact = 'medium'
      colorSet.one.color = this.props.color
      colorSet.one.opacity = '75%'
      colorSet.two.color = this.props.color
    } else {
      impact = 'high'
      colorSet.one.color = this.props.color
      colorSet.one.opacity = '50%'
      colorSet.two.color = this.props.color
      colorSet.two.opacity = '75%'
      colorSet.three.color = this.props.color
    }

    return (
      <div style={{
        height: '24px',
        width: '36px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        paddingBottom: '4px'
      }}>
        <div style={{height: '33%', width: '12px', backgroundColor: colorSet.one.color, opacity: colorSet.one.opacity, borderRadius: '3px 3px 0 0'}} />
        <div style={{height: '66%', width: '12px', backgroundColor: colorSet.two.color, opacity: colorSet.two.opacity, borderRadius: '3px 3px 0 0'}} />
        <div style={{height: '100%', width: '12px', backgroundColor: colorSet.three.color, borderRadius: '3px 3px 0 0'}} />
      </div>
    )
  }
}

WeightIcon.propTypes = {
  color: PropTypes.string,
  weight: PropTypes.number
}

export default WeightIcon
