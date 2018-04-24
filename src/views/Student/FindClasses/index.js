import React from 'react'
import PropTypes from 'prop-types'
import {Form, ValidateForm} from 'react-form-library'
import actions from '../../../actions'
import {InputField} from '../../../components/Form'
import SearchSchool from './SearchSchool'
import SearchClass from './SearchClass'
import CreateSchoolModal from './CreateSchoolModal'
import Modal from '../../../components/Modal'

class FindClasses extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.initializeState()
  }

  componentWillMount () {
  }

  initializeState () {
    return {
      school: null,
      schoolName: '',
      openCreateSchoolModal: false,
      cl: null,
      clName: ''
    }
  }

  onSubmitSchool (school) {
    this.setState({school: school, schoolName: school.name})
  }

  onSubmitClass (cl) {
    this.setState({cl: cl, clName: cl.name})
  }

  onCreateClass (clName) {
    this.setState({clName})
    this.toggleCreateSchoolModal()
  }

  onCreateSchool (schoolName) {
    this.setState({schoolName})
    this.toggleCreateSchoolModal()
  }

  renderSchoolName () {
    const {formErrors} = this.props
    return (
      <InputField
        error={formErrors.schoolName}
        name='schoolName'
        onChange={(name, value) => {
          this.resetSchool()
        }}
        value={this.state.schoolName}
      />
    )
  }

  renderClassName () {
    const {formErrors} = this.props
    return (
      <InputField
        error={formErrors.clName}
        name='clName'
        onChange={(name, value) => {
          this.resetClass()
        }}
        value={this.state.clName}
      />
    )
  }

  renderSchool () {
    let {school} = this.state
    return (
      <div className='cn-find-classes-field'>
        <div className='cn-find-classes-label'>School</div>
        {school ? this.renderSchoolName() : <SearchSchool
          onSchoolSelect={this.onSubmitSchool.bind(this)}
          onSchoolCreate={this.onCreateSchool.bind(this)}
        />}
      </div>
    )
  }

  renderClass () {
    let {cl} = this.state
    return (
      <div className='cn-find-classes-field'>
        <div className='cn-find-classes-label'>Class name</div>
        {cl ? this.renderClassName() : <SearchClass
          schoolId={this.state.school.id}
          onClassSelect={this.onSubmitClass.bind(this)}
          onClassCreate={this.onCreateClass.bind(this)}
        />}
      </div>
    )
  }

  renderDisabledField () {
    return (
      <div className='cn-find-classes-field'>
        <div className='cn-find-classes-disabled-label'></div>
        <div className='cn-find-classes-disabled'></div>
      </div>
    )
  }

  resetClass () {
    this.setState({cl: null, clName: ''})
  }

  resetSchool () {
    this.setState(this.initializeState())
  }

  toggleCreateSchoolModal () {
    this.setState({openCreateSchoolModal: !this.state.openCreateSchoolModal})
  }

  renderCreateSchoolModal () {
    return (
      <Modal
        open={this.state.openCreateSchoolModal}
        onClose={this.toggleCreateSchoolModal.bind(this)}
      >
        <CreateSchoolModal
          name={this.state.schoolName}
          onClose={this.toggleCreateSchoolModal.bind(this)}
          onSubmit={this.onSubmitSchool.bind(this)}
        />
      </Modal>
    )
  }

  render () {
    let {schoolName} = this.state
    return (
      <div className='cn-find-classes-container'>
        <div className='cn-find-classes-content'>
          <div className='cn-find-classes-header'>
            <h2>Set up or find a class</h2>
            <p>Make sure this info is correct so your classmates can find the class!</p>
          </div>
          {this.renderSchool()}
          {this.state.school ? this.renderClass() : this.renderDisabledField()}
        </div>
        {schoolName && this.renderCreateSchoolModal()}
      </div>
    )
  }
}

FindClasses.propTypes = {
  formErrors: PropTypes.object,
  updateProperty: PropTypes.func,
  validateForm: PropTypes.func
}

export default ValidateForm(Form(FindClasses, 'form'))
