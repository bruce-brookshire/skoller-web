import React from 'react'
import Card from '../../../components/Card'
import UploadHistory from '../../../components/UploadHistory'
import actions from '../../../actions'
import Modal from '../../../components/Modal'
import CSVUploadInfo from './CSVUploadInfo'

class FieldOfStudyCSV extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      completedItemCount: 0,
      erroredItem: [],
      openCSVModal: false
    }
  }

  handleCSVErrors (items, mapErrors) {
    const erroredItem = items.filter(f => {
      let error = f.error || f.errors
      return error
    }).map((item, index) => { return mapErrors(item, index) })
    const completedItemCount = items.length - erroredItem.length
    this.setState({ erroredItem, completedItemCount, openCSVModal: true })
  }

  mapFOSErrors (item, index) {
    if (item.errors) {
      item.name = item.field
    }
    return item
  }

  /*
  * On upload class fos, show results of upload.
  *
  * @param [File] file. File to be uploaded.
  */
  onUploadFOS (file) {
    actions.fieldsofstudy.uploadFOSCsv(file).then((fos) => {
      this.handleCSVErrors(fos, this.mapFOSErrors)
    })
  }

  /*
  * Toggle fos modal.
  */
  toggleCSVModal () {
    this.setState({openCSVModal: !this.state.openCSVModal})
  }

  /*
  * Render the fos upload modal
  */
  renderFOSUploadModal () {
    const {openCSVModal, erroredItem, completedItemCount} = this.state
    return (
      <Modal
        open={openCSVModal}
        onClose={this.toggleCSVModal.bind(this)}
      >
        <div>
          <CSVUploadInfo
            erroredItem={erroredItem}
            completedItemCount={completedItemCount}
          />
          <div className='row'>
            <button
              className='button-invert full-width margin-top margin-bottom'
              onClick={this.toggleCSVModal.bind(this)}
            > Close </button>
          </div>
        </div>
      </Modal>
    )
  }

  render () {
    return (
      <div>
        <Card
          title='Import fields of study CSV'
          content={
            <UploadHistory
              allow='text/csv'
              disabled={false}
              files={[]}
              onUpload={(file) => { this.onUploadFOS(file) }}
              title='Drop CSV'
            />
          }
        />
        {this.renderFOSUploadModal()}
      </div>
    )
  }
}

export default FieldOfStudyCSV
