import React from 'react'
import PropTypes from 'prop-types'
import FileUpload from '../FileUpload'

class UploadHistory extends React.Component {
  renderHistory () {
    const {files,unsavedDocuments} = this.props
    if(files && files.length > 0){
      return files.map((file, index) => {
        return (
          <a
            key={index}
            className='history-item'
            href={file.path}
            target="_blank"
          >{file.name}</a>
        )
      })
    }else if(unsavedDocuments && unsavedDocuments.length > 0){
      return unsavedDocuments.map((file, index) => {
        return (
          <div key={index}>
            <div style={{display:'inline-block', marginRight: '5px'}}>{file.name}</div>
            <button onClick={() => {this.props.onDeleteDocument(index)}} className='fa fa-trash cn-red'></button>
          </div>
        )
      })
    }
  }

  render () {
    const {files, info, title} = this.props
    const containerClasses = ['upload-container']
    if (files.length > 0) containerClasses.push('has-files')
    return (
      <div className='cn-upload-history'>
        <div className='upload-history-list'>
          <FileUpload className={containerClasses.join(' ')} allow={this.props.allow} disabled={this.props.disabled} onUpload={this.props.onUpload}>
            <span className='header center-text'>{title}</span>
            {this.renderHistory()}
          </FileUpload>
        </div>
        {
          info
            ? <div className='upload-info margin-top'>
              <i className='fa fa-info-circle info-icon'/>
              <span>{info}</span>
            </div>
            : null
        }
      </div>
    )
  }
}

UploadHistory.propTypes = {
  allow: PropTypes.string,
  disabled: PropTypes.bool,
  files: PropTypes.array,
  unsavedDocuments: PropTypes.array,
  info: PropTypes.string,
  onUpload: PropTypes.func,
  onDeleteDocument: PropTypes.func,
  title: PropTypes.string
}

export default UploadHistory
