import React from 'react'
import PropTypes from 'prop-types'
import {Form, ValidateForm} from 'react-form-library'
import {InputField} from '../../../../components/Form'
import Grid from '../../../../components/Grid/index'

const headers = [
  {
    field: 'delete',
    display: ''
  },
  {
    field: 'name',
    display: 'Category'
  },
  {
    field: 'weight',
    display: <div>{'Weight'}</div>
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
    this.state = this.initializeState()
  }

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
      delete: <div className='button-delete-x center-content' onClick={() => { this.removeWeight(item) }}><i className='fa fa-times' /></div>,
      name,
      weight: <div>{Number(weight).toFixed(2)}</div>,
      edit: <a onClick={() => { this.setWeight(item) }}><i className='fa fa-pencil'/></a>,
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
            <td></td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}></td>
            <td style={tdStyle}>Total: </td>
            <td style={tdStyle}>{`${this.getTotalWeight().toFixed(2)}%`}</td>
            <td style={tdStyle}></td>
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
  * Set form value equal to assignment in order to be edited.
  *
  * @param [Object] weight. Weight object to be edited.
  */
  setWeight (weight) {
    this.setState({form: this.initializeFormData(weight)})
  }

  /*
  * Delete weight.
  *
  * @param [Object] assignment. The weight to be deleted.
  */
  onDeleteWeight (weight) {

  }

  /*
  * Determine whether the user is submiting updated weight or a new weight.
  *
  */
  onSubmit () {

  }

  render () {
    // if (weightStore.loading) {
    //   return <Loading />
    // }
    const {form} = this.state
    const {formErrors, updateProperty} = this.props

    return (
      <div className='space-between-vertical'>
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
                  containerClassName='margin-top'
                  error={formErrors.name}
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
                  containerClassName='margin-top'
                  error={formErrors.weight}
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
            <button className='button full-width margin-top margin-bottom' onClick={this.onSubmit.bind(this)}>Submit category weight</button>
          </form>
        </div>
      </div>
    )
  }
}

Weights.propTypes = {
  formErrors: PropTypes.object,
  updateProperty: PropTypes.func
}

export default ValidateForm(Form(Weights, 'form'))
