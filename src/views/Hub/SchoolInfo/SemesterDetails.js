import React from 'react'
import PropTypes from 'prop-types'
import Grid from '../../../components/Grid'
import {convertUTCDatetimeToDateTimeString} from '../../../utilities/time'
import UploadHistory from '../../../components/UploadHistory'
import actions from '../../../actions'
import ClassUploadInfo from './ClassUploadInfo'
import Modal from '../../../components/Modal'
import Card from '../../../components/Card'

const headers = [
  {
    field: 'name',
    display: 'Name'
  },
  {
    field: 'start_date',
    display: 'Start'
  },
  {
    field: 'end_date',
    display: 'End'
  },
  {
    field: 'student_count',
    display: 'Students'
  },
  {
    field: 'class_count',
    display: 'Classes'
  },
  {
    field: 'status',
    display: 'Status'
  }
]

class SemesterDetails extends React.Component {
  constructor (props) {
    super(props)

    this.state = this.initializeState()
  }

  initializeState () {
    return {
      erroredClasses: [],
      completedClassCount: 0,
      openClassModal: false
    }
  }

  /*
  * On upload class csv, show results of upload.
  *
  * @param [File] file. File to be uploaded.
  */
  onUploadClasses (id, file) {
    actions.documents.uploadClassCsv(id, file).then((classes) => {
      const erroredClasses = classes.filter(cl => {
        let error = cl.errors
        if (error && cl.errors.class) {
          error = cl.errors.class.findIndex(e =>
            e.toLowerCase() === 'has already been taken') === -1
        }
        return error
      })
      const completedClassCount = classes.length - erroredClasses.length
      this.setState({erroredClasses, completedClassCount, openClassModal: true})
      this.props.onUpload()
    })
  }

  mapRow (item, index) {
    const {id, name, start_date: startDate, end_date: endDate, student_count: studentCount, class_count: classCount, class_period_status: status} = item
    const row = {
      id: id,
      name: name || '',
      start_date: startDate
        ? convertUTCDatetimeToDateTimeString(startDate, 'America/Chicago') : '',
      end_date: endDate
        ? convertUTCDatetimeToDateTimeString(endDate, 'America/Chicago') : '',
      student_count: studentCount || 0,
      class_count: classCount || 0,
      status: status ? status.name : '',
      component: this.props.onUpload ? <div className='col-xs-12 col-md-6 margin-top'>
        <h3>Import classes</h3>
        <UploadHistory
          allow='text/csv'
          disabled={false}
          files={[]}
          info='Upload classes csv.'
          onUpload={(file) => { this.onUploadClasses(id, file) }}
          title='Classes'
        />
      </div> : ''
    }
    return row
  }

  getRows () {
    const {periods} = this.props
    return periods.sort((a, b) => {
      return a.start_date > b.start_date ? 1 : -1
    }).map((item, index) =>
      this.mapRow(item, index)
    )
  }

  renderSemesterTable () {
    return (
      <Grid
        className='striped'
        headers={headers}
        rows={this.getRows()}
        disabled={true}
        canDelete={false}
        canSelect={false}
        emptyMessage={'No semesters yet.'} />
    )
  }

  /*
  * Toggle the class upload results modal.
  */
  toggleClassUploadModal () {
    this.setState({openClassModal: !this.state.openClassModal})
  }

  /*
  * Render the class upload results modal.
  */
  renderClassUploadModal () {
    const {openClassModal, erroredClasses, completedClassCount} = this.state
    return (
      <Modal
        open={openClassModal}
        onClose={this.toggleClassUploadModal.bind(this)}
      >
        <div>
          <ClassUploadInfo
            erroredClasses={erroredClasses}
            completedClassCount={completedClassCount}
          />
          <div className='row'>
            <button
              className='button-invert full-width margin-top margin-bottom'
              onClick={this.toggleClassUploadModal.bind(this)}
            > Close </button>
          </div>
        </div>
      </Modal>
    )
  }

  renderTitle () {
    const {onEdit, header} = this.props

    return (
      <div className='cn-icon-flex'>
        {header}
        {onEdit ? <i className='fa fa-plus cn-blue cursor' onClick={() => onEdit() } /> : ''}
      </div>
    )
  }

  renderContent () {
    const {periods, onEdit} = this.props
    return (
      <div>
        {periods ? this.renderSemesterTable()
          : onEdit ? <a onClick={() => onEdit()}>Add details</a> : ''
        }
        {this.renderClassUploadModal()}
      </div>
    )
  }

  render () {
    const {header} = this.props

    return (
      <Card
        title={header ? this.renderTitle() : null}
        content={this.renderContent()}
      />
    )
  }
}

SemesterDetails.propTypes = {
  onEdit: PropTypes.func,
  school: PropTypes.object,
  periods: PropTypes.array,
  header: PropTypes.string,
  onUpload: PropTypes.func
}

export default SemesterDetails
