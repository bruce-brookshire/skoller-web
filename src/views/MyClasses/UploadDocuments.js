import 'isomorphic-fetch'
import React from 'react'
import PropTypes from 'prop-types'
import {browserHistory} from 'react-router'
import UploadHistory from '../../components/UploadHistory'

class UploadDocuments extends React.Component {
  /*
  * Handle syllabus upload.
  *
  * @param [String] fileUrl. S3 url where document is stored.
  * @param [Object] file. File uploaded
  */
  onSyllabusUpload (fileUrl, file) {
    this.storeFileUrl(fileUrl, file, true)
  }

  /*
  * Handle additional documents upload.
  *
  * @param [String] fileUrl. S3 url where document is stored.
  * @param [Object] file. File uploaded
  */
  onDocumentUpload (fileUrl, file) {
    this.storeFileUrl(fileUrl, file, false)
  }

  /*
  * Post data to be stored.
  *
  * @param [String] fileUrl. S3 url where document is stored.
  * @param [Object] file. File uploaded
  * @param [Boolean] primary. Whether it is a primary document or not.
  */
  storeFileUrl (fileUrl, file, primary) {
    // const {cl} = this.props
    // const classId = cl.objectId
    //
    // const form = {fileUrl, originalFileName: file.name, fileType: file.type, primary }
    //
    // fetch(`/classes/${classId}/document`, {
    //   method: 'POST',
    //   credentials: 'include',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(form)
    // })
    //   .then(response => checkError(response))
    //   .then(response => response.json())
    //   .then(data => {
    //     if (data.error){
    //     throw data.message
    //   }
    //   //need to update class, as status has changed if primary
    //   const index = userStore.user.currentClasses.findIndex(cl=> cl.objectId === data.class.objectId)
    //   userStore.user.currentClasses[index] = data.class
    //
    //   showSnackBar('Document successfully uploaded.')
    // })
    // .catch(error =>{
    //   showSnackBar('Error uploading document. Try again later.')
    // })

  }

  onDIY () {
    browserHistory.push({ pathname: '/diy/tool', state: {cl: this.props.cl} })
  }

  render () {
    const {cl: {status}} = this.props
    const needsSyllabus = status === 'NEEDS_SYLLABUS' || status === 'NO_FILES' || !status
    const fullWidthClass = !needsSyllabus ? 'full-width' : ''

    return (
      <div className='cn-upload-documents-container'>
        <div className='row'>
          <div className='col-xs-3 vertical-align'>
            <h4>Finish up this class.</h4>
            <span className='info-1'>Upload documents and review syllabi.</span>
          </div>
          <div className='col-xs-3'>
            <UploadHistory
              files={['syllabus.pdf']}
              info='Upload your class syllabus.'
              title='Main syllabus'
            />
          </div>
          <div className='col-xs-3'>
            <UploadHistory
              files={['myverysuperlongpdffilename07-11-2017.pdf', 'grades.pdf']}
              info='If assignment schedules or grading info are provided, drop them here.'
              title='Drop any additional documents (optional)'
            />
          </div>
          <div className='col-xs-3 vertical-align center'>
            <button className='button'>Let ClassNav review this syllabus</button>
            <span className='info-2'>{'You\'ll have to wait 72 hours'}</span>
            <a className='margin-top' onClick={this.onDIY.bind(this)}>Review syllabus myself</a>
            <span className='info-2'>Only takes a few minutes</span>
          </div>
        </div>
      </div>
    )
  }
}

UploadDocuments.propTypes = {
  cl: PropTypes.object
}

export default UploadDocuments
