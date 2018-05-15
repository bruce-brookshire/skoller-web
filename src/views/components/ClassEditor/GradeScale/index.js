import React from 'react'
import PropTypes from 'prop-types'
import {Form, ValidateForm} from 'react-form-library'
import {InputField} from '../../../../components/Form'
import Loading from '../../../../components/Loading'
import actions from '../../../../actions'
import CommonScaleModal from './CommonScaleModal'

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
      showCommonGradeScales: false,
      form: {
        grade: '',
        min: ''
      },
      loading: false,
      currentGradeScale: this.props.cl.grade_scale_map || '',
      isEditable: false
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

  /*
  * Render the current gradeScale
  *
  * @return [Component] div. Current grade scale.
  */
  renderCurrentGradeScale () {
    const gradeScale = this.props.cl.grade_scale
    const {isEditable} = this.state
    const {canEdit} = this.props

    return (
      <div>
        <div className='grade-scale-title'>Current Grade Scale</div>
        <div className="current-grade-scale">
          <ul className="grade-scale-list">
            {Object.keys(gradeScale).sort((a, b) => {
              return parseFloat(gradeScale[a]) < parseFloat(gradeScale[b]) ? 1 : -1
            }).map((key, idx) =>
              <li key={idx} className="grade-row">
                {isEditable && <div className="delete-x">
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
        {isEditable && this.renderForm()}
        {canEdit && !isEditable && <button
          className='button full-width margin-top'
          onClick={() => this.setState({isEditable: true})}
        >
          Edit Scale
        </button>}
        {isEditable && <button
          className='button full-width margin-top'
          disabled={this.state.loading}
          onClick={this.onSubmit.bind(this)}
        >
          Submit
          {this.state.loading ? <Loading style={{color: 'white', marginLeft: '0.5em'}} /> : null}
        </button>}
        {isEditable && <a onClick={() => { this.toggleCommonScaleModal() }}>Show common scales</a>}
      </div>
    )
  }

  renderForm () {
    const {form} = this.state
    const {formErrors, updateProperty} = this.props
    return (
      <div id="grade-scale-form">
        <div className="grade-scale-input">
          <InputField
            error={formErrors.grade}
            label='Grade'
            name='grade'
            onChange={updateProperty}
            value={form.grade}
          />
        </div>
        <div className="grade-scale-input">
          <InputField
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

  /*
  * Toggle the issues resolved modal.
  */
  toggleCommonScaleModal () {
    this.setState({showCommonGradeScales: !this.state.showCommonGradeScales})
  }

  renderCommonScaleModal () {
    const gradeScale = this.props.cl.grade_scale
    return (
      <CommonScaleModal
        currentScale={gradeScale}
        open={this.state.showCommonGradeScales}
        onClose={this.toggleCommonScaleModal.bind(this)}
        onSubmit={(scale) => {
          this.setGradeScale(scale)
        }}
      />
    )
  }

  render () {
    return (
      <div id='class-editor-grade-scale'>
        <div id='class-editor-grade-scale-content'>
          {this.renderCurrentGradeScale()}
        </div>
        {this.renderCommonScaleModal()}
      </div>
    )
  }
}

GradeScale.propTypes = {
  cl: PropTypes.object,
  formErrors: PropTypes.object,
  onSubmit: PropTypes.func,
  updateProperty: PropTypes.func,
  canEdit: PropTypes.bool
}

export default ValidateForm(Form(GradeScale, 'form'))
