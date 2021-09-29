import React from 'react'
import PropTypes from 'prop-types'
import Modal from '../../../../components/Modal'
import { Form, ValidateForm } from 'react-form-library'
import { InputField } from '../../../../components/Form'

const pointField = {
    pointTotal: {
        validate: (value) => { return value && value > 0 }
    }
}

class WeightGradeModal extends React.Component {
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

    render() {
        const { form } = this.state
        const { formErrors, updateProperty } = this.props
        return (
            <Modal
                open={this.props.open}
                onClose={() => this.props.onClose()}
                title='Edit Grading Style'
            >
                <div id='cn-weight-grading-modal'>

                    <div className="row cn-weight-type">
                        <div className="confirmdiv">
                            <h2>Is this class is graded off of points or percentages?</h2>
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
                                className={`margin-top margin-bottom button ${this.state.isPoints && !form.pointTotal ? 'disabled' : ''}`}
                                disabled={this.state.isPoints && !form.pointTotal}
                                onClick={
                                    this.onSubmit.bind(this)
                                    // this.props.onClose()
                                }
                            >
                                Save
                            </button>
                        </div>

                    </div>

                </div>
            </Modal >
        )
    }

}

WeightGradeModal.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    onConfirm: PropTypes.func,
    isPoints: PropTypes.bool,
    pointTotal: PropTypes.number,
    onSubmit: PropTypes.func,
    formErrors: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    updateProperty: PropTypes.func,
    validateForm: PropTypes.func,
    reset: PropTypes.func
}

export default ValidateForm(Form(WeightGradeModal, 'form'))
