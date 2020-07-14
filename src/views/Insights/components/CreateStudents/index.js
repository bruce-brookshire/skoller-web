import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import BulkUploadStudents from './BulkUploadStudents'
import CreateStudentForm from './CreateStudentForm'
import { toTitleCase } from '../../utils'
import SkSelect from '../../../components/SkSelect'
import { withRouter } from 'react-router-dom'

@inject('rootStore') @observer
class CreateStudents extends Component {
  constructor (props) {
    super(props)

    this.state = {
      formState: 'single',
      studentsAlias: this.props.rootStore.insightsStore.org.studentsAlias,
      studentsAliasTitle: toTitleCase(this.props.rootStore.insightsStore.org.studentsAlias),
      group: this.props.group
    }
  }

  onSubmit (r) {
    if (this.props.showConfirm && this.state.group) {
      this.setState({showConfirm: true, r})
    } else if (this.props.showConfirm && !this.state.group) {
      this.setState({showConfirm: 'noGroup', r})
    } else {
      this.props.onSubmit && this.props.onSubmit()
    }
  }

  renderConfirm () {
    let nStudents = 1
    if (Array.isArray(this.state.r)) {
      nStudents = this.state.r.length
    }
    return (
      <div className='si-create-students-confirm'>
        <h1>Congrats 🎉</h1>
        <p className='subtitle'><b>{nStudents} {this.props.rootStore.insightsStore.org.studentsAlias}{nStudents === 1 ? '' : 's'}</b> have been added {this.state.showConfirm === 'noGroup' ? '' : ('to ' + this.state.group.name)}.</p>
        <div className='control-buttons'>
          {this.state.showConfirm !== 'noGroup' &&
            <div className='si-button' style={{marginRight: '8px'}}>
              <p onClick={() => this.props.history.push('/insights/groups/' + this.state.group.id)}>Go to {this.state.group.name}</p>
            </div>
          }
          <div className='si-button'>
            <p onClick={() => this.props.history.push('/insights/dashboard/')}>Go to dashboard</p>
          </div>
        </div>
      </div>
    )
  }

  renderSingleForm () {
    return <CreateStudentForm onSubmit={(r) => this.onSubmit(r)} group={this.state.group} />
  }

  renderBulkUpload () {
    return <BulkUploadStudents rootStore={this.props.rootStore} onSubmit={(r) => this.onSubmit(r)} group={this.state.group} />
  }

  renderContent () {
    if (this.state.formState) {
      if (this.state.formState === 'single') {
        return this.renderSingleForm()
      } else if (this.state.formState === 'bulk') {
        return this.renderBulkUpload()
      }
    } else {
      return null
    }
  }

  renderSwitch () {
    return (
      <div className='si-create-students-switch'>
        <label>How many {this.state.studentsAlias}s are you adding?</label>
        <div className='buttons'>
          <div onClick={() => this.setState({formState: 'single'})} className={'switch-button ' + (this.state.formState === 'single' ? 'active' : 'inactive')}>
            <p>One {this.state.studentsAlias}</p>
          </div>
          <div onClick={() => this.setState({formState: 'bulk'})} className={'switch-button ' + (this.state.formState === 'bulk' ? 'active' : 'inactive')}>
            <p>Many {this.state.studentsAlias}s</p>
          </div>
        </div>
      </div>
    )
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

  renderGroupSelect () {
    return (
      <div className='si-create-students-group'>
        <label>Select {this.props.rootStore.insightsStore.org.groupsAlias}</label>
        <SkSelect className='si-select' selection={this.state.group ? this.state.group.name : 'No team'} optionsMap={() => {
          return this.props.rootStore.insightsStore.groups.map(g => {
            return (
              <div className='si-select-option' onClick={() => this.setState({group: g})} key={this.props.rootStore.insightsStore.groups.indexOf(g)}>{g.name}</div>
            )
          })
        }} />
      </div>
    )
  }

  render () {
    if (this.state.showConfirm) {
      return (
        <div className='si-create-students'>
          {this.renderConfirm()}
        </div>
      )
    }
    return (
      <div className='si-create-students'>
        <h1>Add {this.state.studentsAliasTitle + 's'}</h1>
        {this.renderGroupSelect()}
        {this.renderSwitch()}
        {this.renderContent()}
      </div>
    )
  }
}

CreateStudents.propTypes = {
  group: PropTypes.object,
  onSubmit: PropTypes.func,
  rootStore: PropTypes.object,
  showConfirm: PropTypes.bool,
  history: PropTypes.object
}

export default withRouter(CreateStudents)
