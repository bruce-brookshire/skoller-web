import React from 'react'
import PropTypes from 'prop-types'
import {Form, ValidateForm} from 'react-form-library'
import {InputField} from '../../../../components/Form'
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
    if (this.props.validateForm(this.state.form, requiredFields)) {
      !this.state.form.id ? this.onCreateWeight() : this.onUpdateWeight()
    }
  }

  /*
  * Create a new weight
  */
  onCreateWeight () {
    this.setState({loading: true})
    actions.weights.createWeight(this.props.cl, this.state.form).then((weight) => {
      this.props.onCreateWeight(weight)
      this.setState({form: this.initializeFormData(), loading: false})
    }).catch(() => { this.setState({loading: false}) })
  }

  /*
  * Update an existing weight
  */
  onUpdateWeight () {
    this.setState({loading: true})
    actions.weights.updateWeight(this.props.cl, this.state.form).then((weight) => {
      this.props.onUpdateWeight(weight)
      this.setState({form: this.initializeFormData(), loading: false})
    }).catch(() => { this.setState({loading: false}) })
  }

  render () {
    const {form} = this.state
    const {formErrors, updateProperty} = this.props

    return (
      <div id='class-editor-weight-form' className='margin-top'>
        <div className='row'>
          <div className='col-xs-8'>
            <InputField
              containerClassName='margin-top'
              error={formErrors.name}
              label="Category name"
              name="name"
              onChange={updateProperty}
              placeholder="Weight Category, i.e. Exams"
              value={form.name}
            />
          </div>
          <div className='col-xs-4'>
            <InputField
              containerClassName='margin-top'
              error={formErrors.weight}
              label="Weight"
              name="weight"
              onChange={updateProperty}
              placeholder="Weight"
              type="number"
              value={form.weight}
            />
          </div>
        </div>
        <button
          className='button full-width margin-top'
          disabled={this.state.loading}
          onClick={this.onSubmit.bind(this)}
        >
          Submit category weight
          {this.state.loading ? <Loading style={{color: 'white', marginLeft: '0.5em'}} /> : null}
        </button>
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
  validateForm: PropTypes.func
}

export default ValidateForm(Form(WeightForm, 'form'))
