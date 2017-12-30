import React from 'react'
import PropTypes from 'prop-types'
import Loading from '../../components/Loading'
import actions from '../../actions'

class FileUpload extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isDragActive: false
    }
  }

  /*
  * Render the upload section.
  */
  renderUpload () {
    if (this.props.loading) {
      return (
        <div>
          <div>
            {this.props.buttonLabel && <span>{this.props.buttonLabel}</span>}
            {this.props.renderFullUpload && <Loading /> }
          </div>
        </div>
      )
    }

    let classes = []
    const activeClass = this.state.isDragActive ? 'active' : ''
    if (this.props.className) classes.push(this.props.className)
    if (activeClass) classes.push(activeClass)
    if (this.props.disabled) classes.push('disabled')

    return (
      <div
        className={classes.join(' ')}
        onClick={() => { if (!this.props.disabled) { this.onClick() } }}
        onDragLeave={(event) => { if (!this.props.disabled) { this.onDragLeave(event) } }}
        onDragOver={(event) => { if (!this.props.disabled) { this.onDragOver(event) } }}
        onDrop={(event) => { if (!this.props.disabled) { this.onDrop(event) } }}
      >
        <input
          type="file"
          ref={(component) => { this.fileInput = component }}
          onChange={(event) => this.onDrop(event)}
        />
        {this.props.children}
        { this.props.buttonLabel && <span>{this.props.buttonLabel}</span>}
      </div>
    )
  }

  /*
  * Set drag active to false.
  *
  * @param [Event] event. Drag leave event.
  */
  onDragLeave (event) {
    this.setState({isDragActive: false})
  }

  /*
  * Handle drag over.
  *
  * @param [Event] event. Drag over event.
  */
  onDragOver (event) {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'copy'
    this.setState({isDragActive: true})
  }

  /*
  * Handle file drop.
  *
  * @param [Event] event. Drop event.
  */
  onDrop (event) {
    event.preventDefault()
    const file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0]
    if (file) {
      const isValidFileName = this.validateFileName(file)
      const isValidFileType = this.validateFileType(file)

      if (!isValidFileName) {
        actions.snackbar.showSnackbar('That file name contains invalid characters. Change the file name to upload. Invalid characters are: # % & * : < > ? / \\ { | }.')
      } else {
        isValidFileType ? this.uploadFile(file) : actions.snackbar.showSnackbar('That file type is not supported. Please use .doc, .docx, .jpeg, .pdf, or .png file types.')
      }

      this.setState({isDragActive: false})
      this.fileInput.value = ''
    }
  }

  /*
  * Handle onClick event.
  */
  onClick () {
    this.fileInput.click()
  }

  validateFileName (file) {
    const regex = /^.*?(?=[\^#%&$\*:<>\?/\{\|\}]).*$/ // eslint-disable no-useless-escape
    return !regex.test(file.name)
  }

  /*
  * Validate the mime type to only allow certain type of files through.
  *
  * @param [Object] file. File dropped.
  * @return [Boolean] isValid. Whether the file type is a supported.
  */
  validateFileType (file) {
    const {type} = file
    let isValid = false

    // allow .doc, .docx, .jpg, .pdf, .png
    switch (type) {
      case 'application/msword':
        isValid = true
        break
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        isValid = true
        break
      case 'image/jpeg':
        isValid = true
        break
      case 'application/pdf':
        isValid = true
        break
      case 'image/png':
        isValid = true
        break
      default:
        break
    }

    if (this.props.allow && type === this.props.allow) isValid = true
    return isValid
  }

  /*
  * Upload file.
  *
  * @param [Object] file. File to be uploaded.
  */
  uploadFile (file) {
    this.props.onUpload(file)
  }

  render () {
    const {renderFullUpload} = this.props
    return this.renderUpload()
  }
}

FileUpload.propTypes = {
  allow: PropTypes.string,
  buttonLabel: PropTypes.string,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onUpload: PropTypes.func,
  renderFullUpload: PropTypes.bool
}

export default FileUpload
