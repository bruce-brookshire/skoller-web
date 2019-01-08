import React from 'react'
import PropTypes from 'prop-types'
import {FileTabs, FileTab} from '../FileTab'
import FileViewer from '../FileViewer'
import FileUpload from '../FileUpload'

class TabbedFileUpload extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      currentDocument: props.documents && props.documents.length > 0 ? props.documents[0].path : null,
      currentDocumentIndex: props.documents && props.documents.length > 0 ? 0 : null
    }

    this.renderDocumentTabs = this.renderDocumentTabs.bind(this)
    this.renderDocumentViewer = this.renderDocumentViewer.bind(this)
  }

  componentWillReceiveProps (props) {
    if (props.documents) {
      var nextIndex = this.state.currentDocumentIndex
      if (props.documents.length === 0) {
        nextIndex = null
      } else if (!nextIndex || !this.props.documents) {
        nextIndex = 0
      } else if (props.documents.length - 1 < nextIndex) {
        nextIndex = nextIndex - 1
      }
      this.setState({currentDocument: nextIndex != null ? props.documents[nextIndex].path : null, currentDocumentIndex: nextIndex})
    }
  }
  
  renderDocumentTabs () {
    return (
      <FileTabs currentIndex={this.state.currentDocumentIndex} 
        addFileClick={() => this.setState({currentDocument: null, currentDocumentIndex: null})}>
        {
          this.props.documents.map((document, index) => {
            return (
              <FileTab
                key={index}
                name={document.name}
                removable={this.props.removable}
                onDelete={() => this.props.onDelete(document)}
                changed={false}
                onClick={() => {
                  this.setState({currentDocument: document.path, currentDocumentIndex: index})
                }}
              />
            )
          })
        }
      </FileTabs>
    )
  }

  /*
  * Renders the document viewer/uploader
  */
  renderDocumentViewer () {
    if (this.state.currentDocument) {
      return (
        <div className='cn-section-content cn-section-solid-border'>
          <FileViewer source={this.state.currentDocument} />
        </div>
      )
    } else if (this.props.documents.length === 0) {
      return (
        <div className='cn-section-content'>
          <FileUpload className={'cn-section-file-upload' + (this.props.uploadingDoc ? ' cn-upload-disabled' : '')}
            allow={true}
            disabled={this.props.uploadingDoc}
            onUpload={this.props.onUpload}>
            <span className="cn-blue">
              {
                this.props.uploadingDoc
                  ? 'Uploading...'
                  : 'Drag-n-drop a file here if you would like to view the syllabus while setting up the class 👌'
              }
            </span>
          </FileUpload>
        </div>
      )
    } else {
      return (
        <div className='cn-section-content'>
          <FileUpload className={'cn-section-file-upload' + (this.props.uploadingDoc ? ' cn-upload-disabled' : '')}
            allow={true}
            disabled={this.props.uploadingDoc}
            onUpload={this.props.onUpload}>
            <span className="cn-blue">
              {
                this.props.uploadingDoc
                  ? 'Uploading...'
                  : 'Drag-n-drop an additional file 👌'
              }
            </span>
          </FileUpload>
        </div>
      )
    }
  }

  render () {
    return (
      <div className='cn-tabbed-file-upload cn-file-panel'>
        <div className='cn-file-tabs'>
          {this.renderDocumentTabs()}
        </div>
        <div className='cn-section-header'>
          {this.props.header}
        </div>
        {this.renderDocumentViewer()}
      </div>
    )
  }
}

TabbedFileUpload.propTypes = {
  header: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  documents: PropTypes.array,
  removable: PropTypes.bool,
  uploadingDoc: PropTypes.bool,
  onUpload: PropTypes.func,
  onDelete: PropTypes.func
}

export default TabbedFileUpload
