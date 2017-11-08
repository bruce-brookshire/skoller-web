import React from 'react'
import {Form, ValidateForm} from 'react-form-library'
import {InputField} from '../../../components/Form'
import Grid from '../../../components/Grid/index'
import WeightFields from './WeightFields'

const headers = [
  {
    field: 'delete',
    display: ''
  },
  {
    field: 'name',
    display: ''
  },
  {
    field: 'weight',
    display: ''
  },
  {
    field: 'edit',
    display: ''
  }
]

const weights = [
  {
    id: 1,
    name: 'Star Reviews',
    weight: 10
  },
  {
    id: 2,
    name: 'Exams',
    weight: 20
  },
  {
    id: 3,
    name: 'Mid Term',
    weight: 20
  }
]

class Weights extends React.Component {
  constructor (props) {
    super(props)
    // this.syllabusFormId = syllabusFormStore.syllabusForm.objectId
    this.state = this.initializeState()
  }

  // componentWillMount () {
  //   weightStore.loading = true
  //   this.connectToNameSpaceSocket()
  // }
  //
  // componentWillUnmount () {
  //   this.disconnetFromNameSpaceSocket()
  // }
  //
  // /*
  // * Connect to weights namespace. Provide syllabus form id so socket can join
  // * room, whose namespace is the form id. Set event listners.
  // */
  // connectToNameSpaceSocket () {
  //   this.socket = io.connect('/weights', {query: `syllabus_form_id=${this.syllabusFormId}`})
  //   this.socket.on('connected', this.handleSocketConnection.bind(this))
  // }
  //
  // /*
  // * If client socket was able to sucessfully join room, i.e. no one is working on
  // * that specific portion of the syllabus form, then retrieve weights from db to
  // * edit weights. Else, automatically go to the next syllabus.
  // */
  // handleSocketConnection (data) {
  //   data.error ? getNextSyllabus('weight') : getWeights()
  // }
  //
  // /*
  // * On component unmount, leave the room so that others may join.
  // */
  // disconnetFromNameSpaceSocket () {
  //   this.socket.emit('leave room', {syllabus_form_id: this.syllabusFormId})
  // }

