import React from 'react'
import SkProgressBar from '../../../components/SkProgressBar'
import PropTypes from 'prop-types'
import actions from '../../../../actions'
import { inject, observer } from 'mobx-react'
import { browserHistory } from 'react-router'
import SkLoader from '../../../../assets/sk-icons/SkLoader'
import DragAndDrop from '../DragAndDrop'
import {mobileCheck} from '../../../../utilities/display'
import Sammi from '../../../components/Sammi'
import Checklist from './Checklist'

@inject('rootStore') @observer
class FirstClass extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      loading: true,
      firstClass: null,
      uploadingDoc: false,
      syllabus: null,
      additionalFiles: [],
      sammiMessage: null,
      status: null,
      mobile: false,
      mobileMessage: null
    }

    this.getFirstClass()
  }

  getFirstClass () {
    this.setState({loading: true})
    actions.classes.getStudentClassesById(this.props.rootStore.userStore.user.student.id).then((classes) => {
      if (mobileCheck()) {
        this.setState({mobile: true})
      }
      if (classes.length > 1) {
        browserHistory.push('/student')
      } else {
        let cl = classes[0]
        let status
        let sammiMessage
        let mobileMessage
        let id = cl.status.id
        // let id = 1100
        // ^ for testing
        if (id === 1100) {
          status = 'needSyllabus'
          sammiMessage = `Let's get your first class set up!`
          mobileMessage = `Head over to skoller.co on your computer to upload your syllabus.`
        } else if (id === 1200) {
          status = 'inReview'
          sammiMessage = `Someone already uploaded the syllabus!`
        } else if (id === 1300) {
          status = 'diy'
          sammiMessage = `Someone already uploaded the syllabus, but we need a little help.`
          mobileMessage = `Head over to skoller.co on your computer to finish setting up your class.`
        } else if (id >= 1400) {
          status = 'live'
          sammiMessage = `WOOHOO! Your class is live ⚡️`
        }
        this.setState({
          firstClass: cl,
          status: status,
          sammiMessage: sammiMessage,
          mobileMessage: mobileMessage,
          loading: false
        })
      }
    })
  }

  renderNeedSyllabus () {
    if (!this.state.mobile) {
      return (
        <div className='sk-onboard-first-class-file-drop-container'>
          <DragAndDrop
            disabled={(this.state.syllabus !== null)}
            handleDrop={(file) => { this.setState({syllabus: file}) }}
          >
            {this.state.syllabus
              ? <div className='sk-onboard-first-class-file-drop-files'>
                <div className='sk-onboard-first-class-file-drop-file'>
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
              : <div className='sk-onboard-first-class-file-drop-message'>Drop your syllabus here!</div>
            }
          </DragAndDrop>
          <DragAndDrop
            handleDrop={(file) => {
              let additionalFiles = this.state.additionalFiles
              additionalFiles.push(file[0])
              console.log(additionalFiles)
              this.setState({additionalFiles: additionalFiles})
            }}
          >
            {this.state.additionalFiles.length > 0
              ? <div className='sk-onboard-first-class-file-drop-files'>
                {this.state.additionalFiles.map(file => {
                  return (
                    <div key={file.name} className='sk-onboard-first-class-file-drop-file'>
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
              : <div className='sk-onboard-first-class-file-drop-message'>
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
      <div className='sk-onboard-first-class-checklist-container'>
        <Checklist status={this.state.status} cl={this.state.firstClass} />
      </div>
    )
  }

  renderFirstClass () {
    return (
      <div className='sk-onboard-first-class-container'>
        <div className='sk-onboard-first-class-row'>
          {this.renderChecklist()}
          {this.state.status === 'needSyllabus' && this.state.mobile
            ? null
            : <div className='sk-onboard-first-class-action-container'>
              {this.state.status === 'needSyllabus'
                ? this.renderNeedSyllabus()
                : null
              }
              {this.state.status === 'inReview'
                ? <div className='sk-onboard-first-class-action-detail'>
                  <div>Check back in a few short hours and we&apos;ll have your class all ready for you.</div>
                </div>
                : null
              }
              {this.state.status === 'diy'
                ? <div className='sk-onboard-first-class-action-detail'>
                  <div>We weren&apos;t able to properly review your syllabus. Help us set up your class!</div>
                </div>
                : null
              }
              {this.state.status === 'live'
                ? <div className='sk-onboard-first-class-action-detail'>
                  <h3>This class is already LIVE on Skoller!</h3>
                </div>
                : null
              }
            </div>
          }
        </div>
      </div>
    )
  }

  renderMobileMessage () {
    return (
      <div className='sk-onboard-first-class-container'>
        <div
          className='sk-onboard-first-class-row'
          style={{
            marginBottom: '0px'
          }}
        >
          <p className='sk-onboard-first-class-mobile-message'>{this.state.mobileMessage}</p>
        </div>
      </div>
    )
  }

  sendToDiy () {
    browserHistory.push({
      pathname: `/class/${this.state.firstClass.id}/syllabus_tool/`,
      state: {
        isDIY: true
      }
    })
  }

  async handleSubmit () {
    if (this.state.status === 'needSyllabus' && this.state.syllabus) {
      this.setState({loading: true})
      await actions.documents.uploadClassDocument(this.state.firstClass, this.state.syllabus[0], true)
      if (this.state.additionalFiles) {
        await this.state.additionalFiles.forEach(file => {
          console.log(file)
          actions.documents.uploadClassDocument(this.state.firstClass, file, false)
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
      console.log('TODO: this should send you to syllabus tool')
      this.sendToDiy()
    }
  }

  renderNextButton () {
    let buttonText
    if (this.props.partner) {
      buttonText = 'Next'
    } else {
      buttonText = 'Enter Skoller 👉'
    }
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

  renderModalContent () {
    return (
      <div>
        {this.props.renderPartner ? this.props.renderPartner() : null}
        <div className='onboard-first-class'>
          <h1>{this.state.firstClass.name}</h1>
          <Sammi
            message={this.state.sammiMessage}
            position='right'
            emotion='happy'
          />
          <SkProgressBar progress={0.75} width={'100%'} backgroundColor={'$cn-color-blue'}/>
        </div>
        {this.renderFirstClass()}
        {this.state.mobile && this.state.mobileMessage
          ? this.renderMobileMessage()
          : null
        }
        {!this.props.disableNext && this.renderNextButton()}
        {this.state.status === 'diy' &&
          <div
            className='sk-onboard-alt'
            onClick={() => browserHistory.push('/student')}
          >
            Not the right time? Enter Skoller instead.
          </div>
        }
        {this.state.status === 'inReview' && !mobileCheck()
          ? <p
            style={{margin: '6px 0 0 0', textAlign: 'center', cursor: 'pointer'}}
            onClick={() => {
              this.sendToDiy()
            }}
          >
            <small>
              Don&apos;t want to wait? <span style={{color: '#57B9E4'}}>Click here to do it yourself!</span>
            </small>
          </p>
          : null
        }
      </div>
    )
  }

  render () {
    return (
      <div>
        {this.state.loading
          ? <SkLoader />
          : this.renderModalContent()
        }
      </div>
    )
  }
}

FirstClass.propTypes = {
  onSubmit: PropTypes.func,
  rootStore: PropTypes.object,
  renderPartner: PropTypes.func,
  partner: PropTypes.object,
  disableNext: PropTypes.bool
}

export default FirstClass
