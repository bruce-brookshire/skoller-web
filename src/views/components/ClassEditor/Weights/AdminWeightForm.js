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

class AdminWeightForm extends React.Component {
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
      isPoints: this.props.boolPoints,
      loading: false,
      totalPointsFormValue: null,
      editPoints: false
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
      weight: weight || '',
      created_on: 'Web'
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

  changePoints () {
    this.setState({editPoints: false})
    this.props.onTypeSelection(true, this.state.totalPointsFormValue)
  }

  renderPointsOptions () {
    return (
      <div className='hub-weight-form-points'>
        {this.props.totalPoints && !this.state.editPoints
          ? <div className='hub-weight-form-points-form'>
            <div className='hub-weight-form-points-label'>
              Total available points:
            </div>
            <div className='hub-weight-form-points-field'>
              <div className='hub-weight-form-points-display'>{this.props.totalPoints}</div>
              <button onClick={() => this.setState({editPoints: true})}>
                Edit
              </button>
            </div>
          </div>
          : <div className='hub-weight-form-points-form'>
            <div className='hub-weight-form-points-label'>Total available points:</div>
            <div className='hub-weight-form-points-field'>
              <input onChange={(e) => this.setState({totalPointsFormValue: e.target.value})} />
              <button onClick={() => this.changePoints()}>Save</button>
            </div>
          </div>
        }
      </div>
    )
  }

  render () { // issue: renders before onUpdateClass finishes --solved
    const {form} = this.state
    const {formErrors, updateProperty, numWeights, noWeights} = this.props
    // console.log(this.props)
    // console.log(updateProperty)
    // console.log('WeightForm: ', this.props.boolPoints)

    return (
      <div id='hub-weight-form'>
        <h4>Add a weight</h4>
        {/* <div className="weight-type">
          <div className='selector percentage'
            style={{
              backgroundColor: this.props.boolPoints ? 'transparent' : '#57b9e4',
              color: this.props.boolPoints ? '#57b9e4' : '#ffffff'
            }}
            onClick={() => {
              this.props.onClick(false)
            }}>
            Percentage
          </div>
          <div className='selector points'
            style={{
              backgroundColor: this.props.boolPoints ? '#57b9e4' : 'transparent',
              color: this.props.boolPoints ? '#ffffff' : '#57b9e4'
            }}
            onClick={() => {
              this.props.onClick(true)
            }}>
            Points
          </div>
        </div> */}
        {this.props.boolPoints &&
          this.renderPointsOptions()
        }
        <hr />
        <InputField
          containerClassName='margin-top'
          inputClassName='input-box'
          error={formErrors.name}
          label="Weight name"
          name="name"
          onChange={updateProperty}
          placeholder="Exams"
          value={form.name}
        />
        <div id='hub-weight-form-value'>
          <InputField
            containerClassName='margin-top hide-spinner'
            inputClassName='input-box'
            error={formErrors.weight}
            label="Value"
            name="weight"
            onChange={updateProperty}
            placeholder="25"
            type="number"
            value={form.weight}
          />
          <div className='pct'>
            {!this.props.boolPoints ? '%' : 'pts'}
          </div>
        </div>
        {numWeights === 0 &&
          <CheckboxField
            name='noWeights'
            onChange={(name, value) => {
              this.props.onNoWeightChecked(value)
            }}
            value={noWeights}
            containerClassName='margin-top no-weights'
            inputClassName='margin-right'
            label={'Weights were not provided on the syllabus.'}
          />
        }
        {<button
          className={'button margin-top ' + (this.state.loading || noWeights ? 'disabled' : '')}
          disabled={this.state.loading || noWeights}
          onClick={this.onSubmit.bind(this)}
        >
          Add Weight
          {this.state.loading ? <Loading /> : null}
        </button>}
      </div>
    )
  }
}

AdminWeightForm.propTypes = {
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
  reset: PropTypes.func,
  boolPoints: PropTypes.bool,
  onClick: PropTypes.func,
  togglePoints: PropTypes.func,
  totalPoints: PropTypes.number
}

export default ValidateForm(Form(AdminWeightForm, 'form'))
