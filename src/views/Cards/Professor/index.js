import React from 'react'
import PropTypes from 'prop-types'
import {Form, ValidateForm} from 'react-form-library'
import SearchProfessor from '../../components/SearchProfessor'
import actions from '../../../actions'
import ProfessorForm from '../../components/ProfessorForm'
import Card from '../../../components/Card'
import { changeRequestIsComplete } from '../../../utilities/changeRequests'
import { resolveChangeRequestMember } from '../../../actions/classhelp'
import ChangeRequest from '../../ClassAdmin/ClassWithChangeRequests/ChangeRequest'
import moment from 'moment'

class Professor extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.initializeState()
    this.professorRefs = {}
  }

  componentDidMount () {
    this.setState({mounted: true})
  }

  /*
  * Method for intializing the state.
  *
  * @return [Object]. State object.
  */
  initializeState () {
    let changeRequests = this.props.cl.change_requests.filter(cr => cr.change_type.id === 300).filter(cr => !changeRequestIsComplete(cr))
    changeRequests.forEach(cr => {
      cr.members.forEach(member => {
        console.log(member.member_name)
        if (member.member_name === 'id' && member.is_completed === false) {
          resolveChangeRequestMember(member.id)
        }
      })
    })
    return {
      isEditable: false,
      openModal: false,
      mounted: false,
      changeRequests: this.props.cl.change_requests.filter(cr => cr.change_type.id === 300).filter(cr => !changeRequestIsComplete(cr))
    }
  }

  /* Attach professor to the class.
  *
  * @param [Object] professor. Professor object.
  */
  onAttachProfessorToClass (professor) {
    actions.professors.attachProfessorToClass(this.props.cl, professor).then((cl) => {
      this.onSubmit(cl)
    }).catch(() => false)
  }

  onSubmit (cl) {
    this.setState({isEditable: false})
    if (this.props.onSubmit) this.props.onSubmit(cl)
  }

  onCreateProfessor (professor) {
    this.toggleProfessorModal()
  }

  /*
  * Remove professor from the class.
  */
  removeProfessorFromClass () {
    actions.professors.removeProfessorFromClass(this.props.cl).then((cl) => {
      this.onSubmit(cl)
    }).catch(() => false)
  }

  toggleProfessorModal () {
    this.setState({openModal: !this.state.openModal})
  }

  renderNoProfessor () {
    return (
      <div className='margin-top'>
        No professor found for this class.
      </div>
    )
  }

  renderProfessor () {
    const {professor: {name_first: first, name_last: last, phone, email, office_location: officeLocation, office_availability: availability}} = this.props.cl

    return (
      <div>
        <div className='professor-detail-row'>
          <div className='professor-detail-field'>
            <div className='professor-detail-label'>
              Name
            </div>
            <strong>{first ? `${first} ` : ''}{last || ''}</strong>
          </div>
          <div className='professor-detail-field'>
            <div className='professor-detail-label'>
              Phone
            </div>
            {phone || 'N/A'}
          </div>
        </div>
        <div className='professor-detail-row'>
          <div className='professor-detail-field'>
            <div className='professor-detail-label'>
              Email
            </div>
            {email || 'N/A'}
          </div>
          <div className='professor-detail-field'>
            <div className='professor-detail-label'>
              Location
            </div>
            {officeLocation || 'N/A'}
          </div>
        </div>
        <div className='professor-detail-row'>
          <div className='professor-detail-field'>
            <div className='professor-detail-label'>
              Hours
            </div>
            {availability || 'N/A'}
          </div>
        </div>
      </div>
    )
  }

  renderChangeRequestProfessorInfo () {
    const {professor} = this.props.cl

    return (
      <div>
        <div className='professor-detail-row' ref={firstNameRef => { this.professorRefs.name_first = firstNameRef }}>
          <div className='professor-detail-field'>
            <div className='professor-detail-label'>
              First Name
            </div>
            {professor.name_first ? professor.name_first : 'N/A'}
          </div>
        </div>
        <div className='professor-detail-row' ref={lastNameRef => { this.professorRefs.name_last = lastNameRef }}>
          <div className='professor-detail-field'>
            <div className='professor-detail-label'>
              Last Name
            </div>
            {professor.name_last ? professor.name_last : 'N/A'}
          </div>
        </div>
        <div className='professor-detail-row' ref={phoneRef => { this.professorRefs.phone_number = phoneRef }}>
          <div className='professor-detail-field'>
            <div className='professor-detail-label'>
              Phone
            </div>
            {professor.phone ? professor.phone : 'N/A'}
          </div>
        </div>
        <div className='professor-detail-row' ref={emailRef => { this.professorRefs.email = emailRef }}>
          <div className='professor-detail-field'>
            <div className='professor-detail-label'>
              Email
            </div>
            {professor.email ? professor.email : 'N/A'}
          </div>
        </div>
        <div className='professor-detail-row' ref={locationRef => { this.professorRefs.office_location = locationRef }}>
          <div className='professor-detail-field'>
            <div className='professor-detail-label'>
              Location
            </div>
            {professor.office_location ? professor.office_location : 'N/A'}
          </div>
        </div>
        <div className='professor-detail-row' ref={hoursRef => { this.professorRefs.office_availability = hoursRef }}>
          <div className='professor-detail-field'>
            <div className='professor-detail-label'>
              Hours
            </div>
            {professor.office_availability ? professor.office_availability : 'N/A'}
          </div>
        </div>
      </div>
    )
  }

  renderProfessorInfo () {
    const {professor} = this.props.cl

    if (this.state.changeRequests.length === 0) {
      return (
        <div>
          {!professor ? this.renderNoProfessor() : this.renderProfessor()}
        </div>
      )
    } else {
      return (
        this.renderChangeRequestProfessorInfo()
      )
    }
  }

  renderProfessorControls () {
    const {cl} = this.props

    return (
      <div className='margin-top'>
        {!cl.professor &&
          <SearchProfessor
            schoolId={cl.school.id}
            isUniversity={cl.school.is_university}
            onProfessorCreate={this.onCreateProfessor.bind(this)}
            onProfessorSelect={this.onAttachProfessorToClass.bind(this)}
          />
        }
      </div>
    )
  }
  renderOptions () {
    return (
      <div className='margin-top'>
        <a
          onClick={() => this.setState({isEditable: false})}
        >&lt; Back</a>
      </div>
    )
  }

  renderProfessorModal () {
    const {cl} = this.props
    if (this.state.openModal) {
      return (
        <div
          className='hub-professor-form-container'
        >
          <ProfessorForm
            schoolId={cl.school.id}
            isUniversity={cl.school.is_university}
            onClose={this.toggleProfessorModal.bind(this)}
            onSubmit={this.onAttachProfessorToClass.bind(this)}
            professor={cl.professor}
          />
        </div>
      )
    } else {
      return null
    }
  }

  renderContent () {
    const {isEditable} = this.state

    return (
      <div id='class-editor-professor-content'>
        {this.renderProfessorModal()}
        {!isEditable && this.renderProfessorInfo()}
        {isEditable && this.renderProfessorControls()}
        {isEditable && this.renderOptions()}
      </div>
    )
  }

  renderTitle () {
    const {canEdit, cl, hasIssues} = this.props

    return (
      <div className='cn-icon-flex'>
        Professor
        <div>
          {canEdit && <i className='fas fa-pencil-alt cn-blue cursor' onClick={() => !cl.professor ? this.setState({isEditable: true}) : this.toggleProfessorModal()} />}
          {canEdit && cl.professor && <i className='fa fa-trash cn-red cursor margin-left' onClick={() => this.removeProfessorFromClass()} />}
          {hasIssues && <i className='fa fa-warning cn-red cursor margin-left' onClick={() => this.props.onSelectIssue()} />}
        </div>
      </div>
    )
  }

  renderChangeRequests () {
    let crs = this.state.changeRequests
    let crsToRender = []
    let allCrData = {}
    if (crs.length > 0) {
      crs.forEach(cr => {
        cr.members.forEach(member => {
          if (!member.is_completed && member.member_name !== 'id') {
            if (Array.isArray(allCrData[member.member_name])) {
              allCrData[member.member_name].push({member: member, cr: cr})
            } else {
              allCrData[member.member_name] = [{member: member, cr: cr}]
            }
          }
        })
      })
      console.log('allCrData', allCrData)
      console.log('professorRefs', this.professorRefs)
      Object.keys(allCrData).forEach(key => {
        let membersCount = 0
        allCrData[key].forEach(dataPoint => {
          membersCount += 1
          if (dataPoint.member.member_value === this.props.cl.professor[dataPoint.member.member_name]) {
            resolveChangeRequestMember(dataPoint.member.id)
              .then(this.props.onChange())
              .catch(e => console.log(e))
          } else {
            crsToRender.push({
              jsx: <ChangeRequest
                cl={this.props.cl}
                cr={dataPoint.cr}
                member={dataPoint.member}
                width={this.cardRef.offsetWidth / 2}
                onChange={() => this.props.onChange()}
                offsetTop={this.professorRefs[dataPoint.member.member_name].offsetTop}
                multipleCrs={{count: allCrData[key].length, position: membersCount}}
              />,
              cr: dataPoint.cr,
              member: dataPoint.member
            })
          }
        })
      })
      let i = 0
      crsToRender.sort((a, b) => moment(a.cr.inserted_at).isBefore(b.cr.inserted_at) ? 1 : -1)
      return (
        <div className='hub-professor-cr-container'>
          {crsToRender.map(dataPoint => {
            i += 1
            return (
              <div key={i}>
                {dataPoint.jsx}
              </div>
            )
          })}
        </div>
      )
    }
  }

  render () {
    return (
      <div className='hub-professor'>
        <div className='hub-professor-card-container' ref={cardRef => { this.cardRef = cardRef }}>
          <Card
            title={this.renderTitle()}
            content={this.renderContent()}
          />
        </div>
        {this.state.mounted && !this.state.openModal &&
          this.renderChangeRequests()
        }
      </div>
    )
  }
}

Professor.propTypes = {
  cl: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
  canEdit: PropTypes.bool,
  hasIssues: PropTypes.bool,
  onSelectIssue: PropTypes.func,
  boxClassName: PropTypes.string,
  contentClassName: PropTypes.string,
  onChange: PropTypes.func
}

export default ValidateForm(Form(Professor, 'form'))
