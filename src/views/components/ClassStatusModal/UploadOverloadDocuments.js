import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import actions from '../../../actions'
import DragAndDrop from '../DragAndDrop/DragAndDrop'
import SkLoader from '../../../assets/sk-icons/SkLoader'
import {showSnackbar} from '../../../utilities/snackbar'
import StudentRequestModal from '../../Student/ClassDetail/StudentRequestModal'
import BackArrow from '../../../assets/sk-icons/navigation/BackArrow';

@inject('rootStore') @observer
class UploadOverloadDocuments extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      loading: true,
      documents: [],
      newDocuments: [],
      newSyllabus: null,
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
    }
    if (this.state.newSyllabus) {
      await actions.documents.uploadClassDocument(this.props.cl, this.state.newSyllabus, true)
      showSnackbar('Successfully uploaded ' + (this.state.newDocuments.length + (this.state.newSyllabus ? 1 : 0)).toString() + ' document' + ((this.state.newDocuments.length + (this.state.newSyllabus ? 1 : 0)) > 1 ? 's' : '') + '.', 'success')
    }
    this.props.onSubmit()
  }

  renderDocs () {
    return (
      <div className='sk-upload-overload-docs-previous-container'>
        <p>Here&apos;s what we have so far:</p>
        <div className='sk-upload-overload-docs-previous'>
          <div className='sk-upload-overload-docs-previous-item'>
            <h3>Syllabus</h3>
            {this.state.syllabus
              ? <a href={this.state.syllabus.path} target='_blank' rel='noopener noreferrer'>{this.state.syllabus.name}</a>
              : <p>No syllabus was uploaded.</p>
            }
          </div>
          <div className='sk-upload-overload-docs-previous-item'>
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

  renderAdditionalFilesDragAndDrop () {
    return (
      <DragAndDrop
        handleDrop={(file) => {
          let newDocuments = this.state.newDocuments
          newDocuments.push(file[0])
          this.setState({newDocuments: newDocuments})
        }}
      >
        <div className='sk-upload-overload-docs-file-drop'>
          {this.state.newDocuments.length > 0
            ? <div className='sk-upload-overload-docs-file-drop-files'>
              {this.state.newDocuments.map(file => {
                return (
                  <div key={file.name} className='sk-upload-overload-docs-file-drop-file'>
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
            : <div className='sk-upload-overload-docs-file-drop-message'>
              Drop any assignment/lab schedules that we don&apos;t have yet.
            </div>
          }
        </div>
      </DragAndDrop>
    )
  }

  renderSyllabusDragAndDrop () {
    return (
      <DragAndDrop
        handleDrop={(file) => {
          this.setState({newSyllabus: file[0]})
        }}
        className='margin-right'
      >
        <div className='sk-upload-overload-docs-file-drop'>
          {this.state.newSyllabus
            ? <div className='sk-upload-overload-docs-file-drop-files'>
              <div className='sk-upload-overload-docs-file-drop-file'>
                <i
                  className='far fa-times-circle'
                  onClick={(e) => {
                    e.stopPropagation()
                    this.setState({newSyllabus: null})
                  }}
                />
                <p>{this.state.newSyllabus.name}</p>
              </div>
            </div>
            : <div className='sk-upload-overload-docs-file-drop-message'>
              Drop a {this.state.syllabus ? 'different ' : ' '}syllabus here.
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
        className={'sk-upload-overload-docs-submit' + (disabled ? ' disabled' : '')}
        onClick={() => {
          if (disabled) {
            return null
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
        className='sk-upload-overload-docs-help'
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
            onError={() => this.setState({showStudentRequestModal: !this.state.showStudentRequestModal})}
          />
        }
      </div>
    )
  }

  renderContent () {
    return (
      <div className='sk-upload-overload-docs-container'>
        <div className='sk-upload-overload-docs'>
          <h2>
            {'Upload documents'}
          </h2>
          <p onClick={() => this.props.onBack()} style={{margin: '-24px 0 0 0', width: '64px', color: '#57B9E4', cursor: 'pointer'}}><BackArrow /> Back</p>
          {this.renderDocs()}
          <div className='sk-upload-overload-docs-row'>
            {!this.state.isCompleteClass && this.renderSyllabusDragAndDrop()}
            {!this.state.isCompleteClass && this.renderAdditionalFilesDragAndDrop()}
          </div>
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

UploadOverloadDocuments.propTypes = {
  cl: PropTypes.object,
  onSubmit: PropTypes.function,
  onBack: PropTypes.function
}

export default UploadOverloadDocuments
