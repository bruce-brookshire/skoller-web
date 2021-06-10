import React from 'react'
import PropTypes from 'prop-types'
import { Form, ValidateForm } from 'react-form-library'
import { InputField } from '../../../../components/Form'
import { ProgressBar, Step } from "react-step-progress-bar";

const pointField = {
  pointTotal: {
    validate: (value) => { return value && value > 0 }
  }
}

class WeightType extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isPoints: this.props.isPoints,
      form: {
        pointTotal: this.props.pointTotal
      }
    }
  }

  onSubmit() {
    if (this.props.validateForm(this.state.form, pointField)) {
      this.props.onSubmit(this.state.isPoints, this.state.form.pointTotal)
    }
  }

  renderProgressBar() {
    if (!this.state.singleWeight) {
      return <div className='cn-section-progress-outer'>
        <img alt="Skoller" className='logo' src='/src/assets/images/sammi/Smile.png' height="40" />
        <span className="cn-section-progress-title">Add Weights & Values <i class="far fa-question-circle"></i></span>
        <div className="cn-pull-right">
          <span>1/3</span>
          <span className='cn-section-progressbar'><ProgressBar percent={(1 / 3) * 100} /></span>
        </div>
        {/* <ProgressBar currentStep={this.state.currentIndex} steps={this.steps}>
          {steps.map((step, index) => {
            return <SyllabusProgressStep key={`step-${index}`} label={step} index={index} />
          })}
        </ProgressBar> */}
      </div>
    } else {
      return null
    }
  }

  render() {
    const { form } = this.state
    const { formErrors, updateProperty } = this.props

    return (
      <div className='cn-weight-type'>
        {this.renderProgressBar()}
        {/* <div className='cn-section-content-header'>
          Step 1: Set Up Weights
        </div>
        <div id='cn-weight-form-instructions'>
          Weights are how much a certain group of assignments contribute to your final grade.
        </div> */}
        <hr />
        <div className='cn-section-content-subheader'>
          Is this class based on percentages or points?
        </div>
        <div className="checkbox-container">
          <div className="checkboxes">
            <div className="indiv-checkbox">
              <div className="checkbox-appearance"
                style={{ backgroundColor: this.state.isPoints ? 'transparent' : '#57b9e4' }}
                onClick={() => {
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
                onClick={() => {
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
                name="pointTotal"
                error={formErrors.pointTotal}
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
            onClick={this.onSubmit.bind(this)}
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

export default ValidateForm(Form(WeightType, 'form'))
