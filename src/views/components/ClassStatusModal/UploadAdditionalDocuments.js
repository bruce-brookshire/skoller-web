import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import actions from '../../../actions'
import DragAndDrop from '../DragAndDrop/DragAndDrop'
import SkLoader from '../../../assets/sk-icons/SkLoader'
import {showSnackbar} from '../../../utilities/snackbar'
import StudentRequestModal from '../../Student/ClassDetail/StudentRequestModal'

@inject('rootStore') @observer
class UploadAdditionalDocuments extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      loading: true,
      documents: [],
      newDocuments: [],
      syllabus: null,
      showStudentRequestModal: false,
      isCompleteClass: this.props.cl.status.id > 1300
    }

    actions.documents.getClassDocuments(this.props.cl.id)
      .then((r) => {
        let syllabus
        if (Array.isArray(r) && r.length > 0) {
          r.forEach(doc => {
            if (doc.is_syllabus) {
              syllabus = doc
            }
          })
        }
        this.setState({documents: r, syllabus: syllabus, loading: false})
      })
      .catch((e) => {
        console.log(e)
        this.setState({loading: false})
      })
  }

  async onSubmit () {
    if (this.state.newDocuments.length > 0) {
      this.setState({loading: true})
      await this.state.newDocuments.forEach(async doc => {
        await actions.documents.uploadClassDocument(this.props.cl, doc, false)
      })
      this.setState({loading: false})
      showSnackbar('Successfully uploaded ' + this.state.newDocuments.length.toString() + ' document' + (this.state.newDocuments.length > 1 ? 's' : '') + '.', 'success')
      this.props.onSubmit()
    } else {
      return null
    }
  }

  renderDocs () {
    return (
      <div className='sk-upload-additional-docs-previous-container'>
        <p>Here&apos;s what we have so far:</p>
        <div className='sk-upload-additional-docs-previous'>
          <div className='sk-upload-additional-docs-previous-item'>
            <h3>Syllabus</h3>
            {this.state.syllabus
              ? <a href={this.state.syllabus.path} target='_blank' rel='noopener noreferrer'>{this.state.syllabus.name}</a>
              : <p>No syllabus was uploaded.</p>
            }
          </div>
          <div className='sk-upload-additional-docs-previous-item'>
            <h3>Other documents</h3>
            {this.state.documents.length > 0
              ? this.state.documents.map(doc => {
                if (!doc.is_syllabus) {
                  return (
                    <a href={doc.path} target='_blank' rel='noopener noreferrer'>{doc.name}</a>
                  )
                } else if ((this.state.documents.length === 1 && this.state.syllabus !== null) || (this.state.documents.length === 0 && this.state.syllabus === null)) {
                  return (
                    <p>No additional documents received.</p>
                  )
                }
              })
              : <p>No additional documents received.</p>
            }
          </div>
        </div>
      </div>
    )
  }

  renderDragAndDrop () {
    return (
      <DragAndDrop
        handleDrop={(file) => {
          let newDocuments = this.state.newDocuments
          newDocuments.push(file[0])
          this.setState({newDocuments: newDocuments})
        }}
      >
        <div className='sk-upload-additional-docs-file-drop'>
          {this.state.newDocuments.length > 0
            ? <div className='sk-upload-additional-docs-file-drop-files'>
              {this.state.newDocuments.map(file => {
                return (
                  <div key={file.name} className='sk-upload-additional-docs-file-drop-file'>
                    <i
                      className='far fa-times-circle'
                      onClick={(e) => {
                        e.stopPropagation()
                        let index = this.state.newDocuments.indexOf(file)
                        let newDocuments = this.state.newDocuments
                        newDocuments.splice(index, 1)
                        this.setState({newDocuments: newDocuments})
                      }}
                    />
                    <p>{file.name}</p>
                  </div>
                )
              })}
            </div>
            : <div className='sk-upload-additional-docs-file-drop-message'>
              Something missing? Drop any assignment/lab schedules that we don&apos;t have yet.
            </div>
          }
        </div>
      </DragAndDrop>
    )
  }

  renderSubmit () {
    let disabled = true
    if (this.state.newDocuments.length === 0) {
      disabled = true
    } else {
      disabled = false
    }

    return (
      <div
        className={'sk-upload-additional-docs-submit' + (disabled ? ' disabled' : '')}
        onClick={() => {
          if (disabled) {
            console.log('disabled')
          } else {
            this.onSubmit()
          }
        }}
      >
        <p>Submit</p>
      </div>
    )
  }

  renderNeedHelp () {
    return (
      <div
        className='sk-upload-additional-docs-help'
      >
        <p
          onClick={() => this.setState({showStudentRequestModal: true})}
        >
          Need help?
        </p>
        {this.state.showStudentRequestModal &&
          <StudentRequestModal
            open={true}
            onClose={() => {
              this.setState({showStudentRequestModal: false})
            }}
            cl={this.props.cl}
            onSuccess={() => {
              showSnackbar('Request for assistance submitted successfully.', 'success')
              this.setState({showStudentRequestModal: false})
            }}
            onError={() => this.setState({showStudentRequestModal: false})}
          />
        }
      </div>
    )
  }

  renderContent () {
    return (
      <div className='sk-upload-additional-docs-container'>
        <div className='sk-upload-additional-docs'>
          <h2>
            {this.state.isCompleteClass
              ? 'Documents'
              : 'Upload additional documents'
            }
          </h2>
          {this.renderDocs()}
          {!this.state.isCompleteClass && this.renderDragAndDrop()}
          {!this.state.isCompleteClass && this.renderSubmit()}
          {this.renderNeedHelp()}
        </div>
      </div>
    )
  }

  render () {
    return (
      this.state.loading
        ? <SkLoader />
        : this.renderContent()
    )
  }
}

UploadAdditionalDocuments.propTypes = {
  cl: PropTypes.object,
  onSubmit: PropTypes.function
}

export default UploadAdditionalDocuments
