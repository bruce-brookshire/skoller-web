import React from 'react'
import Card from '../../../components/Card'
import UploadHistory from '../../../components/UploadHistory'
import actions from '../../../actions'
import Modal from '../../../components/Modal'
import CSVUploadResults from '../../../components/CSVUploadResults'

class SchoolCSV extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      completedItemCount: 0,
      erroredItem: [],
      openCSVModal: false
    }
  }

  handleCSVErrors (items) {
    const erroredItem = items.filter(f => {
      let error = f.error || f.errors
      return error
    })
    console.log(erroredItem)
    const completedItemCount = items.length - erroredItem.length
    this.setState({ erroredItem, completedItemCount, openCSVModal: true })
  }

  /*
  * On upload school, show results of upload.
  *
  * @param [File] file. File to be uploaded.
  */
  onUploadSchools (file) {
    actions.schools.uploadSchoolCsv(file).then((school) => {
      console.log("here")
      this.handleCSVErrors(school)
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
  renderCSVUploadModal () {
    const {openCSVModal, erroredItem, completedItemCount} = this.state
    return (
      <Modal
        open={openCSVModal}
        onClose={this.toggleCSVModal.bind(this)}
      >
        <div>
          <CSVUploadResults
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
          title='Import schools CSV'
          content={
            <UploadHistory
              allow='text/csv'
              disabled={false}
              files={[]}
              onUpload={(file) => { this.onUploadSchools(file) }}
              title='Drop CSV'
            />
          }
        />
        {this.renderCSVUploadModal()}
      </div>
    )
  }
}

export default SchoolCSV
