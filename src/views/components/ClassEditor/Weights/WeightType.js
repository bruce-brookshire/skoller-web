import React from 'react'
import PropTypes from 'prop-types'
import {CheckboxField} from '../../../../components/Form'

class WeightType extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isPoints: false
    }
  }

  render () {
    return (
      <div className='cn-weight-type'>
        <div className='cn-weight-type-header'>
          Is this class based on points or percentages?
        </div>
        <CheckboxField
        
        />
        <CheckboxField
        
        />
      </div>
    )
  }
}
export default WeightType
