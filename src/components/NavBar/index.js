import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import ClassInfo from './ClassInfo'
import { withRouter } from 'react-router-dom'
import JobsSwitch from './JobsSwitch'
import actions from '../../actions'
import UserIcon from '../../assets/images/icons/user.svg'
import ReactTooltip from 'react-tooltip'
import overridePosition from './over'
import { formatDate } from '../../utilities/time'
import SkModal from '../../views/components/SkModal/SkModal'
import LifeTimeUserModal from '../../views/Student/components/LifeTimeUserModal'
import PopUp from '../../views/Student/Home/PopUp'
import { Cookies } from 'react-cookie'

@inject('rootStore') @observer
class NavBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      subscribed: false,
      subscriptionCancelled: false,
      showMyAccount: false,
      popUp: { show: false, type: null }
    }
    this.cookie = new Cookies()
  }

  getName () {
    const { userStore: { user } } = this.props.rootStore
    if (user.student) {
      return `${user.student.name_first} ${user.student.name_last}`
    } else {
      return user.email
    }
  }

  getDescription () {
    const { userStore: { user } } = this.props.rootStore
    const admin = this.props.rootStore.userStore.isAdmin()
    if (user.student) {
      return 'Student'
    } else if (admin) {
      return 'Admin'
    } else {
      return 'Syllabi Worker'
    }
  }
  componentDidMount () {
    actions.stripe.getMySubscription()
      .then((data) => {
        console.log(data.data, 'DATA DATA DATA')
        if (data.data != null) {
          this.setState({ subscribed: this.isSubscribed(data.data) })
          this.setState({ subscriptionCancelled: this.setCancellationStatus(data.data) })
          this.props.rootStore.userStore.setMySubscription(data.data)
          this.props.rootStore.userStore.setSubscriptionCreatedDate(data.data.created)
          this.props.rootStore.userStore.setInterval(data.data.interval)
        }
      })
      .catch((e) => {
        console.log(e)
      })
  }

  setCancellationStatus ({expirationIntent, cancelAt}) {
    if (expirationIntent == null && cancelAt == null) {
      return false
    }

    if (expirationIntent != null) {
      return true
    }

    return false
  }

  isSubscribed ({ expirationIntent, cancelAt }) {
    if (expirationIntent == null && cancelAt == null) {
      return true
    }

    if (expirationIntent != null && cancelAt != null && cancelAt < Date.now()) {
      return true
    }

    return false
  }

  getInitials () {
    const { userStore: { user } } = this.props.rootStore
    const admin = this.props.rootStore.userStore.isAdmin()
    if (user.student) {
      if (user.student.name_first && user.student.name_last) {
        return user.student.name_first[0].toUpperCase() + user.student.name_last[0].toUpperCase()
      } else if (user.student.name_first.length >= 2) {
        return user.student.name_first.substring(0, 2).toUpperCase()
      } else {
        return 'ST'
      }
    } else if (admin) {
      return 'AD'
    } else {
      return 'SW'
    }
  }

  getMonthAndYearInDays (val) {
    if (val === 'week') return 7
    if (val === 'month') return 30
    else if (val === 'year') return 365
    return 0
  }

  getIntervalDate () {
    let endDate = new Date()
    const interval = this.props.rootStore.userStore.interval
    let newDate = new Date(this.props.rootStore.userStore.subscriptionStartedDate * 1000)

    endDate.setDate(newDate.getDate() + this.getMonthAndYearInDays(interval))

    return endDate
  }

  renderMyAccountDetails () {
    if (!this.props.rootStore.userStore.user.lifetime_trial &&
      !this.props.rootStore.userStore.user.lifetime_subscription &&
      !this.props.rootStore.userStore.user.trial && this.state.subscribed) {
      return (
        <div className="sk-pop-up-container">
          <SkModal claseModal={() => this.setState({showMyAccount: false})} style={{width: '408px'}}>
            <div className="home-container" style={{width: '100%', padding: 0}}>
              {this.renderSubscriptionContent()}
            </div>
          </SkModal>
        </div>
      )
    }
    // return (
    //   <div className='sk-pop-up-container'>
    //     <SkModal closeModal={() => this.setState({showMyAccount: false})} style={{width: '408px'}}>
    //       <div className='home-container' style={{width: '100%', padding: 0}}>
    //         {
    //           !this.props.rootStore.userStore.user.lifetime_trial && !this.props.rootStore.userStore.user.lifetime_subscription && this.props.rootStore.userStore.user.trial &&
    //           <div className="home-column">

    //             <div className="home-shadow-box" style={{boxShadow: 'none', margin: 0}}>
    //               <div className="home-shadow-box__expiresin-container" style={{padding: 0}}>
    //                 <div className="home-shadow-box__expiresin-title">
    //                   <img alt="Skoller" className='logo' src='/src/assets/images/sammi/Smile.png' height="60" />
    //                   <h1>Your free trial expires in {Math.ceil(+this.props.rootStore.userStore.user.trial_days_left)} days</h1>
    //                 </div>
    //                 <div style={{display: 'flex', flexDirection: 'column'}}>
    //                   <button className="btn btn-primary" style={{marginBottom: '10px'}}
    //                     onClick={() => {
    //                       this.setState({showMyAccount: false})
    //                       this.setState({ popUp: { type: 'PaymentPlans', show: true } })
    //                     }}
    //                   >Upgrade to Premium</button>
    //                   <span>Trial ends {formatDate(new Date(new Date().setDate(new Date().getDate() + Math.ceil(+this.props.rootStore.userStore.user.trial_days_left))))}</span>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         }
    //         {
    //           !this.props.rootStore.userStore.user.lifetime_trial &&
    //             !this.props.rootStore.userStore.user.lifetime_subscription &&
    //             !this.props.rootStore.userStore.user.trial && this.state.subscribed
    //             ? this.renderSubscriptionContent : null
    //         }
    //       </div>
    //     </SkModal>
    //   </div>
    // )
  }

  renderSubscriptionContent () {
    return (
      <div className="home-column">
        <div className="home-shadow-box" style={{boxShadow: 'none, margin: 0'}}>
          <div className="home-shadow-box__expiresin-container" style={{padding: 0, textAlign: 'center'}}>
            <div className="home-shadow-box__expiresin-title">
              <img alt="Skoller" className="logo" src="/src/assets/images/sammi/Smile.png" height="60" />
              { this.renderCancellationText() }
            </div>
            <div style={{display: 'flex', flexDirection: 'column'}}>
              { this.renderSubscribeCancelButton() }
            </div>
            <span>Subscription ends {formatDate(this.getIntervalDate())}</span>
          </div>
        </div>
      </div>
    )
  }

  renderCancellationText () {
    const { expirationIntent } = this.props.rootStore.userStore.mySubscription
    if (this.state.subscribed && !expirationIntent) {
      return (
        <h1>Cancel Subscription</h1>
      )
    } else {
      return (
        <h1>You&apos;ve cancelled your subscription</h1>
      )
    }
  }

  renderSubscribeCancelButton () {
    const { expirationIntent } = this.props.rootStore.userStore.mySubscription
    if (this.state.subscribed && !expirationIntent) {
      return (
        <div>
          <button className="btn btn-primary" style={{marginBottom: '10px'}}
            onClick={() => {
              this.setState({showMyAccount: false})
              this.setState({ popUp: { type: 'CancelSubscription', show: true } })
            }}
          >Cancel Subscription</button>
        </div>
      )
    } else {
      return (
        <div>
          <button className="btn btn-primary" style={{marginBottom: '10px'}} onClick={() => {
            this.setState({ showMyAccount: false })
            this.setState({ popUp: { type: 'PaymentPlans', show: true } })
          }}
          >Upgrade To Premium</button>
        </div>
      )
    }
  }

  // renderSubscriptionCancelledContent () {
  //   return (
  //     <div className="home-column">
  //       <div className="home-shadow-box"style={{boxShadow: 'none', margin: 0}}>
  //         <div className="home-shadow-box__expiresin-container" style={{padding: 0}}>
  //           <div className="home-shadow-box__expiresin-title">
  //             <img alt="Skoller" className='logo' src='/src/assets/images/sammi/Smile.png' height="60" />
  //             {(this.props.rootStore.userStore.mySubscription && this.props.rootStore.userStore.mySubscription.expirationIntent) ? <h1>You cancelled your subscription</h1> : this.props.rootStore.userStore.mySubscription && !this.props.rootStore.userStore.mySubscription.expirationIntent ? <h1>Cancel subscription</h1> : null}
  //           </div>
  //           <div style={{display: 'flex', flexDirection: 'column'}}>
  //             {
  //               (this.props.rootStore.userStore.mySubscription && this.props.rootStore.userStore.mySubscription.expirationIntent)

  //                 ? <button className="btn btn-primary" style={{marginBottom: '10px'}}
  //                   onClick={() => {
  //                     this.setState({showMyAccount: false})
  //                     this.setState({ popUp: { type: 'PaymentPlans', show: true } })
  //                   }}
  //                 >Upgrade to Premium</button>
  //                 : this.props.rootStore.userStore.mySubscription && !this.props.rootStore.userStore.mySubscription.expirationIntent
  //                   ? <button className="btn btn-primary" style={{marginBottom: '10px'}}
  //                     onClick={() => {
  //                       this.setState({showMyAccount: false})
  //                       this.setState({ popUp: { type: 'CancelSubscription', show: true } })
  //                     }}
  //                   >Cancel Subscription</button> : null

  //             }
  //           </div>
  //           <span>Subscription ends {formatDate(this.getIntervalDate())}</span>
  //         </div>
  //       </div>
  //     </div>
  //   )
  // }

  renderClassInfo () {
    const { navbarStore: { cl, isDIY, toggleRequestResolved } } = this.props.rootStore
    if (cl) {
      return (
        <ClassInfo cl={cl}
          isDIY={isDIY}
          assignmentPage={false}
          toggleRequestResolved={toggleRequestResolved} />
      )
    }
  }
  renderLeaveSetupbtn () {
    const { userStore: { user } } = this.props.rootStore
    const admin = this.props.rootStore.userStore.isAdmin()
    const { navbarStore: { cl } } = this.props.rootStore
    if (cl) {
      return (
        <button className="cn_back_hmpage_btn"
          onClick={() => {
            if (admin) {
              this.props.history.push('/hub/landing')
            } else {
              this.props.history.push('/')
            }
          }}>
          Leave Setup
        </button>
      )
    }
  }
  renderAssignmentClassInfo () {
    const { navbarStore: { cl, isDIY, toggleRequestResolved } } = this.props.rootStore
    if (cl) {
      return (
        <ClassInfo cl={cl}
          isDIY={isDIY}
          assignmentPage={true}
          toggleRequestResolved={toggleRequestResolved} />
      )
    }
  }

  renderOnboardHeader () {
    return (
      <div className='cn-navbar' style={this.props.rootStore.userStore.user !== null && !this.props.rootStore.userStore.user.trial && !this.state.subscribed ? null : {zIndex: '100'}}>
        <div>
          <img alt="Skoller" className='logo' src='/src/assets/images/logo-wide-blue@1x.png' />
          <div className='onboard-logo-text'>
            {this.props.rootStore.userStore.isSW() ? '' : this.props.rootStore.navbarStore.isSyllabusTool ? 'Class Setup Tool.' : 'Keep up classes, together'}
          </div>
        </div>
        <div className='user-info'>
          <div className='left'>
          </div>
          <div className='right'>
          </div>
        </div>
      </div>
    )
  }

  renderJobsHeader () {
    const { userStore: { user } } = this.props.rootStore
    const admin = this.props.rootStore.userStore.isAdmin()
    return (
      <div className={'cn-navbar cn-navbar-jobs'} style={{ backgroundColor: '#4a4a4a', color: 'rgba(245, 245, 245, 1)' }}>
        <div>
          <img
            alt="Skoller"
            className='logo' src='/src/assets/images/jobs/skoller-jobs-logo.png'
            onClick={() => {
              if (admin) {
                this.props.history.push('/hub/landing')
              } else {
                this.props.history.push('/student/jobs')
              }
            }}
          />
          <div className='cn-navbar-message sk-jobs-navbar-message'>{'From the classroom to your dream career.'}</div>
        </div>
        <div className='class-info'>
          {/* {this.renderClassInfo()} */}
        </div>
        <div className='user-info'>
          {window.innerWidth > 1000 &&
            <JobsSwitch />
          }
          <div className='left'>
            <p>{this.getName()}</p>
            <span>Job Candidate</span>
          </div>
          <div className='right'>
            {user.pic_path
              ? <img className='profile-img' src={user.pic_path} />
              : <div style={{ backgroundColor: '#15A494' }} className='profile-img vertical-align profile-initials'>{this.getInitials()}</div>}
          </div>
        </div>
      </div>
    )
  }
  renderLifeTimeTrialUserModal () {
    return (
      <div>
        <LifeTimeUserModal
          closeModal={() => this.setState({showMyAccount: false})}
          handleModalClose={() => this.setState({showMyAccount: false})}
        />
      </div>
    )
  }
  async updateStudent () {
    if (this.cookie) {
      if (this.cookie.get('skollerToken')) {
        await actions.auth.getUserByToken(this.cookie.get('skollerToken')).catch((r) => console.log(r))
      }
    }
  }
  async updateClasses () {
    this.props.rootStore.studentAssignmentsStore.updateAssignments()
    this.props.rootStore.studentClassesStore.updateClasses()
  }

  closePopUp () {
    this.updateStudent()
    this.updateClasses()
    this.setState({ popUp: { show: false } })
  }

  render () {
    let jobsMode = this.props.rootStore.navStore.jobsMode
    const { navbarStore: { isSyllabusTool } } = this.props.rootStore

    if (this.props.onboard) {
      return (
        this.renderOnboardHeader()
      )
    } else if (jobsMode) {
      return (
        this.renderJobsHeader()
      )
    } else {
      const { userStore: { user } } = this.props.rootStore
      const admin = this.props.rootStore.userStore.isAdmin()
      const style = !this.state.subscribed && user.trial ? '' : {zIndex: 100}
      return (
        <div className='cn-navbar' style={!this.props.rootStore.userStore.user.trial && !this.state.subscribed ? null : {zIndex: '100'}}>
          {this.state.popUp.show &&
                    <PopUp closeModal={(!this.props.rootStore.userStore.user.trial && !this.state.subscribed) ? () => null : () => this.closePopUp()} handleModalClose={() => this.closePopUp()} type={this.state.popUp.type} refreshClasses={() => this.updateClasses()} />
          }
          <div>
            <img
              alt="Skoller"
              className='logo' src='/src/assets/images/logo-wide-blue@1x.png'
              onClick={() => {
                if (admin) {
                  this.props.history.push('/hub/landing')
                } else {
                  this.props.history.push('/')
                }
              }}
            />
            <div className='cn-navbar-message'>{this.props.rootStore.userStore.isSW() ? '' : this.props.rootStore.navbarStore.isSyllabusTool ? 'Class Setup Tool.' : 'Keep up classes, together'}</div>
          </div>
          <div className='class-info'>
            {this.props.rootStore.userStore.isSW()
              ? this.renderClassInfo() : this.renderAssignmentClassInfo()
            }
          </div>
          {!this.props.rootStore.userStore.isAdmin() && <ReactTooltip id='soclose'
            getContent={(dataTip) =>
              <div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}>
                  <img src={UserIcon} style={{width: '20px'}}/>
                  <button
                    style={{
                      cursor: 'pointer',
                      border: 'none',
                      outline: 'none',
                      background: 'transparent'
                    }}
                    onClick={() => this.setState({showMyAccount: true})}
                  >
                    My Account</button>
                </div>
              </div>
            }
            effect='solid'
            place={'bottom'}
            border={true}
            type={'light'}
            clickable={true}
            delayHide={500}
            overridePosition={overridePosition}
          />}
          {this.state.showMyAccount && this.props.rootStore.userStore.user.lifetime_trial && (
            <div className='sk-pop-up-container'>
              <SkModal

                closeModal={() => this.setState({showMyAccount: false})}
              >
                {this.renderLifeTimeTrialUserModal()}
              </SkModal>
            </div>
          )}
          {!this.props.rootStore.userStore.user.lifetime_trial && this.state.showMyAccount &&
                this.renderMyAccountDetails()
          }
          <div className='user-info' data-for="soclose" data-tip="soclose"
            //   onMouseLeave={() => this.setState({showUserToolTip: false})} onMouseEnter={() => this.setState({showUserToolTip: true})}
          >

            {window.innerWidth > 1000 &&
              <JobsSwitch />
            }
            <div className='left' style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <p>{this.getName()}</p>
                <span>{this.getDescription()}</span>
                <span>{this.state.subscribed}</span>
              </div>
              <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', filter: 'drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.5))', borderRadius: '50%', marginLeft: '10px', background: '#D8D8D8', width: '34px', height: '34px'}}>
                <img src='/src/assets/images/four_door/diy_off.png' width="20px" />
              </div>
            </div>
            <div className='right'>

              {this.renderLeaveSetupbtn()}

              {/* {user.pic_path
                ? <img className='profile-img' src={user.pic_path} />
                : <div className='profile-img vertical-align profile-initials'>{this.getInitials()}</div>} */}
            </div>
          </div>
        </div>
      )
    }
  }
}

NavBar.propTypes = {
  rootStore: PropTypes.object,
  onboard: PropTypes.bool,
  history: PropTypes.object
}

export default withRouter(NavBar)
