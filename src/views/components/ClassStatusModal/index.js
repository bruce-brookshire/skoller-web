import React from 'react'
import SkProgressBar from '../SkProgressBar'
import PropTypes from 'prop-types'
import actions from '../../../actions'
import { inject, observer } from 'mobx-react'
import { browserHistory } from 'react-router'
import SkLoader from '../../../assets/sk-icons/SkLoader'
import DragAndDrop from '../DragAndDrop/DragAndDrop'
import {mobileCheck} from '../../../utilities/display'
import Sammi from '../Sammi'
import Checklist from './Checklist'
import SkModal from '../SkModal/SkModal'
import DropClassButton from '../DropClassButton'
import ToolTip from '../ToolTip'
import UploadAdditionalDocuments from './UploadAdditionalDocuments'
import ClassStatusImage from './ClassStatusImage'

@inject('rootStore') @observer
class ClassStatusModal extends React.Component {
  constructor (props) {
    super(props)

    let initState = this.getClass(this.props.cl)
    let status = initState.status
    let sammiMessage = initState.sammiMessage
    let mobileMessage = initState.mobileMessage
    let cl = initState.cl

    this.state = {
      cl: cl,
      fullClass: null,
      uploadingDoc: false,
      syllabus: null,
      additionalFiles: [],
      sammiMessage: sammiMessage,
      status: status,
      mobile: mobileCheck(),
      mobileMessage: mobileMessage,
      showDropClassConfirm: false,
      uploadAdditionalDocumentsView: false
    }
  }

  componentWillMount () {
    actions.classes.getClassById(this.props.cl.id)
      .then((r) => {
        this.setState({fullClass: r})
      })
      .catch(() => false)
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
      sammiMessage = `Someone already uploaded the syllabus, but we need a little help.`
      mobileMessage = `Head over to skoller.co on your computer to login and finish setting up your class.`
    } else if (id >= 1400) {
      status = 'live'
      sammiMessage = `WOOHOO! Your class is live ⚡️`
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

  renderChecklist () {
    return (
      !this.state.uploadAdditionalDocumentsView &&
      <div className='sk-class-status-modal-checklist-container'>
        <ClassStatusImage status={this.state.cl.status.id} />
      </div>
    )
  }

  renderInReview () {
    if (this.state.uploadAdditionalDocumentsView) {
      return (
        <div style={{marginBottom: '-2rem'}}>
          <UploadAdditionalDocuments
            cl={this.state.fullClass}
            onUpload={() => console.log('upload')}
            onSubmit={() => this.props.closeModal()}
          />
        </div>
      )
    } else {
      return (
        <div className='sk-class-status-modal-action-detail'>
          <div>Check back in a few short hours and we&apos;ll have your class all ready for you.</div>
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
                ? <div className='sk-class-status-modal-action-detail'>
                  <div>We weren&apos;t able to properly review your syllabus. Help us set up your class!</div>
                </div>
                : null
              }
              {this.state.status === 'live'
                // ? <div className='sk-class-status-modal-action-detail'>
                //   <h3>This class is already LIVE on Skoller!</h3>
                // </div>
                ? null
                : null
              }
            </div>
          }
        </div>
        {this.state.status === 'needSyllabus' && !mobileCheck()
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
    browserHistory.push({
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
      this.setState({
        loading: false,
        status: 'inReview',
        sammiMessage: `Woohoo! You've submitted your syllabus.`
      })
    } else if (this.state.status === 'inReview' || this.state.status === 'live') {
      this.props.onSubmit()
    } else if (this.state.status === 'diy') {
      this.sendToDiy()
    }
  }

  renderNextButton () {
    let buttonText
    buttonText = 'Done'
    if (this.state.status === 'needSyllabus') {
      buttonText = 'Submit'
    } else if (this.state.status === 'diy') {
      buttonText = `Let's DIY!`
    }
    if (!this.state.mobile || this.state.status === 'live' || this.state.status === 'inReview') {
      return (
        <div
          className={'onboard-next' + (
            (this.state.status === 'needSyllabus') && (this.state.syllabus === null)
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
    }
  }

  async onDropClass () {
    this.setState({showDropClassConfirm: true})
  }

  async onDropClassConfirm () {
    this.setState({loading: true})
    await actions.classes.dropClass(this.state.cl.id).catch(r => console.log(r))
    this.props.closeModal()
  }

  renderDropClassConfirm () {
    return (
      <SkModal>
        <div className='sk-class-status-modal-drop-modal'>
          <h3>Are you sure you want to drop this class?</h3>
          <div
            className='sk-class-status-modal-drop-modal-yes'
            onClick={() => this.onDropClassConfirm()}
          >
            <p>Yes, drop class.</p>
          </div>
          <div
            className='sk-class-status-modal-drop-modal-no'
            onClick={() => this.setState({showDropClassConfirm: false})}
          >
            <p>No, stay in this class.</p>
          </div>
        </div>
      </SkModal>
    )
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
        <h1>{this.state.cl.name}</h1>
        {this.renderSammi()}
        {this.renderProgress()}
      </div>
    )
  }

  renderSubControl () {
    return (
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: '0.5rem 0 -0.5rem 0'}}>
        {this.state.status === 'inReview' && !mobileCheck()
          ? <p
            style={{margin: '6px 0 0 0', textAlign: 'center', cursor: 'pointer'}}
            onClick={() => {
              this.sendToDiy()
            }}
          >
            <span style={{color: '#57B9E4'}}>Setup on your own</span>
          </p>
          : null
        }
        {this.state.status === 'needSyllabus' && !mobileCheck()
          ? <p
            style={{margin: '6px 0 0 0', textAlign: 'center', cursor: 'pointer'}}
            onClick={() => {
              this.sendToDiy()
            }}
          >
            <small>
              <span style={{color: '#57B9E4'}}>Setup on your own</span>
            </small>
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

  renderModalContent () {
    return (
      <div className='sk-class-status-modal'>
        <div className='sk-class-status-modal-drop-container'>
        </div>
        {this.renderHeader()}
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
  onSubmit: PropTypes.function,
  rootStore: PropTypes.object,
  disableNext: PropTypes.bool,
  cl: PropTypes.object,
  closeModal: PropTypes.function,
  progress: PropTypes.number
}

export default ClassStatusModal
