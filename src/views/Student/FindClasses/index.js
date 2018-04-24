import React from 'react'
import PropTypes from 'prop-types'
import {Form, ValidateForm} from 'react-form-library'
import actions from '../../../actions'
import {InputField} from '../../../components/Form'
import SearchSchool from './SearchSchool'
import CreateSchoolModal from './CreateSchoolModal'
import Modal from '../../../components/Modal'

class FindClasses extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      school: null,
      schoolName: '',
      openCreateSchoolModal: false
    }
  }

  /*
  * Fetch the classes for a user.
  */
  componentWillMount () {
  }

  onSubmitSchool (school) {
    this.setState({school: school, schoolName: school.name})
  }

  onCreateSchool (school) {
    this.setState({schoolName: school})
    this.toggleCreateSchoolModal()
  }

  renderSchool () {
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

  resetSchool () {
    this.setState({school: null, schoolName: ''})
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
          <h5>School</h5>
          {schoolName ? this.renderSchool() : <SearchSchool
            onSchoolSelect={this.onSubmitSchool.bind(this)}
            onSchoolCreate={this.onCreateSchool.bind(this)}
          />}
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