  /*
  * Method for intializing the state.
  *
  * @return [Object]. State object.
  */
  initializeState () {
    return {
      form: this.initializeFormData()
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
  * Row data to be passed to the grid
  *
  * @return [Array]. Array of formatted row data.
  */
  getRows () {
    return weights.map((item, index) =>
      this.mapRow(item, index)
    )
  }

  /*
  * Formats row data to be passed to the grid for display
  *
  * @param [Object] item. Row data to be formatted.
  * @param [Number] index. Index of row data.
  * @return [Object] row. Object of formatted row data for display in grid.
  */
  mapRow (item, index) {
    const {id, name, weight} = item

    const row = {
      id: id || '',
      remove: <div className='center-content' onClick={() => { this.removeWeight(item) }}><i className='fa fa-times' /></div>,
      name,
      weight: Number(weight).toFixed(2),
      edit: <i className='fa fa-pencil' style={{color: '#167AFF'}} onClick={() => { this.setWeight(item) }}/>
    }

    return row
  }

  /*
  * render submit buttons.
  *
  * @return [Component] SubmitButtons. Interface to submit weight data for class.
  */
  renderSubmitButtons () {
    // return (
    //   <SubmitButtons
    //     label='Weight'
    //     onSubmit={this.handleSubmit.bind(this)}
    //     disableSubmit={weightStore.hasNoWeights && weightStore.weights.length > 0}
    //     disableNext={this.props.disableNext || (weightStore.hasNoWeights && weightStore.weights.length > 0)}
    //   />
    // )
  }

  /*
  * Render total percentage
  *
  * @return [Component]. Table row conisiting of running total of .
  */
  renderTotalPercentage () {
    return (
      <table className='cn-table-grid' style={{borderTop: '1px solid black', paddingTop: '10px'}}>
        <tbody>
          <tr>
            <td> Total: </td>
            <td> {`${this.getTotalWeight().toFixed(2)}%`} </td>
            <td></td>
            <td style={{width: '50px', paddingRight: '10px'}}><i className='fa fa-info' /></td>
          </tr>
        </tbody>
      </table>
    )
  }

  /*
  * Get the total weight value.
  *
  * @return [Number] totalWeight. The accumlated percentages.
  */
  getTotalWeight () {
    let totalWeight = 0
    weights.forEach(item => {
      totalWeight += Number(item.weight)
    })
    return totalWeight
  }

  /*
  * Get whether the total weight is completed.
  *
  * @param [String] weight. Optional param to check weight
  * @return [Boolean]. Truth value if the total weight percentage is within range.
  */
  isTotalWeightSecure (weight) {
    const totalWeight = weight || this.getTotalWeight()
    return (totalWeight <= 101 && totalWeight >= 99)
  }

  /*
  * Toggle the has no weights value. Only allow toggle if no weights have been entered.
  *
  * @param [Event] event. Onclick event.
  */
  toggleHasNoWeights (event) {
    // if (weightStore.weights.length === 0) {
    //   weightStore.hasNoWeights = !weightStore.hasNoWeights
    // } else {
    //   event.preventDefault()
    // }
  }

  /*
  * Set form value equal to weight in order to be edited.
  *
  * @param [Object] weight. Weight object to be edited.
  */
  setWeight (weight) {
    this.setState({form: this.initializeFormData(weight)})
  }

  /*
  * Determine whether the user is submiting now weights or a new weight.
  *
  * @param [Boolean] nextSyllabus. Determine if the user wants to go to the
  * next Syllabus or continue working the same one.
  */
  handleSubmit (nextSyllabus) {
    // weightStore.hasNoWeights ? this.submitNoWeights(nextSyllabus) : this.submitWeight(nextSyllabus)
  }

  /*
  * Submit new weight. Ensure to send boolean of whether the total weights are 100%.
  * This way, can autoset completion for weights dependent on weights value.
  *
  * @param [Boolean] nextSyllabus. Determine if the user wants to go to the
  * next Syllabus or continue working the same one.
  */
  submitWeight (nextSyllabus) {
    // const method = (this.state.form.id || this.state.form.objectId) ? 'PUT' : 'POST'
    // const weight = this.state.form
    // weight.weight = this.convertWeight(weight.weight)
    //
    // let totalWeight = this.getTotalWeight() + weight.weight
    // if (method === 'PUT') {
    //   totalWeight -= weightStore.weights.filter(w => w.objectId === (weight.id || weight.objectId))[0].weight
    // }
    //
    // submitWeight(method, weight, this.isTotalWeightSecure(totalWeight), nextSyllabus)
    // this.setState(this.initializeState())
  }

  /*
  * Convert weight. Ensure it is a number. Calculate percentage if needed.
  *
  * @param [String] weight. Weight.
  * @return [Number] num. The weight converted to a number.
  */
  convertWeight (weight) {
    weight = weight.replace('%', '')
    const numArray = weight.split('/')
    let num
    if (numArray.length > 2) {
      num = 0
    } else if (numArray.length === 2) {
      num = Number(numArray[0]) / Number(numArray[1]) * 100
    } else {
      num = Number(numArray[0])
    }
    return num
  }

  /*
  * Submit if the user enters no weights
  *
  * @param [Boolean] nextSyllabus. Determine if the user wants to go to the
  * next Syllabus or continue working the same one.
  */
  submitNoWeights (nextSyllabus) {
    // submitFinish(nextSyllabus)
    this.setState(this.initializeState())
  }

  /*
  * Delete weight. Ensure to send boolean of whether the total weights are 100%.
  * This way, can autoset completion for weights dependent on weights value.
  *
  * @param [Object] weight. The weight to be deleted.
  */
  deleteWeight (weight) {
    // deleteWeight(weight.id, this.isTotalWeightSecure(this.getTotalWeight() - Number(weight.weight)))
  }

  render () {
    // if (weightStore.loading) {
    //   return <Loading />
    // }
    const {form} = this.state
    const {formErrors, updateProperty} = this.props

    return (
      <div>
        <div className='margin-top'>
          <Grid
            headers={headers}
            rows={this.getRows()}
            disabled={true}
            canDelete={false}
          />
          {this.renderTotalPercentage()}
        </div>

        <div className='margin-top'>
          <form>
            <div className='row'>
              <div className='col-xs-8'>
                <InputField
                  error={formErrors.profile && formErrors.profile.first_name}
                  label="Category name"
                  name="name"
                  onBlur={() => console.log('onBlur')}
                  onChange={updateProperty}
                  onFocus={() => console.log('onFocus')}
                  placeholder="Weight Category, i.e. Exams"
                  value={form.name}
                />
              </div>
              <div className='col-xs-4'>
                <InputField
                  error={formErrors.profile && formErrors.profile.first_name}
                  label="Weight"
                  name="weight"
                  onBlur={() => console.log('onBlur')}
                  onChange={updateProperty}
                  onFocus={() => console.log('onFocus')}
                  placeholder="Weight"
                  type="number"
                  value={form.weight}
                />
              </div>
            </div>
            <button className='button-full-width'>Add Category Weight</button>
          </form>
        </div>

        {this.renderSubmitButtons()}

      </div>
    )
  }
}

export default ValidateForm(Form(Weights, 'form'))
