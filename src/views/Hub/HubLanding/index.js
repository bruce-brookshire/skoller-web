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
    actions.hub.getStatusesHub().then((statuses) => {
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
  getNextClass (sectionName, sectionId) {
    actions.syllabusworkers.getNextClass(sectionName).then((cl) => {
      this.navigateToSyllabusTool(cl, sectionId)
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

  onNeedsHelp () {
    browserHistory.push({
      pathname: '/hub/classes',
      state: {
        needsHelp: true
      }
    })
  }

  /*
  * Determine if hub user is an admin
  */
  isAdminUser () {
    const {userStore} = this.props.rootStore
    return userStore.isAdmin()
  }

  /*
  * Render menu for admins.
  */
  renderAdminMenu () {
    if (this.isAdminUser()) {
      const helpCount = this.getStatusCount('Help') || 0
      return (
        <div className='margin-top margin-bottom'>
          <span className='button-header center-text margin-top'>Admin panel</span>
          <div className='nav-button-container row full-width' style={{alignItems: 'flex-end'}}>

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
              {helpCount > 0 && <a onClick={this.onNeedsHelp.bind(this)} className='cn-red needs-help'>Needs Help: {helpCount}</a>}
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
    const weightCount = this.getStatusCount('Weights') || 0
    const assignmentCount = this.getStatusCount('Assignments') || 0
    const reviewCount = this.getStatusCount('Review') || 0

    const disableWeights = weightCount === 0
    const disableAssignments = assignmentCount === 0
    const disableReviews = reviewCount === 0

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
                    <button
                      className={`nav-button button full-width ${disableWeights ? 'disabled' : ''}`}
                      disabled={disableWeights}
                      onClick={() => this.getNextClass('weights', 100)}
                    >
                      <img src='/src/assets/images/icons/Weights.png'/>
                      <span>Weights (
                        {this.state.loadingStatuses ? <Loading style={{color: '#a0a0a0'}}/>
                          : weightCount
                        }
                      )</span>
                    </button>
                  </div>

                  <div className='col-xs-12 col-sm-3 col-md-3 col-lg-3 margin-top'>
                    <button
                      className={`nav-button button full-width ${disableAssignments ? 'disabled' : ''}`}
                      disabled={disableAssignments}
                      onClick={() => this.getNextClass('assignments', 200)}
                    >
                      <img src='/src/assets/images/icons/Assignments.png'/>
                      <span>Assigments (
                        {this.state.loadingStatuses ? <Loading style={{color: '#a0a0a0'}} />
                          : assignmentCount
                        }
                      )</span>
                    </button>
                  </div>

                  <div className='col-xs-12 col-sm-3 col-md-3 col-lg-3 margin-top'>
                    <button
                      className={`nav-button button full-width ${disableReviews ? 'disabled' : ''}`}
                      disabled={disableReviews}
                      onClick={() => this.getNextClass('reviews', 300)}
                    >
                      <img src='/src/assets/images/icons/Review.png'/>
                      <span>Review (
                        {this.state.loadingStatuses ? <Loading style={{color: '#a0a0a0'}} />
                          : reviewCount
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
