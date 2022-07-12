import React from 'react'
import {inject, observer} from 'mobx-react'
import PropTypes from 'prop-types'
import SkSelectDropDown from '../../components/SkSelectDropDown'
import CopyBox from '../../components/CopyBox'
import amazon from '../../../assets/images/share/amazon.png'
import jar from '../../../assets/images/share/jar.png'
import ScoreboardModal from './ScoreboardModal'
import actions from '../../../actions'
import stores from '../../../stores'

const {userStore} = stores

@inject('rootStore') @observer
class ShareClasses extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      user: this.props.user,
      classSelection: this.props.classes[0],
      referredStudents: this.props.referredStudents,
      showClassDropDown: false,
      inviteMode: 'classmates',
      referredStudents: null,
      venmoHandle: null
    }
  }

  selectClassHandler (studentClass) {
    this.setState({classSelection: studentClass, showClassDropDown: false})
  }

  async componentDidMount () {
    await actions.students.getUsersReferredByStudent(this.props.rootStore.userStore.user.student.id)
    .then((r) => {
      this.setState({referredStudents: r.student_data.referred_students})
      this.setState({venmoHandle: r.student_data.student.venmo_handle})
    })
    .catch(r => {
      this.setState({referredStudents: false})
    })
  }

  postVenmoHandle = async (event) => {
    event.preventDefault();
    const handle = event.target.venmoHandle.value;
    await actions.students.storeVenmoHandle(this.props.rootStore.userStore.user.student.id, handle)
    .then((r) => {
      userStore.user.student = r.student
      this.setState({venmoHandle: r.student.venmo_handle})
    })
    .catch(r => {
      console.log("VENMO HANDLE ERROR IN COMPONENT: ", r)
    })
  }

  onInviteModeChanged = (e) => {
    this.setState({inviteMode: e.currentTarget.value})
    this.renderShareContent()
    this.renderShareMessage()
  }

  renderClassOptions = () => {
    let classes = this.props.classes
    return (
      <div>
        {classes.map(studentClass => {
          return (
            <div
              className='sk-share-autocomplete-option'
              key={studentClass.id}
              onClick={() => {
                this.selectClassHandler(studentClass)
              }}
              style={{color: studentClass.getColor()}}
            >
              {studentClass.name}
            </div>
          )
        })}
      </div>
    )
  }

  renderSelect () {
    return (
      <div>
        <div className='sk-share-form-select' onClick={() => this.setState({showClassDropDown: !this.state.showClassDropDown})}>
          {this.state.classSelection
            ? <div className='sk-share-form-selection' style={{color: this.state.classSelection.getColor()}}>{this.state.classSelection.name}</div>
            : <div>Select a class</div>
          }
        </div>
        <SkSelectDropDown
          optionsMap={() => this.renderClassOptions()}
          show={this.state.showClassDropDown}
          toggle={() => this.setState({showClassDropDown: !this.state.showClassDropDown})}
        />
      </div>
    )
  }

  renderShareMessage () {
    return (
      this.state.inviteMode === 'classmates' ? 
      this.state.classSelection.enrollment_link :
      this.state.user.student.enrollment_link
    )
  }

  renderShareContent =  () => {

    const enrollmentLink = 
      this.state.inviteMode === 'classmates' ? 
      this.state.classSelection.enrollment_link :
      this.state.user.student.enrollment_link

    return (
      'This new app takes our syllabus and sends reminders about upcoming due dates, organizes assignments into a calendar, and much more. Our class ' +
      name + " is already set up. Sign up through the link you'll automatically be enrolled in our class.\n" +
      '\n' + enrollmentLink
    )
  }

  renderInvitingSelect () {
    return(
      <div className='sk-form-radio'>
        <label>
        <input 
          type="radio" 
          name="inviteSelect"
          value="classmates"
          checked={this.state.inviteMode === 'classmates'}
          onChange={this.onInviteModeChanged}
        />
        <span>Classmates (recommended)</span>
        </label>
        <label>
        <input 
          type="radio" 
          name="inviteSelect" 
          value="all-students"
          checked={this.state.inviteMode === 'all-students'}
          onChange={this.onInviteModeChanged}
        />
        <span>Any Student</span>
        </label>
      </div>
    )
  }

  renderShareCard () {
    return (
      <div className='sk-share-form'>
        <h1>Invite Students</h1>
        <div>Invite classmates or any student to Skoller!</div>
        <div className='sk-share-form-section'>
          <h4>Who are you inviting?</h4>
          {this.renderInvitingSelect()}
        </div>
        {this.state.inviteMode === 'classmates' ?
          <div className='sk-share-form-section'>
            <h4>A. Select a class</h4>
            {this.renderSelect()}
          </div>
          :
          <div></div>
        }
        <div className='sk-share-form-section'>
          <h4>{this.state.inviteMode === 'classmates' ? 'B' : 'A'}. Click the box to copy the link</h4>
          <CopyBox
            longMessage={false}
            smallText={true}
            linkValue={this.renderShareMessage()}
            hiddenText={this.renderShareContent()}
          />
        </div>
        <div className='sk-share-form-section'>
          <h4>{this.state.inviteMode === 'classmates' ? 'C' : 'B'}. Send the link to {this.state.inviteMode ==='classmates' ? 'Classmates' : 'Students'}!</h4>
          <p>Send YOUR share link to {this.state.inviteMode ==='classmates' ? 'classmates' : 'students'} or via text, email, or class chats!</p>
        </div>
      </div>
    )
  }

  renderTrialCheck() {
    return (
      <svg width="16" height="14" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.51251 7.23757C3.45417 7.23757 3.4007 7.22784 3.35209 7.2084C3.30348 7.18895 3.25487 7.15493 3.20626 7.10632L0.566675 4.46673C0.479175 4.37923 0.435425 4.27229 0.435425 4.1459C0.435425 4.01951 0.479175 3.91257 0.566675 3.82507C0.654175 3.73757 0.756258 3.69382 0.872925 3.69382C0.989591 3.69382 1.09167 3.73757 1.17917 3.82507L3.51251 6.1584L8.80626 0.864648C8.89376 0.777148 8.99827 0.733398 9.1198 0.733398C9.24133 0.733398 9.34584 0.777148 9.43334 0.864648C9.52084 0.952148 9.56459 1.05666 9.56459 1.17819C9.56459 1.29972 9.52084 1.40423 9.43334 1.49173L3.81876 7.10632C3.77015 7.15493 3.72154 7.18895 3.67292 7.2084C3.62431 7.22784 3.57084 7.23757 3.51251 7.23757Z" fill="#D1D1D6"/>
      </svg>

    )
  }

  renderPremiumCheck() {
    return (
      <svg width="16" height="14" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.08748 9.1623C4.01248 9.1623 3.94373 9.14981 3.88123 9.12481C3.81873 9.09981 3.75623 9.05606 3.69373 8.99356L0.299976 5.59981C0.187476 5.48731 0.131226 5.3498 0.131226 5.1873C0.131226 5.02481 0.187476 4.8873 0.299976 4.7748C0.412476 4.6623 0.543726 4.60606 0.693726 4.60606C0.843726 4.60606 0.974975 4.6623 1.08748 4.7748L4.08748 7.7748L10.8937 0.968555C11.0062 0.856055 11.1406 0.799805 11.2969 0.799805C11.4531 0.799805 11.5875 0.856055 11.7 0.968555C11.8125 1.08105 11.8687 1.21543 11.8687 1.37168C11.8687 1.52793 11.8125 1.6623 11.7 1.7748L4.48123 8.99356C4.41873 9.05606 4.35623 9.09981 4.29373 9.12481C4.23123 9.14981 4.16248 9.1623 4.08748 9.1623Z" fill="#57B9E4"/>
      </svg>

    )
  }

  renderTrackReferrals () {
    return (
      <div className='sk-share-classes-track-referrals'>
        <h1>Track Referrals</h1>
        <div>See who's signed up using your share links!</div>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th></th>
                <th>In Trial</th>
                <th>Trial Expired</th>
                <th>Premium $</th>
              </tr>
            </thead>
            <tbody>
              {this.state.referredStudents && this.state.referredStudents.map((studentData) => {
                return this.renderTrackRow(studentData)
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  renderTrackRow ({user, student, premium_active}) {
    return (
      <tr key={student.name}>
        <td colSpan='3' style={{paddingLeft: "10px"}}>{student.name}</td>
        <td className="name-td">{user.trial_status == "active" ? this.renderTrialCheck() : null}</td>
        <td className="check-td">{user.trial_status == "inactive" ? this.renderTrialCheck() : null}</td>
        <td className="check-td">{premium_active == true ? this.renderPremiumCheck() : null}</td>
      </tr>
    )
  }

  renderPayment () {
    return (
      <div className='sk-payment'>
        <h1>Build Passive Income</h1>
        <div>Get paid everytime your referrers pay!</div>

        <div className="payment-content">
          <div className="amount-row">
            <h2>June 2022 Income</h2>
            <h1 className="amount">$0</h1>
          </div>
          { !this.state.venmoHandle === null && this.state.venmoHandle != "" ?
            <div className="venmo-container">
              <div>Venmo Handle</div>

                <div className="venmo-form">
                  <div>@</div>
                  <form onSubmit={this.postVenmoHandle}>
                    <input className="margin-left" type="text" name="venmoHandle" />
                    <button 
                      className="margin-left btn btn-primary"
                      type="submit">Save</button>
                
                  </form>
                </div>
            </div>
          :
            <div className="venmo-container-inline">
              <div>Venmo Handle</div>
              <div style={{marginLeft: '10px', fontWeight: 'bold'}}>
                <div>@<span>{this.state.venmoHandle}</span></div>
              </div>
            </div>
          }
        </div>
      </div>
    )
  }

  render () {
    return (
      <div className='sk-share-classes'>
        <div className='sk-share-classes-col'>
          {this.renderShareCard()}
        </div>
        <div className='sk-share-classes-col'>
          <div className='sk-share-classes-cell'>
            {this.renderTrackReferrals()}
          </div>
          <div className='sk-share-classes-cell'>
            {this.renderPayment()}
          </div>
        </div>
      </div>
    )
  }
}

ShareClasses.propTypes = {
  classes: PropTypes.array,
  user: PropTypes.object,
  partner: PropTypes.object
}

export default ShareClasses
