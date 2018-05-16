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
      form: this.initializeForm(),
      loading: false,
      currentGradeScale: this.props.cl.grade_scale || '',
      isEditable: false
    }
  }

  initializeForm () {
    return {
      grade: '',
      min: ''
    }
  }

  updateClass (newGradeScale) {
    this.setState({loading: true})
    this.setState({currentGradeScale: newGradeScale})
    actions.gradescales.updateGradeScale(this.props.cl, {grade_scale: newGradeScale}).then((cl) => {
      if (this.props.onSubmit) this.props.onSubmit(cl)
      this.setState({loading: false})
    }).catch(() => { this.setState({loading: false}) })
  }

  onDeleteGS (key) {
    let newGradeScale = this.state.currentGradeScale
    delete newGradeScale[key]
    this.updateClass(newGradeScale)
  }

  renderDeleteButton (key) {
    return (
      <div className="delete-x">
        <div
          className='button-delete-x'
          onClick={(event) => {
            event.stopPropagation()
            this.onDeleteGS(key)
          }}><i className='fa fa-times' />
        </div>
      </div>
    )
  }

  renderScale () {
    const gradeScale = this.props.cl.grade_scale
    const {isEditable} = this.state

    return (
      <ul className="grade-scale-list">
        {Object.keys(gradeScale).sort((a, b) => {
          return parseFloat(gradeScale[a]) < parseFloat(gradeScale[b]) ? 1 : -1
        }).map((key, idx) =>
          <li key={idx} className="grade-row">
            {isEditable && this.renderDeleteButton(key)}
            <div className="grade">
              <div className="grade-key">{key}</div>
              <div className="grade-min">{gradeScale[key]}</div>
            </div>
          </li>
        )}
      </ul>
    )
  }

  renderEditToggle () {
    return (
      <button
        className='button full-width margin-top'
        onClick={() => this.setState({isEditable: true})}
      >
        Edit Scale
      </button>
    )
  }

  renderSubmitButton () {
    const {loading} = this.state
    return (
      <button
        className='button full-width margin-top margin-bottom'
        disabled={loading}
        onClick={this.onSubmit.bind(this)}
      >
        Submit
        {loading ? <Loading style={{color: 'white', marginLeft: '0.5em'}} /> : null}
      </button>
    )
  }

  renderOptions () {
    return (
      <div className='cn-grade-scale-options'>
        <a
          onClick={() => this.setState({isEditable: false})}
        >&lt; Back</a>
        <a
          onClick={() => { this.toggleCommonScaleModal() }}
        >Common scales</a>
      </div>
    )
  }

  /*
  * Render the current gradeScale
  *
  * @return [Component] div. Current grade scale.
  */
  renderCurrentGradeScale () {
    const {isEditable} = this.state
    const {canEdit} = this.props

    return (
      <div>
        <div className='grade-scale-title'>Current Grade Scale</div>
        {this.renderScale()}
        {isEditable && this.renderForm()}
        {canEdit && !isEditable && this.renderEditToggle()}
        {isEditable && this.renderSubmitButton()}
        {isEditable && this.renderOptions()}
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
  * Submit the grade scale
  */
  onSubmit () {
    let newGradeScale = this.state.currentGradeScale
    newGradeScale[this.state.form.grade] = this.state.form.min
    this.updateClass(newGradeScale)
    this.setState({form: this.initializeForm()})
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
          this.updateClass(scale || '')
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
