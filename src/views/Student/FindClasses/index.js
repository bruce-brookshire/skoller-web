import React from 'react'
import PropTypes from 'prop-types'
import {Form, ValidateForm} from 'react-form-library'
import actions from '../../../actions'
import {InputField} from '../../../components/Form'
import SearchSchool from './SearchSchool'

class FindClasses extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      school: null,
      schoolName: ''
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

  renderSchool () {
    const {formErrors, updateProperty} = this.props
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
          />}
        </div>
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
