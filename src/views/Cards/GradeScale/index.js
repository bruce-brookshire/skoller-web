import React from 'react'
import PropTypes from 'prop-types'
import {Form, ValidateForm} from 'react-form-library'
import {InputField} from '../../../components/Form'
import Loading from '../../../components/Loading'
import actions from '../../../actions'
import CommonScaleModal from './CommonScaleModal'
import Card from '../../../components/Card'
import ChangeRequest from '../../ClassAdmin/ClassWithChangeRequests/ChangeRequest'
import { changeRequestIsComplete } from '../../../utilities/changeRequests'
import { resolveChangeRequestMember } from '../../../actions/classhelp'

class GradeScale extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.initializeState()
    this.gradeRefs = {}
    this.initializeComponent()
  }

  async initializeComponent () {
    const cl = this.props.cl
    cl.change_requests.filter(cr => cr.change_type.id === 100).forEach(cr => {
      cr.members.forEach(member => {
        if (cl.grade_scale) {
          if (cl.grade_scale[member.member_name]) {
            if ((cl.grade_scale[member.member_name] === member.member_value) && !member.is_completed) {
              resolveChangeRequestMember(member.id)
              this.props.onChange()
            }
          }
        }
      })
    })
  }

  componentDidMount () {
    this.setState({
      mounted: true,
      changeRequests: this.checkForChangeRequests()
    })
  }

  checkForChangeRequests () {
    let i = 0
    if (this.props.cl.change_requests) {
      this.props.cl.change_requests.forEach(cr => {
        if (cr.change_type.id === 100 && changeRequestIsComplete(cr) === false) {
          i += 1
        }
      })
    }
    return i > 0
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
      currentGradeScale: this.props.cl.grade_scale || {},
      isEditable: false,
      gradeRefs: [],
      mounted: false
    }
  }

  initializeForm () {
    return {
      grade: null,
      min: null
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
    console.log(this.props.cl)
    if (this.props.cl.grade_scale) {
      let gradeScale = {}
      Object.keys(this.props.cl.grade_scale).forEach(grade => {
        gradeScale[grade] = {grade: this.props.cl.grade_scale[grade], known: true}
      })
      const {isEditable} = this.state
      let crs = this.props.cl.change_requests.filter(cr => cr.change_type.id === 100 && !changeRequestIsComplete(cr))
      crs.forEach(cr => {
        let knownGrade = null
        cr.members.forEach(member => {
          if (!member.is_completed) {
            knownGrade = {grade: gradeScale[member.member_name], known: true}
            if (knownGrade.grade === undefined) {
              gradeScale[member.member_name] = {grade: member.member_value, known: false}
            }
          }
        })
      })
      let gradeScaleArray = Object.keys(gradeScale).sort((a, b) => {
        return gradeScale[b].grade > gradeScale[a].grade ? 1 : -1
      })

      return (
        <ul className="grade-scale-list">
          {gradeScaleArray.map((key, idx) =>
            isEditable
              ? gradeScale[key].known &&
                <li key={idx} className={'grade-row'}>
                  {this.renderDeleteButton(key)}
                  <div className="grade" ref={ref => { this.gradeRefs[key] = ref }} style={{fontStyle: gradeScale[key].known ? '' : 'italic'}}>
                    <div className="grade-key">{key}</div>
                    <div className="grade-min">{gradeScale[key].grade} {gradeScale[key].known ? '' : ' (new)'}</div>
                  </div>
                </li>
              : <li key={idx} className={'grade-row'}>
                <div className="grade" ref={ref => { this.gradeRefs[key] = ref }} style={{fontStyle: gradeScale[key].known ? '' : 'italic'}}>
                  <div className="grade-key">{key}</div>
                  <div className="grade-min">{gradeScale[key].grade} {gradeScale[key].known ? '' : ' (new)'}</div>
                </div>
              </li>
          )}
        </ul>
      )
    } else if (this.props.cl.change_requests.filter(cr => cr.change_type.id === 100 && !changeRequestIsComplete(cr)).length > 0) {
      let gradeScale = {}
      let crs = this.props.cl.change_requests.filter(cr => cr.change_type.id === 100 && !changeRequestIsComplete(cr))
      crs.forEach(cr => {
        let knownGrade = null
        cr.members.forEach(member => {
          if (!member.is_completed) {
            knownGrade = {grade: gradeScale[member.member_name], known: true}
            if (knownGrade.grade === undefined) {
              gradeScale[member.member_name] = {grade: member.member_value, known: false}
            }
          }
        })
      })
      let gradeScaleArray = Object.keys(gradeScale).sort((a, b) => {
        return gradeScale[b].grade > gradeScale[a].grade ? 1 : -1
      })
      const {isEditable} = this.state

      return (
        <ul className="grade-scale-list">
          {gradeScaleArray.map((key, idx) =>
            isEditable
              ? gradeScale[key].known &&
                <li key={idx} className={'grade-row'}>
                  {this.renderDeleteButton(key)}
                  <div className="grade" ref={ref => { this.gradeRefs[key] = ref }} style={{fontStyle: gradeScale[key].known ? '' : 'italic'}}>
                    <div className="grade-key">{key}</div>
                    <div className="grade-min">{gradeScale[key].grade} {gradeScale[key].known ? '' : ' (new)'}</div>
                  </div>
                </li>
              : <li key={idx} className={'grade-row'}>
                <div className="grade" ref={ref => { this.gradeRefs[key] = ref }} style={{fontStyle: gradeScale[key].known ? '' : 'italic'}}>
                  <div className="grade-key">{key}</div>
                  <div className="grade-min">{gradeScale[key].grade} {gradeScale[key].known ? '' : ' (new)'}</div>
                </div>
              </li>
          )}
        </ul>
      )
    } else {
      return (
        <div className='margin-top'>There is no grade scale</div>
      )
    }
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
          onClick={() => { this.toggleCommonScaleModal() }}
        >Common scales</a>
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

  renderContent () {
    const {isEditable} = this.state
    return (
      <div id='class-editor-grade-scale-content'>
        {
          this.renderScale()
        }
        {isEditable && this.renderForm()}
        {isEditable && this.renderSubmitButton()}
        {isEditable && this.renderOptions()}
      </div>
    )
  }

  renderTitle () {
    const {canEdit, hasIssues} = this.props
    const {isEditable} = this.state
    return (
      <div className='cn-icon-flex'>
        Grade Scale
        {canEdit && <i className='fas fa-pencil-alt cn-blue cursor' onClick={() => this.setState({isEditable: !isEditable})} />}
        {hasIssues && <i className='fa fa-warning cn-red cursor margin-left' onClick={() => this.props.onSelectIssue()} />}
      </div>
    )
  }

  renderChangeRequests () {
    let gradeScaleCrs = []
    let crsToRender = []
    let allGradeScaleCrData = {}
    this.props.cl.change_requests.filter(cr => cr.change_type.id === 100 && changeRequestIsComplete(cr) === false).forEach(cr => {
      cr.members.forEach(member => {
        if (!member.is_completed) {
          if (Array.isArray(allGradeScaleCrData[member.member_name])) {
            allGradeScaleCrData[member.member_name].push({minimum: member.member_value, cr: cr, member: member})
          } else {
            allGradeScaleCrData[member.member_name] = [{minimum: member.member_value, cr: cr, member: member}]
          }
        }
      })
    })
    if (this.props.cl.change_requests) {
      this.props.cl.change_requests.forEach(cr => {
        if (cr.change_type.id === 100 && changeRequestIsComplete(cr) === false) {
          gradeScaleCrs.push(cr)
        }
      })
    }
    if (gradeScaleCrs.length > 0) {
      Object.keys(allGradeScaleCrData).forEach(letterGrade => {
        let ref = null
        Object.keys(this.gradeRefs).forEach(refKey => {
          if (this.gradeRefs[refKey].children[0].innerHTML === letterGrade) {
            ref = this.gradeRefs[refKey]
          }
        })
        let position = 0
        allGradeScaleCrData[letterGrade].sort((a, b) => a.minimum > b.minimum ? 1 : -1)
        allGradeScaleCrData[letterGrade].forEach(dataPoint => {
          position += 1
          crsToRender.push(
            <ChangeRequest
              cl={this.props.cl}
              cr={dataPoint.cr}
              member={dataPoint.member}
              gradeScaleCr={{grade: letterGrade, minimum: dataPoint.minimum}}
              yPosition={ref.getBoundingClientRect().y - (ref.getBoundingClientRect().height / 2)}
              width={this.cardRef.offsetWidth / 2}
              onChange={() => this.props.onChange()}
              offsetTop={ref.offsetTop}
              multipleCrs={{count: allGradeScaleCrData[letterGrade].length, position: position}}
            />
          )
        })
      })
      let i = 0
      crsToRender.sort((a, b) => a.props.member.member_value < b.props.member.member_value ? 1 : -1)
      return (
        crsToRender.map(cr => {
          i += 1
          return (
            <div key={i}>
              {cr}
            </div>
          )
        })
      )
    }
  }

  render () {
    return (
      <div id='class-editor-grade-scale' className={this.props.superBoxClassName}>
        <div className='class-editor-grade-scale-card' ref={cardRef => { this.cardRef = cardRef }}>
          <Card
            title={this.renderTitle()}
            content={this.renderContent()}
            boxClassName={this.props.boxClassName}
            contentClassName={this.props.contentClassName}
          />
        </div>
        {this.state.mounted && this.state.changeRequests && !this.state.isEditable &&
          <div className='class-editor-grade-scale-crs'>
            {this.renderChangeRequests()}
          </div>
        }
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
  canEdit: PropTypes.bool,
  hasIssues: PropTypes.bool,
  onSelectIssue: PropTypes.func,
  boxClassName: PropTypes.string,
  contentClassName: PropTypes.string,
  superBoxClassName: PropTypes.string,
  onChange: PropTypes.func
}

export default ValidateForm(Form(GradeScale, 'form'))
