import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DragAndDrop from '../../../components/DragAndDrop/DragAndDrop'
import Papa from 'papaparse'
import SkLoader from '../../../../assets/sk-icons/SkLoader'
import Table from '../Table'
import actions from '../../../../actions'

class BulkUploadStudents extends Component {
  constructor (props) {
    super(props)

    this.state = {
      csv: null,
      errors: [],
      preview: []
    }
  }

  downloadCsv () {
    const data = [
      ['Jane', 'Doe', '5555555555', 'janedoe@skoller.co']
    ]
    let csv = 'name_first,name_last,phone,email\n'
    data.forEach(function (row) {
      csv += row.join(',')
      csv += '\n'
    })

    var hiddenElement = document.createElement('a')
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv)
    hiddenElement.target = '_blank'
    hiddenElement.download = 'skoller-bulk-upload.csv'
    hiddenElement.click()
  }

  renderDragAndDrop () {
    return (
      <div className='si-bulk-upload-dnd-container'>
        <DragAndDrop
          handleDrop={(file) => {
            this.setState({csv: file[0]})
            this.parseCSV(file[0])
          }}
        >
          <div className='si-bulk-upload-dnd-message'>Drop your CSV here</div>
        </DragAndDrop>
      </div>
    )
  }

  validateEmail (email) {
    if (!email) {
      return false
    }

    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return (true)
    }
    return (false)
  }

  validatePhone (phone) {
    if (!phone) {
      return false
    }

    var phoneNo = /^\d{10}$/
    if (phone.match(phoneNo)) {
      return true
    } else {
      return false
    }
  }

  onParseComplete = (results) => {
    let errors = []
    results.data.forEach(student => {
      let error = {}
      if (!this.validateEmail(student.email)) error.email = true
      if (!this.validatePhone(student.phone)) error.phone = true
      if (!student.name_first) error.name_first = true
      if (!student.name_last) error.name_last = true

      if (error.email || error.phone || error.name_first || error.name_last) errors.push({...student, error})
    })
    this.setState({loading: false, preview: results.data, errors})
  }

  parseCSV (csv) {
    Papa.parse(csv, {
      header: true,
      complete: this.onParseComplete
    })
  }

  renderErrors () {
    const headers = [
      'First Name', 'Last Name', 'Email', 'Phone', 'Error'
    ]
    const data = this.state.errors.map(d => {
      console.log(d, d.name_last)
      let i = 0
      return ([
        d.name_first,
        d.name_last,
        d.email,
        d.phone || null,
        <div className='error' key={this.state.errors.indexOf(d)}>
          {Object.keys(d.error).map(key => {
            if (d.error[key]) {
              i += 1
              return (
                <span key={key}>{i > 1 ? ', ' : ''}Invalid {key}</span>
              )
            }
          })}
        </div>
      ])
    })
    return (
      <div style={{maxHeight: '300px', position: 'relative', overflow: 'scroll'}}><Table stickyHeader headers={headers} data={data} /></div>
    )
  }

  renderPreview () {
    const headers = [
      'First Name', 'Last Name', 'Email', 'Phone'
    ]
    const data = this.state.preview.map(d => {
      return ([
        d.name_first,
        d.name_last,
        d.email,
        d.phone
      ])
    })

    return (
      <div className='si-bulk-upload-preview'>
        {this.state.errors.length > 0 &&
          <React.Fragment>
            <h3 className='alert'>We found a few errors in your CSV.</h3>
            <p className='alert'>Please correct these errors and then upload your CSV again.</p>
          </React.Fragment>
        }
        {this.state.errors.length > 0
          ? this.renderErrors()
          : <React.Fragment>
            <h3>Here&apos;s what we pulled from your CSV.</h3>
            <p>If everything looks correct, hit submit to invite these students to your organization.</p>
            <div style={{maxHeight: '300px', position: 'relative', overflow: 'scroll'}}><Table stickyHeader headers={headers} data={data} /></div>
          </React.Fragment>
        }
        <div className='si-bulk-upload-clear'>
          {this.state.errors.length > 0
            ? <React.Fragment>Ready to try again? <span onClick={() => this.setState({csv: null})}>Clear and upload another file.</span></React.Fragment>
            : <React.Fragment>Wrong file? <span onClick={() => this.setState({csv: null})}>Upload a different one.</span></React.Fragment>
          }
        </div>
      </div>
    )
  }

  renderTemplate () {
    return <div className='si-bulk-upload-template' onClick={() => this.downloadCsv()}>Download CSV template</div>
  }

  onSubmit () {
    this.setState({loading: true})
    let orgGroupId = this.props.group.id
    actions.insights.invitations.postInvitationsCSV(this.props.rootStore.insightsStore.org.id, this.state.csv, orgGroupId)
      .then(() => {
        this.props.onSubmit && this.props.onSubmit()
        this.setState({loading: false, csv: null, preview: null})
      })
      .catch(() => {
        this.setState({
          loading: false, csv: null, preview: null
        })
      })
  }

  renderSubmit () {
    return (
      <div className='si-button'>
        <p
          onClick={() => this.onSubmit()}
        >
          Submit {this.state.preview.length} invitations
        </p>
      </div>
    )
  }

  renderContent () {
    if (this.state.csv) {
      return (
        <React.Fragment>
          {this.state.preview.length > 0
            ? this.renderPreview()
            : <SkLoader />
          }
          {this.state.errors.length === 0 && this.state.preview.length > 0 && this.renderSubmit()}
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          {this.renderDragAndDrop()}
          {this.renderTemplate()}
        </React.Fragment>
      )
    }
  }

  render () {
    return (
      <div className='si-bulk-upload'>
        {this.renderContent()}
      </div>
    )
  }
}

BulkUploadStudents.propTypes = {
  group: PropTypes.object,
  onSubmit: PropTypes.func,
  rootStore: PropTypes.object
}

export default BulkUploadStudents
