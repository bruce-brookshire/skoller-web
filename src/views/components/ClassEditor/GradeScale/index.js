import React from 'react'
import PropTypes from 'prop-types'
import {Form, ValidateForm} from 'react-form-library'
import {InputField} from '../../../../components/Form'
import Grid from '../../../../components/Grid/index'
import Loading from '../../../../components/Loading'
import actions from '../../../../actions'

const headers = [
  {
    field: 'select',
    display: ''
  },
  {
    field: 'gradeScale',
    display: 'Grade Scales'
  }
]

const gradeScales = [
  {
    id: 1,
    grade_scale: 'A,90|B,80|C,70|D,60'
  },
  {
    id: 2,
    grade_scale: 'A,93|A-,90|B+,87|B,83|B-,80|C+,77|C,73|C-,70|D,60'
  },
  {
    id: 3,
    grade_scale: 'A,93|A-,90|B+,87|B,83|B-,80|C+,77|C,73|C-,70|D+,67|D,63|D-,60'
  }
]

const moreGradeScales = [
  {
    id: 4,
    grade_scale: 'A,92.5|A-,89.5|B+,86.5|B,82.5|B-,79.5|C+,76.5|C,72.5|C-,69.5|D+,66.5|D,62.5|D-,59.5'
  },
  {
    id: 5,
    grade_scale: 'Pass,50'
  },
  {
    id: 6,
    grade_scale: 'A,92|A-,90|B+,88|B,82|B-,80|C+,78|C,72|C-,70|D+,68|D,62|D-,60'
  }
]

class GradeScale extends React.Component {
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
      showAllGradeScales: false,
      gradeScales,
      form: this.initializeFormData(this.props.cl),
      loading: false
    }
  }

  /*
  * Method for intializing form data.
  * GradeScale form data.
  *
  * @param [Object] data. initial data
  * @return [Object]. Form object.
  */
  initializeFormData (data) {
    let formData = data || {}
    const {grade_scale} = formData

    return ({
      grade_scale: grade_scale || ''
    })
  }

  /*
  * Render the current gradeScale
  *
  * @return [Component] div. Current grade scale.
  */
  renderCurrentGradeScale () {
    // const {syllabusForm: {gradeScaleSubmitted, gradeScale}} = syllabusFormStore
    const currentGradeScale = this.props.cl.grade_scale || ''
    return <div className='margin-bottom'>{`Current Grade Scale: ${currentGradeScale}`}</div>
  }

  /*
  * Row data to be passed to the grid
  *
  * @return [Array]. Array of formatted row data.
  */
  getRows () {
    return this.state.gradeScales.map((item, index) =>
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
    const { id, grade_scale } = item

    const row = {
      id: id || '',
      select: <a onClick={() => { this.setGradeScale(item) }}><i className='fa fa-pencil'/></a>,
      gradeScale: <div>{grade_scale}</div>
    }

    return row
  }

  /*
  * Set form value equal to gradeScale in order to be updated.
  *
  * @param [Object] gradeScale. gradeScale object to be edited.
  */
  setGradeScale (gradeScale) {
    this.setState({form: this.initializeFormData(gradeScale)})
  }

  /*
  * Toggle the gradescales shown.
  *
  */
  toggleGradeScales () {
    const gs = this.state.showAllGradeScales ? gradeScales : gradeScales.concat(moreGradeScales) // note, show all will become opposite value
    this.setState({ showAllGradeScales: !this.state.showAllGradeScales, gradeScales: gs })
  }

  /*
  * Submit the grade scale
  */
  onSubmit () {
    this.setState({loading: true})
    actions.gradescales.updateGradeScale(this.props.cl, this.state.form).then((cl) => {
      if (this.props.onSubmit) this.props.onSubmit(cl)
      this.setState({loading: false})
    }).catch(() => { this.setState({loading: false}) })
  }

  render () {
    const {form} = this.state
    const {formErrors, updateProperty} = this.props
    const gradeScalesText = this.state.showAllGradeScales ? 'Show Less Grade Scales' : 'Show More Grade Scales'

    return (
      <div className='margin-top-2x margin-bottom-2x'>
        <h5 style={{marginTop: '0.25em', marginBottom: '0.5em'}}>Edit gradescale</h5>
        {this.renderCurrentGradeScale()}
        <div className='margin-top'>
          <div className='row'>
            <div className='col-xs-12'>
              <InputField
                containerClassName='margin-top'
                error={formErrors.grade_scale}
                label='Grade Scale'
                name='grade_scale'
                onChange={updateProperty}
                placeholder='Grade Scale, i.e. A,90|B,80|C,70|D,60'
                value={form.grade_scale}
              />
            </div>
            <div className='col-xs-12 margin-top margin-bottom'>
              <button
                className='button full-width'
                disabled={this.state.loading}
                onClick={this.onSubmit.bind(this)}
              >
                Submit gradescale
                {this.state.loading ? <Loading style={{color: 'white', marginLeft: '0.5em'}} /> : null}
              </button>
            </div>
          </div>
        </div>

        <div className='margin-top'>
          <Grid
            headers={headers}
            rows={this.getRows()}
            disabled={true}
          />
        </div>

        <a style={{display: 'block', cursor: 'pointer'}} className='margin-top' onClick={() => this.toggleGradeScales()}> {gradeScalesText} </a>
      </div>
    )
  }
}

GradeScale.propTypes = {
  cl: PropTypes.object,
  formErrors: PropTypes.object,
  onSubmit: PropTypes.func,
  updateProperty: PropTypes.func
}

export default ValidateForm(Form(GradeScale, 'form'))
