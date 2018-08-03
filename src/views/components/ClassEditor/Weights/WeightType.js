import React from 'react'
import PropTypes from 'prop-types'
import {CheckboxField} from '../../../../components/Form'

class WeightType extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isPoints: this.props.isPoints || false
    }
  }

  render () {
    return (
      <div className='cn-weight-type'>
        <div className='cn-section-content-header'>
          Is this class based on points or percentages?
        </div>
        <CheckboxField
          containerClassName='margin-top margin-right'
          label='Points (e.g. 100/500)'
          name='isPoints'
          onChange={(name, value) => {
            this.setState({isPoints: value})
          }}
          value={this.state.isPoints}
        />
        <CheckboxField
          containerClassName='margin-top margin-right'
          label='Percentage (e.g. 20%)'
          name='isPercentage'
          onChange={(name, value) => {
            this.setState({isPoints: !value})
          }}
          value={!this.state.isPoints}
        />
        <button
          className='margin-top margin-bottom button full-width'
          onClick={() => this.props.onSubmit(this.state.isPoints)}
        >
          Next Step
        </button>
      </div>
    )
  }
}

WeightType.propTypes = {
  isPoints: PropTypes.bool,
  onSubmit: PropTypes.func
}

export default WeightType
