import React from 'react'
import PropTypes from 'prop-types'
import Modal from '../../../../components/Modal'
import { Form, ValidateForm } from 'react-form-library'
import { InputField, SelectField } from '../../../../components/Form'

class CopyAssignmnetModal extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            form: {
                copies: '',
                dateoption: '',
                isIncrease: true
            },
            allDateOptions: [
                "Every 1 days",
                "Every 7 days"
            ]
        }
    }

    onConfirm() {

    }

    render() {
        console.log(this.props.assignment)
        const { form } = this.state
        const { formErrors, updateProperty } = this.props
        return (
            <Modal
                open={this.props.open}
                onClose={() => this.props.onClose()}
                title='Copy Assignment'
            >
                <div id='cn-copy-assignment-modal'>
                    <h3 className='center-text assignmentName'>Exam 1</h3>
                    <h3 className='center-text assignmentDate'>Tues, Feb 19th</h3>
                    <div className='copy-value'>
                        <div className='copies-container'>
                            <div className='copies-label'>
                                # of copies
                            </div>
                            <InputField
                                containerClassName='input-container'
                                inputClassName='copies-input'
                                name="copies"
                                onChange={updateProperty}
                                type="number"
                                value={form.copies}
                                min={0}
                            />
                        </div>
                    </div>
                    <div className='copy-value'>
                        <div className='copies-container'>
                            <div className='copies-label'>
                                Due dates repeat
                            </div>
                            <SelectField
                                containerClassName='select-container'
                                name="dateoption"
                                onChange={updateProperty}
                                options={this.state.allDateOptions.map(op => {
                                    return { value: op, name: op }
                                })}
                                value={form.dateoption}
                            />
                        </div>
                    </div>
                    <div className='copy-value'>
                        <div className='copies-container'>
                            <div className='copies-label'>
                                Names
                            </div>
                            <div className="selectBtn">
                                <button className={`${!this.state.isIncrease ? 'selected' : ''}`}
                                    onClick={() => {
                                        this.setState({ isIncrease: false })
                                    }}>Stay the same</button>
                                <button className={`${this.state.isIncrease ? 'selected' : ''}`}
                                    onClick={() => {
                                        this.setState({ isIncrease: true })
                                    }}>Increase by 1</button>
                            </div>
                        </div>
                    </div>
                    <div className='button-container center-text'>
                        <button
                            className={`margin-top margin-bottom button`}

                            onClick={
                                this.onConfirm.bind(this)
                                // this.props.onClose()
                            }
                        >
                            Generate Result
                        </button>
                    </div>
                </div>
            </Modal>
        )
    }
}

CopyAssignmnetModal.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    onConfirm: PropTypes.func,
    // onSubmit: PropTypes.func,
    formErrors: PropTypes.object,
    // onChange: PropTypes.func.isRequired,
    updateProperty: PropTypes.func,
    validateForm: PropTypes.func,
}

export default CopyAssignmnetModal
