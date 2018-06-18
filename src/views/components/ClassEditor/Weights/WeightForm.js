import React from 'react'
import PropTypes from 'prop-types'
import {Form, ValidateForm} from 'react-form-library'
import {InputField, CheckboxField} from '../../../../components/Form'
import Loading from '../../../../components/Loading'
import actions from '../../../../actions'

const requiredFields = {
  'name': {
    type: 'required'
  },
  'weight': {
    type: 'required'
  }
}

class WeightForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.initializeState()
  }

  /*
  * If new weight is received, update form.
  */
  componentWillReceiveProps (nextProps) {
    if (nextProps.weight && this.state.form.id !== nextProps.weight.id) {
      this.setState({form: this.initializeFormData(nextProps.weight)})
    } else {
      this.setState({form: this.initializeFormData()})
    }
  }

  /*
  * Method for intializing the state.
  *
  * @return [Object]. State object.
  */
  initializeState () {
    const {weight} = this.props
    return {
      form: this.initializeFormData(weight),
      loading: false
    }
  }

  /*
  * Method for intializing form data.
  * Weight form data.
  *
  * @param [Object] data. initial data
  * @return [Object]. Form object.
  */
  initializeFormData (data) {
    let formData = data || {}
    const {id, name, weight} = formData

    return ({
      id: id || null,
      name: name || '',
      weight: weight || ''
    })
  }

  /*
  * Determine whether the user is submiting updated weight or a new weight.
  *
  */
  onSubmit () {
    const {form} = this.state
    const {weight} = this.props

    if (this.props.validateForm(form, requiredFields)) {
      form.id && (weight && (form.name === weight.name || form.weight === weight.weight))
        ? this.onUpdateWeight()
        : this.onCreateWeight()
    }
  }

  /*
  * Create a new weight
  */
  onCreateWeight () {
    this.setState({loading: true})
    actions.weights.createWeight(this.props.cl, this.state.form).then((weight) => {
      this.setState({form: this.initializeFormData(), loading: false})
      this.props.onCreateWeight(weight)
    }).catch(() => { this.setState({loading: false}) })
  }

  /*
  * Update an existing weight
  */
  onUpdateWeight () {
    this.setState({loading: true})
    actions.weights.updateWeight(this.props.cl, this.state.form).then((weight) => {
      this.setState({form: this.initializeFormData(), loading: false})
      this.props.onUpdateWeight(weight)
    }).catch(() => { this.setState({loading: false}) })
  }

  render () {
    const {form} = this.state
    const {formErrors, updateProperty, numWeights, noWeights} = this.props

    return (
      <div id='cn-weight-form'>
        <div className='cn-section-content-header'>
          Step 1: Add Weights
        </div>
        <div id='cn-weight-form-instructions'>
          Weights are how much a certain group of assignments contribute to your final grade.
           For example: <i className='cn-blue'>Exams are worth 25% of your final grade</i>
        </div>
        <InputField
          containerClassName='margin-top'
          error={formErrors.name}
          label="Weight name"
          name="name"
          onChange={updateProperty}
          placeholder="e.g. Exams"
          value={form.name}
        />
        <InputField
          containerClassName='margin-top hide-spinner'
          error={formErrors.weight}
          label="Value"
          name="weight"
          onChange={updateProperty}
          placeholder="e.g. 25"
          type="number"
          value={form.weight}
        />
        {numWeights === 0 &&
          <CheckboxField
            name='noWeights'
            onChange={(name, value) => {
              this.props.onNoWeightChecked(value)
            }}
            value={noWeights}
            containerClassName='margin-top'
            inputClassName='margin-right'
            label={'Weights were not provided on the syllabus.'}
          />
        }
        {!noWeights && <button
          className='button full-width margin-top margin-bottom'
          disabled={this.state.loading}
          onClick={this.onSubmit.bind(this)}
        >
          Add weight
          {this.state.loading ? <Loading /> : null}
        </button>}
        <div className='margin-bottom'>
          <a onClick={() => this.props.reset()}>Go back</a>
        </div>
      </div>
    )
  }
}

WeightForm.propTypes = {
  cl: PropTypes.object,
  formErrors: PropTypes.object,
  onCreateWeight: PropTypes.func.isRequired,
  onUpdateWeight: PropTypes.func.isRequired,
  updateProperty: PropTypes.func,
  weight: PropTypes.object,
  validateForm: PropTypes.func,
  noWeights: PropTypes.bool,
  numWeights: PropTypes.number,
  onNoWeightChecked: PropTypes.func,
  reset: PropTypes.func
}

export default ValidateForm(Form(WeightForm, 'form'))
