import React from 'react'
import PropTypes from 'prop-types'
import {Form, ValidateForm} from 'react-form-library'
import {InputField} from '../../../../components/Form'
import Grid from '../../../../components/Grid/index'
import PointTotal from './PointTotal'
import WeightConverter from '../../../../components/WeightConverter/index'
import actions from '../../../../actions'

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
  }
]

const requiredFields = {
  'name': {
    type: 'required'
  },
  'weight': {
    type: 'required'
  }
}

class Weights extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.initializeState()
  }

  /*
  * Fetch the weights for a given class
  */
  componentWillMount () {
    const {cl} = this.props
    actions.weights.getClassWeights(cl).then((weights) => {
      this.setState({weights})
    }).then(() => false)
  }

  /*
  * Method for intializing the state.
  *
  * @return [Object]. State object.
  */
  initializeState () {
    const {cl} = this.props
    return {
      form: this.initializeFormData(),
      isPoints: cl.is_points,
      totalPoints: null,
      weights: []
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
  * Render point total input if needed.
  * Otherwise render the table
  */
  renderContent () {
    const {cl} = this.props
    if (this.state.isPoints && !this.state.totalPoints) {
      return (
        <PointTotal
          cl={cl}
          onChange={this.onChangeTotalPoints.bind(this)}
          totalPoints={this.state.totalPoints}
        />
      )
    }

    return this.renderWeightsContent()
  }

  /*
  * If weights are in points, update the total points.
  */
  onChangeTotalPoints (totalPoints) {
    const {cl} = this.props
    this.setState({totalPoints})
    // may need to update class
    // this.props.onChange(cl)
  }

  /*
  * Render the weights and weight form.
  */
  renderWeightsContent () {
    const {form} = this.state
    const {formErrors, updateProperty} = this.props
    return (
      <div className='space-between-vertical'>
        <div>
          <div id='class-editor-weights-table' className='margin-top'>
            <Grid
              headers={headers}
              rows={this.getRows()}
              disabled={true}
              canDelete={false}
              canSelect={true}
              emptyMessage="There are currently no weights for this class."
              onSelect={this.setWeight.bind(this)}
            />
          </div>
          {this.renderTotalPercentage()}
        </div>
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
          <button className='button full-width margin-top margin-bottom' onClick={this.onSubmit.bind(this)}>Submit category weight</button>
        </div>
      </div>
    )
  }

  /*
  * Row data to be passed to the grid
  *
  * @return [Array]. Array of formatted row data.
  */
  getRows () {
    return this.state.weights.map((item, index) =>
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
      delete: <div className='button-delete-x center-content' onClick={(event) => { event.stopPropagation(); this.onDeleteWeight(item) }}><i className='fa fa-times' /></div>,
      name,
      weight: <div style={{textAlign: 'right'}}>{
        !this.state.isPoints
          ? `${Number(weight).toFixed(2)}%`
          : Number(weight)
      }</div>
    }

    return row
  }

  /*
  * Render total percentage
  *
  * @return [Component]. Table row conisiting of running total of .
  */
  renderTotalPercentage () {
    const tdStyle = {borderTop: '1px solid black', paddingTop: '10px'}
    return (
      <table className='cn-table-grid' style={{marginTop: '-14px'}}>
        <thead style={{opacity: 0}}>
          <tr>
            <td></td>
            <td>Categories</td>
            <td>Weight</td>
          </tr>
        </thead>
        <tbody id='class-editor-weights-total'>
          <tr>
            <td style={tdStyle}></td>
            <td style={{...tdStyle, textAlign: 'left'}}>{!this.state.isPoints ? 'Total:' : 'Total points'}</td>
            <td style={{...tdStyle, textAlign: 'right'}}>{
              !this.state.isPoints
                ? `${this.getTotalWeight().toFixed(2)}%`
                : `${this.getTotalWeight()}/${this.state.totalPoints}`
            }</td>
          </tr>
        </tbody>
      </table>
    )
  }

  /*
  * Render the slider
  */
  renderWeightSlider () {
    if (this.state.weights.length === 0) {
      return (
        <div className='full-width'>
          <WeightConverter id='class-editor-weight-converter' onChange={this.onToggleConverter.bind(this)} value={this.state.isPoints}/>
        </div>
      )
    }
  }

  /*
  * Get the total weight value.
  *
  * @return [Number] totalWeight. The accumlated percentages.
  */
  getTotalWeight () {
    let totalWeight = 0
    this.state.weights.forEach(item => {
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
  isTotalWeightSecure () {
    let totalWeight = this.getTotalWeight()
    if (this.state.isPoints) {
      if (!this.state.totalPoints) return false
      totalWeight = (totalWeight / this.state.totalPoints) * 100
    }
    return (totalWeight <= 101 && totalWeight >= 99)
  }

  /*
  * Set form value equal to weight in order to be edited.
  *
  * @param [Object] weight. Weight object to be edited.
  */
  setWeight (weight) {
    this.setState({form: this.initializeFormData(this.state.weights.find(w => w.id === weight.id))})
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
    actions.weights.createWeight(this.props.cl, this.state.form).then((weight) => {
      const newWeights = this.state.weights
      newWeights.push(weight)
      this.setState({weights: newWeights, form: this.initializeFormData()})
    }).catch(() => false)
  }

  /*
  * Update an existing weight
  */
  onUpdateWeight () {
    actions.weights.updateWeight(this.props.cl, this.state.form).then((weight) => {
      const newWeights = this.state.weights
      const index = this.state.weights.findIndex(w => w.id === weight.id)
      newWeights[index] = weight
      this.setState({weights: newWeights, form: this.initializeFormData()})
    }).catch(() => false)
  }

  /*
  * Delete weight.
  *
  * @param [Object] weight. The weight to be deleted.
  */
  onDeleteWeight (weight) {
    actions.weights.deleteWeight(weight).then(() => {
      const newWeights = this.state.weights.filter(w => w.id !== weight.id)
      this.setState({weights: newWeights, form: this.initializeFormData()})
    }).catch(() => false)
  }

  onToggleConverter () {
    const {cl} = this.props
    const isPoints = !this.state.isPoints
    actions.classes.updateClass({id: cl.id, is_points: isPoints}).then((cl) => {
      this.setState({isPoints})
    }).catch(() => false)
  }

  render () {
    // if (weightStore.loading) {
    //   return <Loading />
    // }
    let {disableNext} = this.props
    if (!this.isTotalWeightSecure() && !disableNext) {
      this.props.toggleDisabled(true)
    } else if (this.isTotalWeightSecure() && disableNext) {
      this.props.toggleDisabled(false)
    }

    return (
      <div className='space-between-vertical'>
        <h2>Weights for {this.props.cl.name}</h2>
        {this.renderContent()}
        {this.renderWeightSlider()}
      </div>
    )
  }
}

Weights.propTypes = {
  cl: PropTypes.object,
  formErrors: PropTypes.object,
  updateProperty: PropTypes.func,
  validateForm: PropTypes.func
}

export default ValidateForm(Form(Weights, 'form'))
