import React from 'react'
import PropTypes from 'prop-types'
import FileUpload from '../FileUpload'

class UploadHistory extends React.Component {
  renderHistory () {
    const {files} = this.props
    return files.map((file, index) => {
      return (
        <a
          key={index}
          className='history-item'
          onClick={(event) => {
            this.onDownload(event, file)
          }}
        >{file}</a>
      )
    })
  }

  onDownload (event, file) {
    event.stopPropagation()
  }

  render () {
    const {info, title} = this.props
    return (
      <div className='cn-upload-history'>
        <div className='upload-history-list'>
          <FileUpload className="upload-container">
            <span className='header center-text'>{title}</span>
            {this.renderHistory()}
          </FileUpload>
        </div>
        <div className='upload-info margin-top'>
          <i className='fa fa-info-circle info-icon'/>
          <span>{info}</span>
        </div>
      </div>
    )
  }
}

UploadHistory.propTypes = {
  files: PropTypes.array,
  info: PropTypes.string,
  title: PropTypes.string
}

export default UploadHistory
