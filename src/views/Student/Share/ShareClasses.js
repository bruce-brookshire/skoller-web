import React from 'react'
import PropTypes from 'prop-types'
import SkSelectDropDown from '../../components/SkSelectDropDown'
import CopyBox from '../../components/CopyBox'
import amazon from '../../../assets/images/share/amazon.png'
import jar from '../../../assets/images/share/jar.png'
import ScoreboardModal from './ScoreboardModal'

class ShareClasses extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      classSelection: this.props.classes[0],
      showClassDropDown: false,
      showScoreboardModal: false
    }
  }

  selectClassHandler (studentClass) {
    this.setState({classSelection: studentClass, showClassDropDown: false})
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
      this.state.classSelection.enrollment_link
    )
  }

  renderShareContent () {
    const name = this.state.classSelection.name
    const cl = this.state.classSelection
    if (cl.id % 2 === 0) {
      return (
        'Ditch your paper planner. Skoller unlocks academic organization and keeps you on track all year long. Our class ' +
        name + " is already set up. Sign up through the link you'll automatically be enrolled in our class.\n" +
        '\n' + this.state.classSelection.enrollment_link
      )
    } else {
      return (
        'This new app takes our syllabus and sends reminders about upcoming due dates, organizes assignments into a calendar, and much more. Our class ' +
        name + " is already set up. Sign up through the link you'll automatically be enrolled in our class.\n" +
        '\n' + this.state.classSelection.enrollment_link
      )
    }
  }

  renderIncentive () {
    if (this.props.partner) {
      return (
        <div className='sk-share-form-incentive'>
          <div className='sk-share-form-incentive-headline'>
            <b>Raise THOUSANDS</b> by sharing with classmates!
          </div>
          <div className='sk-share-form-incentive-img' style={{backgroundImage: `url(${jar})`, height: '200px'}}>
            <div className='sk-share-form-incentive-org' style={{fontSize: this.props.partner.slug.length > 4 ? '11px' : ''}}>{this.props.partner.slug}</div>
          </div>
        </div>
      )
    } else {
      return (
        // <div className='sk-share-form-incentive'>
        //   <div className='sk-share-form-incentive-headline'>
        //     Skoller works better when you and <b>all of your classmates</b> use it!
        //   </div>
        //   {/* <div className='sk-share-form-incentive-img' style={{backgroundImage: `url(${amazon})`}} /> */}
        // </div>
        <div>
          Skoller works better when you and <b>all of your classmates</b> use it!
        </div>
      )
    }
  }

  renderShareForm () {
    return (
      <div className='sk-share-form'>
        <h1>Share</h1>
        {this.renderIncentive()}
        {this.props.partner && <h2>Here&apos;s how:</h2>}
        <div className='sk-share-form-section'>
          <h4>1. Select a class</h4>
          {this.renderSelect()}
        </div>
        <div className='sk-share-form-section'>
          <h4>2. Click the box to copy the link</h4>
          <CopyBox
            longMessage={false}
            smallText={true}
            linkValue={this.renderShareMessage()}
            hiddenText={this.renderShareContent()}
          />
        </div>
        <div className='sk-share-form-section'>
          <h4>3. Paste and share with classmates!</h4>
          <p>Send your link to classmates through Facebook, Canvas, Blackboard, GroupMe, email, etc.</p>
        </div>
      </div>
    )
  }

  renderPartnerships () {
    const opts = {
      height: '180px',
      width: '100%'
    }

    return (
      <div className='sk-share-classes-partnerships'>
        <h1>Partnerships</h1>
        <p className='partnerships-detail'><a target='_blank' rel='noopener noreferrer' href='https://explore.skoller.co/affiliate-program'>Check out</a> how Skoller and student organizations benefit when they partner up!</p>
        {/* <YouTube className={'video'} videoId={'-piVeJNI61w'} opts={opts} /> */}
        <div className='video'>
          <iframe src='https://www.youtube.com/embed/-piVeJNI61w'
            frameBorder='0'
            allowFullScreen
            title='video'
          />
        </div>
      </div>
    )
  }

  renderScoreboard () {
    return (
      <div className='sk-share-classes-scoreboard'>
        <h1>Scoreboard</h1>
        {this.props.partner
          ? <div className='sk-share-classes-raise-effort'>
            <div className='raise-effort-headline'>
              <b style={{color: '#' + this.props.partner.primaryColor}}>YOU&apos;VE RAISED ${this.props.user.student.raise_effort.personal_signups + 1}</b> for {this.props.partner.philanthropy}
            </div>
            <div className='raise-effort-button'>
              <p onClick={() => this.setState({showScoreboardModal: true})}>See full scoreboard</p>
            </div>
          </div>
          : <div className='sk-share-classes-raise-effort'>
            <div className='raise-effort-headline'>
              <b>{this.props.user.student.raise_effort.personal_signups} students</b> have signed up using your invite links
            </div>
          </div>
        }
      </div>
    )
  }

  render () {
    return (
      <div className='sk-share-classes'>
        <div className='sk-share-classes-col'>
          {this.renderShareForm()}
        </div>
        <div className='sk-share-classes-col'>
          <div className='sk-share-classes-cell'>
            {this.renderPartnerships()}
          </div>
          <div className='sk-share-classes-cell'>
            {this.renderScoreboard()}
          </div>
        </div>
        {this.state.showScoreboardModal &&
          <ScoreboardModal
            closeModal={() => this.setState({showScoreboardModal: false})}
            user={this.props.user}
            partner={this.props.partner}
          />
        }
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
