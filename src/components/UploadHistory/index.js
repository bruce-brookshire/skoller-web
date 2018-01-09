import React from 'react'
import PropTypes from 'prop-types'
import FileUpload from '../FileUpload'

class UploadHistory extends React.Component {
  renderHistory () {
    const {files,unsavedSyllabi,unsavedAdditional} = this.props
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
    }else if(unsavedAdditional && unsavedAdditional.length > 0){
      return unsavedAdditional.map((file, index) => {
        return (
          <div key={index}>
            <div style={{display:'inline-block', marginRight: '5px'}}>{file.name}</div>
            <button onClick={(e) => {this.props.onDeleteAdditional(index)}} className='fa fa-trash cn-red'></button>
          </div>
        )
      })
    }else if(unsavedSyllabi && unsavedSyllabi.length > 0){
      return unsavedSyllabi.map((file, index) => {
        return (
          <div key={index}>
            <div style={{display:'inline-block', marginRight: '5px'}}>{file.name}</div>
            <button onClick={(e) => {this.props.onDeleteSyllabus(index)}} className='fa fa-trash cn-red'></button>
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
  unsavedSyllabi: PropTypes.array,
  unsavedAdditional: PropTypes.array,
  info: PropTypes.string,
  onUpload: PropTypes.func,
  title: PropTypes.string
}

export default UploadHistory
