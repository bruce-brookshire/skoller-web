import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import BulkUploadStudents from './BulkUploadStudents'
import CreateStudentForm from './CreateStudentForm'
import { toTitleCase } from '../../utils'

@inject('rootStore') @observer
class CreateStudents extends Component {
  constructor (props) {
    super(props)

    this.state = {
      formState: null,
      studentsAlias: this.props.rootStore.insightsStore.org.studentsAlias,
      studentsAliasTitle: toTitleCase(this.props.rootStore.insightsStore.org.studentsAlias)
    }
  }

  onSubmit () {
    this.props.onSubmit && this.props.onSubmit()
  }

  renderSingleForm () {
    return <CreateStudentForm onSubmit={() => this.onSubmit()} group={this.props.group} />
  }

  renderBulkUpload () {
    return <BulkUploadStudents rootStore={this.props.rootStore} onSubmit={() => this.onSubmit()} group={this.props.group} />
  }

  renderContent () {
    if (this.state.formState) {
      if (this.state.formState === 'single') {
        return this.renderSingleForm()
      } else if (this.state.formState === 'bulk') {
        return this.renderBulkUpload()
      }
    } else {
      return (
        <div className='si-create-students-switch'>
          <div className='si-button'>
            <p
              onClick={() => this.setState({formState: 'single'})}
            >Add a single {this.state.studentsAlias}</p>
          </div>
          <div className='si-create-students-switch-or'>or</div>
          <div className='si-button'>
            <p
              onClick={() => this.setState({formState: 'bulk'})}
            >Upload {this.state.studentsAlias}s in bulk</p>
          </div>
        </div>
      )
    }
  }

  renderToggle () {
    let oppositeState = this.state.formState === 'single' ? 'bulk' : 'single'
    let copy = oppositeState === 'single' ? `Try creating a single ${this.state.studentsAlias}.` : `Try uploading ${this.state.studentsAlias}s in bulk.`
    return (
      <small className='si-create-students-toggle'>
        Not what you were looking for? <span onClick={() => this.setState({formState: oppositeState})}>{copy}</span>
      </small>
    )
  }

  render () {
    return (
      <div className='si-create-students'>
        <h1>Add {this.state.studentsAliasTitle + 's'}{this.props.group ? ' to ' + this.props.group.name : ''}</h1>
        {this.renderContent()}
        {this.state.formState && this.renderToggle()}
      </div>
    )
  }
}

CreateStudents.propTypes = {
  group: PropTypes.object,
  onSubmit: PropTypes.func,
  rootStore: PropTypes.object
}

export default CreateStudents
