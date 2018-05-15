import React from 'react'
import PropTypes from 'prop-types'
import {Form, ValidateForm} from 'react-form-library'
import {InputField} from '../../../../components/Form'
import Loading from '../../../../components/Loading'
import actions from '../../../../actions'

const gradeScales = [
  {
    id: 1,
    grade_scale: {'A': '90', 'B': '80', 'C': '70', 'D': '60'}
  },
  {
    id: 2,
    grade_scale: {'A': '93',
      'A-': '90',
      'B+': '87',
      'B': '83',
      'B-': '80',
      'C+': '77',
      'C': '73',
      'C-': '70',
      'D': '60'}
  },
  {
    id: 3,
    grade_scale: {'A': '93',
      'A-': '90',
      'B+': '87',
      'B': '83',
      'B-': '80',
      'C+': '77',
      'C': '73',
      'C-': '70',
      'D+': '67',
      'D': '63',
      'D-': '60'}
  }
]

const moreGradeScales = [
  {
    id: 4,
    grade_scale: {'A': '92.5',
      'A-': '89.5',
      'B+': '86.5',
      'B': '82.5',
      'B-': '79.5',
      'C+': '76.5',
      'C': '72.5',
      'C-': '69.5',
      'D+': '66.5',
      'D': '62.5',
      'D-': '59.5'}
  },
  {
    id: 5,
    grade_scale: {'Pass': '50'}
  },
  {
    id: 6,
    grade_scale: {'A': '92',
      'A-': '90',
      'B+': '88',
      'B': '82',
      'B-': '80',
      'C+': '78',
      'C': '72',
      'C-': '70',
      'D+': '68',
      'D': '62',
      'D-': '60'}
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
      form: {
        grade: '',
        min: ''
      },
      loading: false,
      currentGradeScale: this.props.cl.grade_scale_map || ''
    }
  }

  onDeleteGS (key) {
    this.setState({loading: true})
    let newGradeScale = this.state.currentGradeScale
    delete newGradeScale[key]
    this.setState({currentGradeScale: newGradeScale})
    actions.gradescales.updateGradeScale(this.props.cl, {grade_scale: newGradeScale}).then((cl) => {
      if (this.props.onSubmit) this.props.onSubmit(cl)
      this.setState({loading: false})
    }).catch(() => { this.setState({loading: false}) })
  }

  renderGradeScale (gradeScale) {
    return <ul className="grade-scale-list">
      {Object.keys(gradeScale).sort((a, b) => {
        return parseFloat(gradeScale[a]) < parseFloat(gradeScale[b]) ? 1 : -1
      }).map((key, idx) =>
        <li key={idx} className="grade-row">
          <div className="grade-key">{key}</div><div className="grade-min">{gradeScale[key]}</div>
        </li>
      )}
      <li className="adopt-button">
        <button
          className='button full-width margin-top'
          disabled={this.state.loading}
          onClick={() => { this.setGradeScale(gradeScale) }}
        >
          Adopt
          {this.state.loading ? <Loading style={{color: 'white', marginLeft: '0.5em'}} /> : null}
        </button>
      </li>
    </ul>
  }

  /*
  * Render the current gradeScale
  *
  * @return [Component] div. Current grade scale.
  */
  renderCurrentGradeScale () {
    const gradeScale = this.props.cl.grade_scale
    const {edit} = this.props

    return (
      <div>
        <div className='grade-scale-title'>Current Grade Scale</div>
        <div className="current-grade-scale">
          <ul className="grade-scale-list">
            {Object.keys(gradeScale).sort((a, b) => {
              return parseFloat(gradeScale[a]) < parseFloat(gradeScale[b]) ? 1 : -1
            }).map((key, idx) =>
              <li key={idx} className="grade-row">
                {edit && <div className="delete-x">
                  <div
                    className='button-delete-x'
                    onClick={(event) => {
                      event.stopPropagation()
                      this.onDeleteGS(key)
                    }}><i className='fa fa-times' />
                  </div>
                </div>}
                <div className="grade">
                  <div className="grade-key">{key}</div>
                  <div className="grade-min">{gradeScale[key]}</div>
                </div>
              </li>
            )}
          </ul>
        </div>
        {edit && this.renderForm()}
        <button
          className='button full-width margin-top'
          disabled={this.state.loading}
          onClick={edit ? this.onSubmit.bind() : this.props.onSubmit.bind(this)}
        >
          {edit ? 'Submit' : 'Edit Scale'}
          {this.state.loading ? <Loading style={{color: 'white', marginLeft: '0.5em'}} /> : null}
        </button>
      </div>
    )
  }

  renderOtherGradeScales () {
    const gradeScalesText = this.state.showAllGradeScales ? 'Show Less Grade Scales' : 'Show More Grade Scales'
    return (
      <div className="other-common-scales-container">
        Other common scales
        <div className="other-common-scales">
          {this.state.gradeScales.map((item, index) =>
            this.renderGradeScale(item.grade_scale)
          )}
        </div>
        <a style={{display: 'block', cursor: 'pointer'}} className='margin-top' onClick={() => this.toggleGradeScales()}> {gradeScalesText} </a>
      </div>
    )
  }

  renderForm () {
    const {form} = this.state
    const {formErrors, updateProperty} = this.props
    return (
      <div className="grade-scale-form">
        <div className="grade-scale-form-inputs">
          <InputField
            containerClassName='margin-top'
            error={formErrors.grade}
            label='Grade'
            name='grade'
            onChange={updateProperty}
            value={form.grade}
          />

          <InputField
            containerClassName='margin-top'
            error={formErrors.grade}
            label='Min'
            name='min'
            onChange={updateProperty}
            value={form.min}
          />
        </div>
      </div>
    )
  }

  /*
  * Set form value equal to gradeScale in order to be updated.
  *
  * @param [Object] gradeScale. gradeScale object to be edited.
  */
  setGradeScale (gradeScale) {
    this.setState({loading: true})
    this.setState({currentGradeScale: gradeScale || ''})
    actions.gradescales.updateGradeScale(this.props.cl, {grade_scale: gradeScale}).then((cl) => {
      if (this.props.onSubmit) this.props.onSubmit(cl)
      this.setState({loading: false})
    }).catch(() => { this.setState({loading: false}) })
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
    let newGradeScale = this.state.currentGradeScale
    newGradeScale[this.state.form.grade] = this.state.form.min
    this.setState({currentGradeScale: newGradeScale})
    actions.gradescales.updateGradeScale(this.props.cl, {grade_scale: newGradeScale}).then((cl) => {
      if (this.props.onSubmit) this.props.onSubmit(cl)
      this.setState({loading: false})
    }).catch(() => { this.setState({loading: false}) })
  }

  render () {
    const {edit} = this.props

    return (
      <div id='class-editor-grade-scale'>
        <div id='class-editor-grade-scale-content'>
          {this.renderCurrentGradeScale()}
          {edit && this.renderOtherGradeScales()}
        </div>
      </div>
    )
  }
}

GradeScale.propTypes = {
  cl: PropTypes.object,
  formErrors: PropTypes.object,
  onSubmit: PropTypes.func,
  updateProperty: PropTypes.func,
  edit: PropTypes.bool
}

export default ValidateForm(Form(GradeScale, 'form'))
