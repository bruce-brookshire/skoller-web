import React from 'react'
import PropTypes from 'prop-types'
import { Form, ValidateForm } from 'react-form-library'
import { InputField } from '../../../../components/Form'

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
      form: {
        pointTotal: props.pointTotal || ''
      }
    }
  }

  render () {
    const {form} = this.state
    // console.log(this.state.isPoints)
    // console.log(form)
    const {formErrors, updateProperty} = this.props
    // console.log(this.props)
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
            <div className="indiv-checkbox">
              <div className="checkbox-appearance"
                style={{ backgroundColor: this.state.isPoints ? 'transparent' : '#57b9e4' }}
                onClick={(value) => {
                  this.setState({ isPoints: false })
                }}
              />
              <div className="checkbox-label">
                Percentage (20%)
              </div>
            </div>
            <div className="indiv-checkbox">
              <div className="checkbox-appearance"
                style={{ backgroundColor: !this.state.isPoints ? 'transparent' : '#57b9e4' }}
                onClick={(value) => {
                  this.setState({ isPoints: true })
                }}
              />
              <div className="checkbox-label">
                Points (100/500)
              </div>
            </div>
          </div>
        </div>
        <div className='point-value'>
          {this.state.isPoints
            ? <div className='point-container'>
              <div className='point-value-label'>
                Total Points Available
              </div>
              <InputField
                containerClassName='input-container'
                inputClassName='point-value-input'
                // error={formErrors.pointTotal}
                name="pointTotal"
                onChange={updateProperty}
                type="number"
                value={form.pointTotal}
                min={0}
              />
            </div> : null}
        </div>
        <div className='button-container'>
          <button
            className='margin-top margin-bottom button full-width'
            onClick={() => this.props.onSubmit(this.state.isPoints, this.state.form.pointTotal)}
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
  onSubmit: PropTypes.func,
  formErrors: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  updateProperty: PropTypes.func,
  validateForm: PropTypes.func,
  reset: PropTypes.func
}

export default WeightType
