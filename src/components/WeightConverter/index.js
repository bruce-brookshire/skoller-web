import React from 'react'
import PropTypes from 'prop-types'

class WeightConverter extends React.Component {


  render () {
    return (
      <span>
        <div className='converter-titles-container'>
          <span className='converter-titles'>
            Percentages
          </span>
          <span className='converter-titles'>
            Points
          </span>
        </div>
        <div>
            <input className='weight-converter-bar' type="range" min="1" max="2"/>
        </div>
      </span>
    )
  }
}



export default WeightConverter