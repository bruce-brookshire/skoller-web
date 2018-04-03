import React from 'react'
import PropTypes from 'prop-types'
import Grid from '../../../components/Grid'
import {convertUTCDatetimeToDateTimeString} from '../../../utilities/time'
import UploadHistory from '../../../components/UploadHistory'
import actions from '../../../actions'
import ClassUploadInfo from './ClassUploadInfo'
import Modal from '../../../components/Modal'

const headers = [
  {
    field: 'name',
    display: 'Name'
  },
  {
    field: 'inserted_at',
    display: 'Created'
  },
  {
    field: 'student_count',
    display: 'Students'
  },
  {
    field: 'class_count',
    display: 'Classes'
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
    const {id, name, inserted_at, student_count, class_count} = item
    const row = {
      id: id,
      name: name || '',
      inserted_at: inserted_at
        ? convertUTCDatetimeToDateTimeString(inserted_at, 'CST') : '',
      student_count: student_count || 0,
      class_count: class_count || 0,
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
      return a.inserted_at < b.inserted_at ? 1 : -1
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

  render () {
    const {periods, onEdit, header} = this.props
    return (
      <div>
        {header ? <div className='edit-header'>
          <h3>{this.props.header}</h3>
          {onEdit ? <a onClick={() => onEdit()}>Edit</a> : ''}
        </div> : ''}

        {periods ? this.renderSemesterTable()
          : onEdit ? <a onClick={() => onEdit()}>Add details</a> : ''
        }
        {this.renderClassUploadModal()}
      </div>
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
