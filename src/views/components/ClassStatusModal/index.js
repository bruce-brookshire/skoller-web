import React from 'react'
import SkProgressBar from '../SkProgressBar'
import PropTypes from 'prop-types'
import actions from '../../../actions'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import SkLoader from '../../../assets/sk-icons/SkLoader'
import DragAndDrop from '../DragAndDrop/DragAndDrop'
import {mobileCheck} from '../../../utilities/display'
import Sammi from '../Sammi'
import SkModal from '../SkModal/SkModal'
import DropClassButton from '../DropClassButton'
import ToolTip from '../ToolTip'
import UploadAdditionalDocuments from './UploadAdditionalDocuments'
import ClassStatusImage from './ClassStatusImage'
import UploadOverloadDocuments from './UploadOverloadDocuments'
import AppStore from '../../../assets/images/app_download/app-store-badge.svg'
import GooglePlay from '../../../assets/images/app_download/google-play-badge.png'

@inject('rootStore') @observer
class ClassStatusModal extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      loading: true
    }

    this.init()
  }

  async init () {
    let cl
    await actions.classes.getClassById(this.props.cl.id)
      .then((r) => {
        cl = r
      })
      .catch((r) => console.log(r))
    this.setState({fullClass: cl})

    let initState = this.getClass(cl)
    let status = initState.status
    let sammiMessage = initState.sammiMessage
    let mobileMessage = initState.mobileMessage
    let documents = []

    await actions.documents.getClassDocuments(cl.id)
      .then(r => {
        documents = r
      })

    this.setState({
      cl: this.props.cl,
      fullClass: cl,
      uploadingDoc: false,
      syllabus: null,
      additionalFiles: [],
      sammiMessage: sammiMessage,
      status: status,
      mobile: mobileCheck(),
      mobileMessage: mobileMessage,
      showDropClassConfirm: false,
      uploadAdditionalDocumentsView: false,
      loading: false,
      classDocuments: documents,
      syllabusOverloadUploadDocs: false
    })
  }

  getClass (cl) {
    let status
    let sammiMessage
    let mobileMessage
    let id = cl.status.id
    if (id === 1100) {
      status = 'needSyllabus'
      sammiMessage = <p>It&apos;s time to <b>send your syllabus!</b></p>
      mobileMessage = `Head over to skoller.co on your computer to login and upload your syllabus.`
    } else if (id === 1200) {
      status = 'inReview'
      sammiMessage = <p>Your syllabus is <b>IN REVIEW!</b></p>
    } else if (id === 1300) {
      status = 'diy'
      sammiMessage = <p>The document(s) submitted <b>don&apos;t have the info we need for setup!</b></p>
      mobileMessage = `Head over to skoller.co on your computer to login and finish setting up your class.`
    } else if (id >= 1400) {
      status = 'live'
      sammiMessage = `WOOHOO! Your class is live ⚡️`
    }
    if (cl.school.is_syllabus_overload && id < 1400 && id !== 1100) {
      status = 'syllabusOverload'
      sammiMessage = <p>Due to high volume, it could take me <b>a few days</b> to set up this class.</p>
    }
    return ({
      cl: cl,
      status: status,
      sammiMessage: sammiMessage,
      mobileMessage: mobileMessage,
      loading: false
    })
  }

  renderSyllabusToolTip () {
    return (
      <div className='sk-class-status-modal-file-drop-tip'>
        <div>Be sure to submit the</div>
        <ToolTip
          tip={
            <div>
              <h3>Here&apos;s what Skoller looks for on the documents you submit...</h3>
              <ol>
                <li>
                  <h3>Grade Weights</h3>
                  <p>(Exams = 60% of final grade)</p>
                </li>
                <li>
                  <h3>Tentative Assignment Schedule</h3>
                  <p>(Exam 1 due August 19th)</p>
                </li>
              </ol>
            </div>
          }
        >
          <div className='sk-class-status-modal-file-drop-tip-text'>correct documents.</div>
        </ToolTip>
      </div>
    )
  }

  renderNeedSyllabus () {
    if (!this.state.mobile) {
      return (
        <div className='sk-class-status-modal-file-drop-container'>
          <DragAndDrop
            disabled={(this.state.syllabus !== null)}
            handleDrop={(file) => { this.setState({syllabus: file}) }}
          >
            {this.state.syllabus
              ? <div className='sk-class-status-modal-file-drop-files'>
                <div className='sk-class-status-modal-file-drop-file'>
                  <i
                    className='far fa-times-circle'
                    onClick={(e) => {
                      e.stopPropagation()
                      this.setState({syllabus: null})
                    }}
                  />
                  <p>{this.state.syllabus[0].name}</p>
                </div>
              </div>
              : <div className='sk-class-status-modal-file-drop-message'>Drop your syllabus here!</div>
            }
          </DragAndDrop>
          <DragAndDrop
            handleDrop={(file) => {
              let additionalFiles = this.state.additionalFiles
              additionalFiles.push(file[0])
              this.setState({additionalFiles: additionalFiles})
            }}
          >
            {this.state.additionalFiles.length > 0
              ? <div className='sk-class-status-modal-file-drop-files'>
                {this.state.additionalFiles.map(file => {
                  return (
                    <div key={file.name} className='sk-class-status-modal-file-drop-file'>
                      <i
                        className='far fa-times-circle'
                        onClick={(e) => {
                          e.stopPropagation()
                          let index = this.state.additionalFiles.indexOf(file)
                          let additionalFiles = this.state.additionalFiles
                          additionalFiles.splice(index, 1)
                          this.setState({additionalFiles: additionalFiles})
                        }}
                      />
                      <p>{file.name}</p>
                    </div>
                  )
                })}
              </div>
              : <div className='sk-class-status-modal-file-drop-message'>
                Drop any separate assignment/lab schedules here
              </div>
            }
          </DragAndDrop>
        </div>
      )
    }
  }

  getMobileOperatingSystem () {
    let userAgent = navigator.userAgent || navigator.vendor || window.opera

    // Windows Phone must come first because its UA also contains "Android"
    if (/android/i.test(userAgent)) {
      return 'Android'
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return 'iOS'
    } else {
      return false
    }
  }

  renderDownloadCompleteDownload () {
    const operatingSystem = this.getMobileOperatingSystem()
    if (this.getMobileOperatingSystem()) {
      return (
        <div style={{textAlign: 'center'}}>
          <div>Skoller works best on the app.</div>
          <div className='sk-enroll-download-badge'>
            {operatingSystem === 'Android' &&
              <a
                href='http://play.google.com/store/apps/details?id=com.skoller'
              >
                <img style={{maxWidth: '160px'}} src={GooglePlay} />
              </a>
            }
            {operatingSystem === 'iOS' &&
              <a
                href='http://appstore.com/skoller'
              >
                <img style={{maxWidth: '160px'}} src={AppStore} />
              </a>
            }
          </div>
        </div>
      )
    }
  }

  renderChecklist () {
    return (
      !this.state.uploadAdditionalDocumentsView &&
      <div className='sk-class-status-modal-checklist-container'>
        <ClassStatusImage status={(this.state.fullClass.school.is_syllabus_overload && this.state.fullClass.status.id < 1400) ? 1500 : this.state.cl.status.id} />
        {this.state.status === 'live' &&
          this.renderDownloadCompleteDownload()
        }
      </div>
    )
  }

  renderInReview () {
    if (this.state.uploadAdditionalDocumentsView) {
      return (
        <div style={{marginBottom: '-2rem'}}>
          <UploadAdditionalDocuments
            cl={this.state.fullClass}
            onUpload={() => null}
            onSubmit={() => this.props.closeModal()}
          />
        </div>
      )
    } else {
      return (
        <div className='sk-class-status-modal-action-detail'>
          <h2>Check back soon to find this class already set up for you.</h2>
          <div
            onClick={() => {
              this.setState({
                uploadAdditionalDocumentsView: true
              })
            }}
            style={{
              color: '#57B9E4',
              cursor: 'pointer'
            }}
          >
            📄Upload additional documents.
          </div>
        </div>
      )
    }
  }

  renderDIYAction () {
    if (!this.state.mobile) {
      return (
        <div className='sk-class-status-modal-file-drop-container' style={{height: '480px', overflow: 'auto', maxHeight: '480px'}}>
          <div
            style={{
              border: '1px solid #4a4a4a',
              borderRadius: '5px',
              padding: '1rem',
              marginBottom: '1rem'
            }}
          >
            <div className='sk-class-status-modal-file-drop-files'>
              These are the documents that were not helpful:
              {this.state.classDocuments.map(doc => {
                return (
                  <div className='sk-class-status-modal-file-drop-file' key={this.state.classDocuments.indexOf(doc)}>
                    <p style={{textAlign: 'center'}}>{doc.name}</p>
                  </div>
                )
              })}
            </div>
          </div>
          <DragAndDrop
            handleDrop={(file) => {
              let additionalFiles = this.state.additionalFiles
              additionalFiles.push(file[0])
              this.setState({additionalFiles: additionalFiles})
            }}
          >
            {this.state.additionalFiles.length > 0
              ? <div className='sk-class-status-modal-file-drop-files'>
                {this.state.additionalFiles.map(file => {
                  return (
                    <div key={file.name} className='sk-class-status-modal-file-drop-file'>
                      <i
                        className='far fa-times-circle'
                        onClick={(e) => {
                          e.stopPropagation()
                          let index = this.state.additionalFiles.indexOf(file)
                          let additionalFiles = this.state.additionalFiles
                          additionalFiles.splice(index, 1)
                          this.setState({additionalFiles: additionalFiles})
                        }}
                      />
                      <p>{file.name}</p>
                    </div>
                  )
                })}
              </div>
              : <div className='sk-class-status-modal-file-drop-message'>
                Drop the correct documents for the class
              </div>
            }
          </DragAndDrop>
        </div>
      )
    }
  }

  renderClass () {
    return (
      <div className='sk-class-status-modal-container'>
        <div className='sk-class-status-modal-row'>
          {this.renderChecklist()}
          {(this.state.status === 'needSyllabus' && this.state.mobile) || this.props.cl.status.id === 1400
            ? null
            : <div className='sk-class-status-modal-action-container'>
              {this.state.status === 'needSyllabus'
                ? this.renderNeedSyllabus()
                : null
              }
              {this.state.status === 'inReview'
                ? this.renderInReview()
                : null
              }
              {this.state.status === 'diy'
                ? <div className='sk-class-status-modal-action-detail' style={{height: 'auto', maxHeight: '300px'}}>
                  {this.renderDIYAction()}
                </div>
                : null
              }
              {this.state.status === 'syllabusOverload'
                ? <div className='sk-class-status-modal-action-detail'>
                  <h2 style={{margin: '0'}}>We recommend you use the DIY tool to set up your class instantly!</h2>
                  <p onClick={() => this.setState({syllabusOverloadUploadDocs: !this.state.syllabusOverloadUploadDocs})} style={{margin: '0', cursor: 'pointer', color: '#57B9E4'}}>Upload class documents</p>
                  <p style={{margin: '0'}}><small>Less than 10 minutes</small></p>
                </div>
                : null
              }
              {this.state.status === 'live'
                ? null
                : null
              }
            </div>
          }
        </div>
        {(this.state.status === 'needSyllabus' || this.state.status === 'diy') && !mobileCheck()
          ? this.renderSyllabusToolTip()
          : null
        }
      </div>
    )
  }

  renderMobileMessage () {
    return (
      <div className='sk-class-status-modal-container'>
        <div
          className='sk-class-status-modal-row'
          style={{
            marginBottom: '0px'
          }}
        >
          <p className='sk-class-status-modal-mobile-message'>{this.state.mobileMessage}</p>
        </div>
      </div>
    )
  }

  sendToDiy () {
    this.props.history.push({
      pathname: `/class/${this.state.cl.id}/syllabus_tool/`,
      state: {
        isDIY: true
      }
    })
  }

  async handleSubmit () {
    if (this.state.status === 'needSyllabus' && this.state.syllabus) {
      this.setState({loading: true})
      await actions.documents.uploadClassDocument(this.state.cl, this.state.syllabus[0], true)
      if (this.state.additionalFiles) {
        await this.state.additionalFiles.forEach(file => {
          actions.documents.uploadClassDocument(this.state.cl, file, false)
        })
      }
      this.setState(
        this.state.fullClass.school.is_syllabus_overload
          ? {
            loading: false,
            status: 'syllabusOverload',
            sammiMessage: <p>Due to high volume, it could take me <b>a few days</b> to set up this class.</p>
          }
          : {
            loading: false,
            status: 'inReview',
            sammiMessage: `Woohoo! You've submitted your syllabus.`
          }
      )
    } else if (this.state.status === 'live') {
      this.props.onSubmit()
    } else if (this.state.status === 'inReview' || this.state.status === 'syllabusOverload') {
      this.sendToDiy()
    } else if (this.state.status === 'diy') {
      this.setState({loading: true})
      await this.state.additionalFiles.forEach(file => {
        actions.documents.uploadClassDocument(this.state.cl, file, true)
          .then(() => {
            if (this.state.additionalFiles.indexOf(file) === this.state.additionalFiles.length - 1) {
              this.setState({
                loading: false,
                status: 'inReview',
                sammiMessage: `Woohoo! You've submitted your class documents.`
              })
            }
          })
      })
    }
  }

  renderNextButton () {
    let buttonText
    buttonText = 'Done'
    if (this.state.status === 'needSyllabus' || this.state.status === 'diy') {
      buttonText = 'Submit'
    } else if (this.state.status === 'syllabusOverload') {
      buttonText = `Use the DIY tool`
    }
    if ((!this.state.mobile || this.state.status === 'live') && this.state.status !== 'inReview') {
      return (
        <div
          className={'onboard-next' + (
            ((this.state.status === 'needSyllabus') && (this.state.syllabus === null)) ||
            (this.state.status === 'diy' && this.state.additionalFiles.length === 0)
              ? ' disabled'
              : ''
          )}
          onClick={() => this.handleSubmit()}
        >
          <p>
            {buttonText}
          </p>
        </div>
      )
    } else if (this.state.status === 'inReview' || this.state.status === 'syllabusOverload') {
      return (
        <div>
          <p style={{margin: '0', textAlign: 'center'}}>Don&apos;t want to wait?</p>
          <div
            className={'onboard-next' + (
              (this.state.status === 'needSyllabus') && (this.state.syllabus === null)
                ? ' disabled'
                : ''
            )}
            onClick={() => this.handleSubmit()}
          >
            <p>
              Use the DIY tool
            </p>
          </div>
        </div>
      )
    }
  }

  async onDropClass () {
    this.setState({showDropClassConfirm: true})
  }

  renderControl () {
    if (this.state.uploadAdditionalDocumentsView) {
      return null
    } else {
      return (
        <div>
          {!this.props.disableNext && this.renderNextButton()}
        </div>
      )
    }
  }

  renderSammi () {
    if (!this.state.uploadAdditionalDocumentsView) {
      if (this.props.cl.status.id !== 1400) {
        return (
          <Sammi
            message={this.state.sammiMessage}
            position='right'
            emotion='happy'
          />
        )
      }
    }
  }

  renderProgress () {
    if (this.props.progress) {
      return (
        <SkProgressBar progress={this.props.progress} width={'100%'} backgroundColor={'$cn-color-blue'}/>
      )
    } else {
      return null
    }
  }

  renderHeader () {
    return (
      <div className='sk-class-status-modal-header'>
        <h1>{(this.props.onboard || this.props.firstOpen) ? 'Welcome to ' : ''}{this.state.cl.name}</h1>
        {this.renderSammi()}
        {this.renderProgress()}
      </div>
    )
  }

  renderSubControl () {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: !(this.state.status === 'needSyllabus' || this.state.status === 'diy') && this.props.closeModal ? 'flex-end' : 'space-between',
        margin: '0.5rem 0 -0.5rem 0'
      }}>
        {this.state.status === 'inReview' && !mobileCheck() && this.props.onboard
          ? <p
            style={{margin: '6px 0 0 0', textAlign: 'center', cursor: 'pointer'}}
            onClick={() => {
              this.props.onSubmit()
            }}
          >
            <span style={{color: '#57B9E4'}}>Continue to Skoller</span>
          </p>
          : null
        }
        {(this.state.status === 'needSyllabus' || this.state.status === 'diy') && !mobileCheck()
          ? <p
            style={{margin: '6px 0 0 0', textAlign: 'center', cursor: 'pointer'}}
            onClick={() => {
              this.sendToDiy()
            }}
          >
            <span style={{color: '#57B9E4'}}>Setup without the syllabus</span>
          </p>
          : null
        }
        {this.props.closeModal &&
          <div style={{textAlign: 'right'}}>
            <DropClassButton onDropClass={() => this.props.closeModal()} cl={this.state.cl} />
          </div>
        }
      </div>
    )
  }

  renderStatusContent () {
    return (
      <div>
        {this.renderClass()}
        {this.state.mobile && this.state.mobileMessage
          ? this.renderMobileMessage()
          : null
        }
        {this.renderControl()}
        {this.renderSubControl()}
      </div>
    )
  }

  renderModalContent () {
    return (
      <div className='sk-class-status-modal'>
        {this.renderHeader()}
        {this.state.status === 'syllabusOverload' && !this.state.mobile && this.state.syllabusOverloadUploadDocs
          ? <UploadOverloadDocuments
            cl={this.state.fullClass}
            onUpload={() => null}
            onSubmit={() => this.props.closeModal()}
            onBack={() => this.setState({syllabusOverloadUploadDocs: false})}
          />
          : this.renderStatusContent()
        }
      </div>
    )
  }

  render () {
    return (
      <SkModal closeModal={this.props.closeModal ? () => this.props.closeModal() : null}>
        {this.state.loading
          ? <SkLoader />
          : this.renderModalContent()
        }
      </SkModal>
    )
  }
}

ClassStatusModal.propTypes = {
  onSubmit: PropTypes.func,
  rootStore: PropTypes.object,
  disableNext: PropTypes.bool,
  cl: PropTypes.object,
  closeModal: PropTypes.func,
  progress: PropTypes.number,
  onboard: PropTypes.bool,
  firstOpen: PropTypes.bool,
  history: PropTypes.object
}

export default withRouter(ClassStatusModal)
