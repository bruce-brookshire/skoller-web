import React from 'react'
import PropTypes from 'prop-types'
import {Form, ValidateForm} from 'react-form-library'
import {InputField, CheckboxField} from '../../../../components/Form'

const pointField = {
  pointTotal: {
    validate: (value) => { return value && value > 0 }
  }
}

class WeightType extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isPoints: this.props.isPoints || false,
      pointTotal: this.props.isPoints ? props.pointTotal || 0 : 0
    }
  }

  render () {
    return (
      <div className='cn-weight-type'>
        <div className='cn-section-content-header'>
          Step 1: Set Up Weights
        </div>
        <div id='cn-weight-form-instructions'>
          Weights are how much a certain group of assignments contribute to your final grade.
        </div>
        <hr />
        <div className='cn-section-content-subheader'>
          Is this class based on percentages or points?
        </div>
        <div className="checkbox-container">
          <div className="checkboxes">
            <CheckboxField
              containerClassName='margin-top margin-right'
              label='Percentage (20%)'
              name='isPercentage'
              id='checkbox-id'
              onChange={(value) => {
                this.setState({isPoints: !value})
              }}
              value={!this.state.isPoints}
            />
            <CheckboxField
              containerClassName='margin-top margin-right'
              label='Points (100/500)'
              name='isPoints'
              id='checkbox-id'
              onChange={(value) => {
                this.setState({isPoints: value})
              }}
              value={this.state.isPoints}
            />
          </div>
        </div>
        <div className='button-container'>
          <button
            className='margin-top margin-bottom button full-width'
            onClick={() => this.props.onSubmit(this.state.isPoints)}
          >
            Next
          </button>
        </div>
      </div>
    )
  }
}

WeightType.propTypes = {
  isPoints: PropTypes.bool,
  pointTotal: PropTypes.number,
  onSubmit: PropTypes.func
}

export default WeightType
