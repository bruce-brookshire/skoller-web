import React from 'react'
import SkProgressBar from '../../components/SkProgressBar'
import PropTypes from 'prop-types'
import actions from '../../../actions'
import { inject, observer } from 'mobx-react'
import { browserHistory } from 'react-router'
import SkLoader from '../../../assets/sk-icons/SkLoader'
import DragAndDrop from './DragAndDrop'
import {mobileCheck} from '../../../utilities/display'

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
          sammiMessage = `Yay! You're in your first class. Let's get it set up!`
          mobileMessage = `Head over to skoller.co on your computer to upload your syllabus.`
        } else if (id === 1200) {
          status = 'inReview'
          sammiMessage = `Someone has already uploaded the syllabus for this class!`
        } else if (id === 1300) {
          status = 'diy'
          sammiMessage = `Someone already submitted the syllabus for this class, but we need a little help.`
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

  renderInfo () {
    if (this.state.status === 'inReview') {
      return (
        <div className='sk-onboard-first-class-info'>
          <div className='sk-onboard-first-class-info-status'>
            <i className='far fa-clock fa-3x' />
            <h3>SYLLABUS UNDER REVIEW</h3>
          </div>
        </div>
      )
    } else if (this.state.status === 'diy') {
      return (
        <div className='sk-onboard-first-class-info'>
          <div className='sk-onboard-first-class-info-status'>
            <i className='fas fa-exclamation-circle fa-3x orange' />
            <h3>DIY REQUIRED</h3>
          </div>
        </div>
      )
    } else if (this.state.status === 'needSyllabus') {
      return (
        <div className='sk-onboard-first-class-info'>
          <div className='sk-onboard-first-class-info-item'>
            <i className='far fa-check-circle checked' />
            <p>Join class</p>
          </div>
          <div className='sk-onboard-first-class-info-item'>
            <i className={'far ' + ((this.state.status === 'needSyllabus') ? 'fa-circle' : 'fa-check-circle checked')} />
            <p>Send syllabus</p>
          </div>
          <div className='sk-onboard-first-class-info-item'>
            <i className='far fa-circle' />
            <p>Unlock community features<br />
              <i className='fas fa-user-check checked' /><small>+</small> <i className='fas fa-user' />
              <i className='fas fa-user' />
              <i className='fas fa-user' /><small>→</small> <i className='fas fa-unlock yellow' />
              <small>get 3 classmates to join!</small>
            </p>
          </div>
        </div>
      )
    } else if (this.state.status === 'live') {
      return (
        <div className='sk-onboard-first-class-info'>
          <div className='sk-onboard-first-class-info-item'>
            <i className='far fa-check-circle checked' />
            <p>Join class</p>
          </div>
          <div className='sk-onboard-first-class-info-item'>
            <i className='far fa-check-circle checked' />
            <p>Send syllabus</p>
          </div>
          <div className='sk-onboard-first-class-info-item'>
            <i className='far fa-circle' />
            <p>Unlock community features<br />
              <i className='fas fa-user-check checked' /><small>+</small> <i className='fas fa-user' />
              <i className='fas fa-user' />
              <i className='fas fa-user' /><small>→</small> <i className='fas fa-unlock yellow' />
              <small>get 3 classmates to join!</small>
            </p>
          </div>
        </div>
      )
    }
  }

  renderFirstClass () {
    return (
      <div className='sk-onboard-first-class-container'>
        <div className='sk-onboard-first-class-row'>
          <div className='sk-onboard-first-class-info-container'>
            {this.renderInfo()}
          </div>
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
        sammiMessage: `WOOHOO! You've submitted your syllabus.`
      })
    } else if (this.state.status === 'inReview' || this.state.status === 'live') {
      this.props.onSubmit()
    } else if (this.state.status === 'diy') {
      console.log(`let's DIY`)
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
        <SkProgressBar progress={0.75} width={'100%'} backgroundColor={'$cn-color-blue'}/>
        <div className='onboard-first-class'>
          <h1>{this.state.firstClass.name}</h1>
          <div className="onboard-first-class-sammi-container">
            <div className="sammi-message">
              <p>{this.state.sammiMessage}</p>
            </div>
            <img src='/src/assets/images/sammi/Smile@3x.png' />
          </div>
        </div>
        {this.renderFirstClass()}
        {this.state.mobile && this.state.mobileMessage
          ? this.renderMobileMessage()
          : null
        }
        {this.renderNextButton()}
        {this.props.renderPartner()}
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
  partner: PropTypes.object
}

export default FirstClass
