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
import SkModal from '../../views/components/SkModal/SkModal'
import LifeTimeUserModal from '../../views/Student/components/LifeTimeUserModal'
import PopUp from '../../views/Student/Home/PopUp'
import { Cookies } from 'react-cookie'

@inject('rootStore')
@observer
class NavBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      subscribed: false,
      isTrial: false,
      trialDaysLeft: 0,
      subscriptionCancelled: false,
      showMyAccount: false,
      subscriptionEndsOrRenews: null,
      platform: null,
      popUp: { show: false, type: null }
    }
    this.cookie = new Cookies()
  }

  getName () {
    const {
      userStore: { user }
    } = this.props.rootStore
    if (user.student) {
      return `${user.student.name_first} ${user.student.name_last}`
    } else {
      return user.email
    }
  }

  getDescription () {
    const {
      userStore: { user }
    } = this.props.rootStore
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
    actions.stripe
      .getMySubscription()
      .then((data) => {
        if (
          (Array.isArray(data.data) && data.data.length > 0) ||
          (!Array.isArray(data.data) && data.data != null)
        ) {
          this.props.rootStore.userStore.setMySubscription(data.data)
          this.props.rootStore.userStore.setSubscriptionCreatedDate(
            data.data.created
          )
          this.props.rootStore.userStore.setInterval(data.data.interval)
          this.setState({
            subscriptionEndsOrRenews: this.setSubscriptionRenewal(data.data)
          })
          this.setState({ subscribed: this.isSubscribed(data.data) })
          this.setState({
            subscriptionCancelled: this.setCancellationStatus(data.data)
          })
        }
        this.setState({ isTrial: this.props.rootStore.userStore.user.trial })
        this.setState({
          trialDaysLeft: this.props.rootStore.userStore.user.trial_days_left
        })
        this.setState({
          showMyAccount: !this.isSubscribed(data.data) && !this.state.isTrial
        })
        this.setState({
          platform: data.data.platform
        })
      })
      .catch((e) => {
        console.log(e)
      })
  }

  setCancellationStatus ({ expirationIntent, cancelAt }) {
    if (expirationIntent == null && cancelAt == null) {
      return false
    }

    if (expirationIntent != null) {
      return true
    }

    return false
  }

  isSubscribed (data) {
    if (data.expirationIntent === null && data.cancelAt === null) {
      return true
    }

    if (
      data.expirationIntent !== null &&
      data.cancelAt !== null &&
      data.cancelAt > Math.floor(new Date().getTime())
    ) {
      return true
    }

    if (
      data.expirationIntent === null &&
      data.cancelAt !== null &&
      data.cancelAt > Math.floor(new Date().getTime())
    ) {
      return true
    }

    return false
  }

  setSubscriptionRenewal ({ interval, cancelAt }) {
    if (cancelAt == null) {
      switch (interval) {
        case 'year':
          return new Date(
            new Date().setFullYear(new Date().getFullYear() + 1)
          ).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        case 'month':
          return new Date(
            new Date().setMonth(new Date().getMonth() + 1)
          ).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        case 'lifetime':
          return 'lifetime'
      }
    } else {
      return new Date(cancelAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
  }

  getInitials () {
    const {
      userStore: { user }
    } = this.props.rootStore
    const admin = this.props.rootStore.userStore.isAdmin()
    if (user.student) {
      if (user.student.name_first && user.student.name_last) {
        return (
          user.student.name_first[0].toUpperCase() +
          user.student.name_last[0].toUpperCase()
        )
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

  renderMyAccountDetails () {
    return (
      <div className="sk-pop-up-container">
        <SkModal
          closeModal={
            this.state.subscribed || this.state.isTrial
              ? () => this.setState({ showMyAccount: false })
              : null
          }
          style={{ width: '408px' }}
        >
          <div className="home-container" style={{ width: '100%', padding: 0 }}>
            {this.renderSubscriptionContent()}
          </div>
        </SkModal>
      </div>
    )
  }

  renderSubscriptionContent () {
    return (
      <div className="home-column">
        <div
          className="home-shadow-box"
          style={{ boxShadow: 'none, margin: 0' }}
        >
          <div
            className="home-shadow-box__expiresin-container"
            style={{ padding: 0, textAlign: 'center' }}
          >
            <div className="home-shadow-box__expiresin-title">
              <img
                alt="Skoller"
                className="logo"
                src="/src/assets/images/sammi/Smile.png"
                height="60"
              />
              {this.renderCancellationText()}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {this.renderSubscribeCancelButton()}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {this.renderSubscriptionEndText()}
              {!this.state.subscribed && !this.state.isTrial && (
                <div
                  onClick={() => this.props.history.push('/logout')}
                  style={{
                    color: '#333',
                    marginTop: '10px',
                    alignSelf: 'flex-start'
                  }}
                >
                  <i className="fas fa-sign-out-alt fa-lg" />
                  <a>Logout</a>
                  <span />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderCancellationText () {
    const { mySubscription } = this.props.rootStore.userStore
    if (
      this.state.subscribed &&
      mySubscription != null &&
      mySubscription.expirationIntent == null
    ) {
      return <h1>Cancel Subscription</h1>
    }

    if (!this.state.subscribed && this.state.isTrial) {
      return (
        <h2>
          You have {Math.ceil(this.state.trialDaysLeft)} day left in your trial.
          Upgrade now!
        </h2>
      )
    }

    if (!this.state.subscribed && !this.state.isTrial) {
      return (
        <h2>
          Your free trial has expired! Upgrade to Premium to continue using Skoller.
        </h2>
      )
    }
  }

  renderSubscribeCancelButton () {
    const { mySubscription } = this.props.rootStore.userStore
    if (
      this.state.subscribed &&
      mySubscription &&
      !mySubscription.expirationIntent
    ) {
      return (
        <div>
          { this.state.platform === 'stripe'
            ? <button
              className="btn btn-primary"
              style={{ marginBottom: '10px' }}
              onClick={() => {
                this.setState({ showMyAccount: false })
                this.setState({
                  popUp: { type: 'CancelSubscription', show: true }
                })
              }}
            >
            Cancel Subscription
            </button>
            : <span>You subscribed to premium through your mobile device&apos;s In-App-Purchasing. Manage your subscription through your device.</span>}
        </div>
      )
    }

    if (
      (!this.state.subscribed && !this.state.isTrial) ||
      (this.state.subscribed &&
        mySubscription &&
        mySubscription.expirationIntent &&
        mySubscription.cancelAt &&
        mySubscription.cancelAt < Math.floor(new Date().getTime() / 1000)) ||
      this.state.isTrial
    ) {
      return (
        <div>
          <button
            className="btn btn-primary"
            style={{ marginBottom: '10px' }}
            onClick={() => {
              this.setState({ showMyAccount: false })
              this.setState({ popUp: { type: 'PaymentPlans', show: true } })
            }}
          >
            Upgrade To Premium
          </button>
        </div>
      )
    } else {
      return (
        <div>Balls</div>
      )
    }
  }

  renderSubscriptionEndText () {
    const { mySubscription } = this.props.rootStore.userStore
    if (
      mySubscription &&
      mySubscription.cancelAt == null &&
      this.state.subscribed
    ) {
      return (
        <span>
          {this.state.subscriptionEndsOrRenews === 'lifetime' ? 'You have a lifetime subscription.'
            : 'Your subscription will renew on {this.state.subscriptionEndsOrRenews'
          }
        </span>
      )
    }

    if (
      mySubscription &&
      mySubscription.cancelAt == null &&
      !this.state.subscribed &&
      this.state.isTrial
    ) {
      return <span></span>
    }

    if (!mySubscription && !this.state.subscribed && this.state.isTrial) {
      return <span></span>
    }

    if (
      mySubscription &&
      mySubscription.cancelAt > Math.floor(new Date().getTime() / 1000) &&
      !this.state.isTrial
    ) {
      return (
        <span>
          Your subscription will end {this.state.subscriptionEndsOrRenews}
        </span>
      )
    }
  }

  renderClassInfo () {
    const {
      navbarStore: { cl, isDIY, toggleRequestResolved }
    } = this.props.rootStore
    if (cl) {
      return (
        <ClassInfo
          cl={cl}
          isDIY={isDIY}
          assignmentPage={false}
          toggleRequestResolved={toggleRequestResolved}
        />
      )
    }
  }

  renderLeaveSetupbtn () {
    const admin = this.props.rootStore.userStore.isAdmin()
    const {
      navbarStore: { cl }
    } = this.props.rootStore
    if (cl) {
      return (
        <button
          className="cn_back_hmpage_btn"
          onClick={() => {
            if (admin) {
              this.props.history.push('/hub/landing')
            } else {
              this.props.history.push('/')
            }
          }}
        >
          Leave Setup
        </button>
      )
    }
  }

  renderAssignmentClassInfo () {
    const {
      navbarStore: { cl, isDIY, toggleRequestResolved }
    } = this.props.rootStore
    if (cl) {
      return (
        <ClassInfo
          cl={cl}
          isDIY={isDIY}
          assignmentPage={true}
          toggleRequestResolved={toggleRequestResolved}
        />
      )
    }
  }

  renderOnboardHeader () {
    return (
      <div
        className="cn-navbar"
        style={
          this.props.rootStore.userStore.user !== null &&
          !this.props.rootStore.userStore.user.trial &&
          !this.state.subscribed
            ? null
            : { zIndex: '100' }
        }
      >
        <div>
          <img
            alt="Skoller"
            className="logo"
            src="/src/assets/images/logo-wide-blue@1x.png"
          />
          <div className="onboard-logo-text">
            {this.props.rootStore.userStore.isSW()
              ? ''
              : this.props.rootStore.navbarStore.isSyllabusTool
                ? 'Class Setup Tool.'
                : 'Keep up classes, together'}
          </div>
        </div>
        <div className="user-info">
          <div className="left"></div>
          <div className="right"></div>
        </div>
      </div>
    )
  }

  // Jobs features are not in use
  //
  // renderJobsHeader () {
  //   const { userStore: { user } } = this.props.rootStore
  //   const admin = this.props.rootStore.userStore.isAdmin()
  //   return (
  //     <div className={'cn-navbar cn-navbar-jobs'} style={{ backgroundColor: '#4a4a4a', color: 'rgba(245, 245, 245, 1)' }}>
  //       <div>
  //         <img
  //           alt="Skoller"
  //           className='logo' src='/src/assets/images/jobs/skoller-jobs-logo.png'
  //           onClick={() => {
  //             if (admin) {
  //               this.props.history.push('/hub/landing')
  //             } else {
  //               this.props.history.push('/student/jobs')
  //             }
  //           }}
  //         />
  //         <div className='cn-navbar-message sk-jobs-navbar-message'>{'From the classroom to your dream career.'}</div>
  //       </div>

  //       <div className='user-info'>
  //         {window.innerWidth > 1000 &&
  //           <JobsSwitch />
  //         }
  //         <div className='left'>
  //           <p>{this.getName()}</p>
  //           <span>Job Candidate</span>
  //         </div>
  //         <div className='right'>
  //           {user.pic_path
  //             ? <img className='profile-img' src={user.pic_path} />
  //             : <div style={{ backgroundColor: '#15A494' }} className='profile-img vertical-align profile-initials'>{this.getInitials()}</div>}
  //         </div>
  //       </div>
  //     </div>
  //   )
  // }

  renderLifeTimeTrialUserModal () {
    return (
      <div className="sk-pop-up-container">
        <SkModal closeModal={() => this.setState({ showMyAccount: false })}>
          <LifeTimeUserModal
            closeModal={() => this.setState({ showMyAccount: false })}
            handleModalClose={() => this.setState({ showMyAccount: false })}
          />
        </SkModal>
      </div>
    )
  }

  renderPopUp () {
    return (
      <PopUp
        closeModal={
          this.state.subscribed || this.state.isTrial
            ? () => this.closePopUp()
            : () => {
              return null
            }
        }
        handleModalClose={() => this.closePopUp()}
        type={this.state.popUp.type}
        shouldAllowClose={this.state.subscribed || this.state.isTrial}
        refreshClasses={() => this.updateClasses()}
      />
    )
  }

  renderAccountContainer () {
    if (
      this.state.showMyAccount &&
      this.props.rootStore.userStore.user.lifetime_trial
    ) {
      return this.renderLifeTimeTrialUserModal()
    }

    if (
      !this.props.rootStore.userStore.user.lifetime_trial &&
      this.state.showMyAccount
    ) {
      return this.renderMyAccountDetails()
    }
  }

  async updateStudent () {
    if (this.cookie) {
      if (this.cookie.get('skollerToken')) {
        await actions.auth
          .getUserByToken(this.cookie.get('skollerToken'))
          .catch((r) => console.log(r))
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
    if (this.props.onboard) {
      return this.renderOnboardHeader()
    } else {
      const admin = this.props.rootStore.userStore.isAdmin
      const isSw = this.props.rootStore.userStore.isSw
      return (
        <div className="cn-navbar" style={{ zIndex: '100' }}>
          {this.state.popUp.show && this.renderPopUp()}
          <div>
            <img
              alt="Skoller"
              className="logo"
              src="/src/assets/images/logo-wide-blue@1x.png"
              onClick={() => {
                if (admin) {
                  this.props.history.push('/hub/landing')
                } else {
                  this.props.history.push('/')
                }
              }}
            />
            <div className="cn-navbar-message">
              {this.props.rootStore.userStore.isSW()
                ? ''
                : this.props.rootStore.navbarStore.isSyllabusTool
                  ? 'Class Setup Tool.'
                  : 'Keep up classes, together'}
            </div>
          </div>

          <div className="class-info">
            {this.props.rootStore.userStore.isSW()
              ? this.renderClassInfo()
              : this.renderAssignmentClassInfo()}
          </div>

          {
            // Render the My Account button on hover.
            !this.props.rootStore.userStore.isAdmin() && (
              <ReactTooltip
                id="soclose"
                getContent={(dataTip) => (
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <img src={UserIcon} style={{ width: '20px' }} />
                      <button
                        style={{
                          cursor: 'pointer',
                          border: 'none',
                          outline: 'none',
                          background: 'transparent'
                        }}
                        onClick={() => this.setState({ showMyAccount: true })}
                      >
                        My Account
                      </button>
                    </div>
                  </div>
                )}
                effect="solid"
                place={'bottom'}
                border={true}
                type={'light'}
                clickable={true}
                delayHide={500}
                overridePosition={overridePosition}
              />
            )
          }

          {!admin && !isSw && this.renderAccountContainer()}

          <div
            className="user-info"
            data-for="soclose"
            data-tip="soclose"
            //   onMouseLeave={() => this.setState({showUserToolTip: false})} onMouseEnter={() => this.setState({showUserToolTip: true})}
          >
            {window.innerWidth > 1000 && <JobsSwitch />}
            <div
              className="left"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end'
                }}
              >
                <p>{this.getName()}</p>
                <span>{this.getDescription()}</span>
                <span>{this.state.subscribed}</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  filter: 'drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.5))',
                  borderRadius: '50%',
                  marginLeft: '10px',
                  background: '#D8D8D8',
                  width: '34px',
                  height: '34px'
                }}
              >
                <img
                  src="/src/assets/images/four_door/diy_off.png"
                  width="20px"
                />
              </div>
            </div>
            <div className="right">{this.renderLeaveSetupbtn()}</div>
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
