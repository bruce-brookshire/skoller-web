import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import {browserHistory} from 'react-router'
import Loading from '../../../components/Loading'
import actions from '../../../actions'

@inject('rootStore') @observer
class HubLanding extends React.Component {
  constructor (props) {
    super(props)
    this.state = {statuses: [], schoolCount: 0, loadingStatuses: false}
  }
  componentWillMount () {
    this.getStatuses()
  }

  /*
  * Fetch the class statuses
  */
  getStatuses () {
    this.setState({loadingStatuses: true})
    actions.hub.getStatuses().then((statuses) => {
      this.setState({statuses: statuses.statuses, schoolCount: statuses.schools, loadingStatuses: false})
    }).catch(() => { this.setState({loadingStatuses: false}) })
  }

  /*
  * Navigate to new route.
  *
  * @param [String] route. Route to navigate to.
  */
  onNavigate (route) {
    browserHistory.push(route)
  }

  /*
  * Fetch the next weight class for worker
  */
  getNextWeightClass () {
    actions.syllabusworkers.getWeightClass().then((cl) => {
      this.navigateToSyllabusTool(cl, 100)
    }).catch(() => false)
  }

  /*
  * Fetch the next assignment class for worker
  */
  getNextAssignmentClass () {
    actions.syllabusworkers.getAssignmentClass().then((cl) => {
      this.navigateToSyllabusTool(cl, 200)
    }).catch(() => false)
  }

  /*
  * Fetch the next review class for worker
  */
  getNextReviewClass () {
    actions.syllabusworkers.getWeightClass().then((cl) => {
      this.navigateToSyllabusTool(cl, 300)
    }).catch(() => false)
  }

  /*
  * Work section
  *
  * @param [Object] cl. The class to work.
  * @param [Number] sectionId. The section id of the section to work.
  */
  navigateToSyllabusTool (cl, sectionId) {
    browserHistory.push({
      pathname: `/class/${cl.id}/syllabus_tool`,
      state: {
        isAdmin: this.isAdminUser(),
        isReviewer: sectionId === 300,
        isSW: true,
        sectionId
      }
    })
  }

  /*
  * Determine if hub user is an admin
  */
  isAdminUser () {
    const {userStore: {user}} = this.props.rootStore
    return user.roles.findIndex(role => role.id === 200) > -1
  }

  /*
  * Render menu for admins.
  */
  renderAdminMenu () {
    if (this.isAdminUser()) {
      return (
        <div className='margin-top margin-bottom'>
          <span className='button-header center-text margin-top'>Admin panel</span>
          <div className='nav-button-container row full-width'>

            <div className='col-xs-12 col-sm-3 col-md- col-lg-3 margin-top'>
              <button className='nav-button admin button full-width' onClick={() => this.onNavigate('/hub/schools')}>
                <img src='/src/assets/images/icons/School.png'/>
                <span>Schools (
                  {this.state.loadingStatuses ? <Loading style={{color: 'white'}}/>
                    : this.state.schoolCount
                  }
                )</span>
              </button>
            </div>

            <div className='col-xs-12 col-sm-3 col-md-3 col-lg-3 margin-top'>
              <button className='nav-button admin button full-width' onClick={() => this.onNavigate('/hub/classes')}>
                <img src='/src/assets/images/icons/Search.png'/>
                <span>Class Search</span>
              </button>
            </div>

            <div className='col-xs-12 col-sm-3 col-md-3 col-lg-3 margin-top'>
              <button className='nav-button admin button full-width' onClick={() => this.onNavigate('/hub/accounts')}>
                <img src='/src/assets/images/icons/Accounts.png'/>
                <span>Accounts</span>
              </button>
            </div>
          </div>
        </div>
      )
    }
  }

  getStatusCount (key) {
    const status = this.state.statuses.find(status => status.name === key)
    return status && status.classes
  }

  render () {
    return (
      <div className='cn-hub-landing-container'>
        <div className='full-width'>
          <div className='row'>
            <div className='col-xs-12 col-sm-10 col-md-8 center-content'>
              <h1 className='header'>Welcome to <strong>the Hub.</strong></h1>
              <p className='description margin-top'>Where the syllabus magic happens <i className="em em-crystal_ball"></i></p>

              <div className='margin-top'>
                <span className='button-header center-text margin-top'>What do you want to work on?</span>
                <div className='nav-button-container row full-width'>

                  <div className='col-xs-12 col-sm-3 col-md-3 col-lg-3 margin-top'>
                    <button className='nav-button button full-width' onClick={() => this.getNextWeightClass()}>
                      <img src='/src/assets/images/icons/Weights.png'/>
                      <span>Weights (
                        {this.state.loadingStatuses ? <Loading style={{color: 'white'}}/>
                          : this.getStatusCount('Weights') || 0
                        }
                      )</span>
                    </button>
                  </div>

                  <div className='col-xs-12 col-sm-3 col-md-3 col-lg-3 margin-top'>
                    <button className='nav-button button full-width' onClick={() => this.getNextAssignmentClass()}>
                      <img src='/src/assets/images/icons/Assignments.png'/>
                      <span>Assigments (
                        {this.state.loadingStatuses ? <Loading style={{color: 'white'}} />
                          : this.getStatusCount('Assignments') || 0
                        }
                      )</span>
                    </button>
                  </div>

                  <div className='col-xs-12 col-sm-3 col-md-3 col-lg-3 margin-top'>
                    <button className='nav-button button full-width' onClick={() => this.getNextReviewClass()}>
                      <img src='/src/assets/images/icons/Review.png'/>
                      <span>Review (
                        {this.state.loadingStatuses ? <Loading style={{color: 'white'}} />
                          : this.getStatusCount('Review') || 0
                        }
                      )</span>
                    </button>
                  </div>

                  <div className='col-xs-12 col-sm-3 col-md-3 col-lg-3 margin-top'>
                    <button className='nav-button button full-width' onClick={() => this.onNavigate('/diy/needs_help')}>
                      <img src='/src/assets/images/icons/NeedsHelp.png'/>
                      <span>Needs Help (
                        {this.state.loadingStatuses ? <Loading style={{color: 'white'}}/>
                          : this.getStatusCount('Help') || 0
                        }
                      )</span>
                    </button>
                  </div>
                </div>
              </div>
              {this.renderAdminMenu()}
            </div>
          </div>

        </div>
      </div>
    )
  }
}

HubLanding.propTypes = {
  rootStore: PropTypes.object
}

export default HubLanding
