import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import { withRouter } from 'react-router-dom'
import Loading from '../../../components/Loading'
import actions from '../../../actions'

@inject('rootStore') @observer
class HubLanding extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      statuses: [],
      schoolCount: 0,
      loadingStatuses: false,
      loadingReports: false,
      reports: []
    }

    this.getStatuses()
    if (this.isAdminUser()) {
      this.getReports()
    }
  }

  // componentWillMount () {
  //   this.getStatuses()
  //   if (this.isAdminUser()) {
  //     this.getReports()
  //   }
  // }

  /*
  * Fetch the class statuses
  */
  getStatuses () {
    this.setState({loadingStatuses: true})
    actions.hub.getStatusesHub().then((statuses) => {
      this.setState({statuses: statuses.statuses, schoolCount: statuses.schools, loadingStatuses: false})
    }).catch(() => { this.setState({loadingStatuses: false}) })
  }

  getReports () {
    this.setState({loadingReports: true})
    actions.reports.getIncompleteReports().then((reports) => {
      this.setState({reports, loadingReports: false})
    }).catch(() => { this.setState({loadingReports: false}) })
  }

  /*
  * Navigate to new route.
  *
  * @param [String] route. Route to navigate to.
  */
  onNavigate (route) {
    this.props.history.push(route)
  }

  /*
  * Fetch the next weight class for worker
  */
  getNextClass () {
    actions.syllabusworkers.getNextClass().then((cl) => {
      this.navigateToSyllabusTool(cl)
    }).catch(() => false)
  }

  /*
  * Work section
  *
  * @param [Object] cl. The class to work.
  * @param [Number] sectionId. The section id of the section to work.
  */
  navigateToSyllabusTool (cl) {
    this.props.history.push({
      pathname: `/class/${cl.id}/syllabus_tool`,
      state: {
        isSW: true
      }
    })
  }

  onNeedsChange () {
    this.props.history.push({
      pathname: '/hub/classes',
      state: {
        needsChange: true
      }
    })
  }

  onNeedsMaint () {
    this.props.history.push({
      pathname: '/hub/classes',
      state: {
        needsMaint: true
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

  isChangeReqUser () {
    const {userStore} = this.props.rootStore
    return userStore.isChangeReq()
  }

  isHelpReqUser () {
    const {userStore} = this.props.rootStore
    return userStore.isHelpReq()
  }

  /*
  * Render menu for admins.
  */
  renderAdminMenu () {
    return (
      <div className='margin-top margin-bottom'>
        <span className='button-header center-text'>Admin panel</span>
        <div className='nav-button-container row full-width' style={{alignItems: 'flex-end'}}>

          <div className='col-xs-12 col-sm-2 col-md-2 col-lg-2 margin-top'>
            <button className='nav-button admin button full-width' onClick={() => this.onNavigate('/hub/schools')}>
              <i className='fas fa-university' style={{color: '#FEFEFE', fontSize: '1.4rem', paddingBottom: '4px'}} />
              <span>Schools (
                {this.state.loadingStatuses ? <Loading style={{color: 'white'}}/>
                  : this.state.schoolCount
                }
              )</span>
            </button>
          </div>

          <div className='col-xs-12 col-sm-2 col-md-2 col-lg-2 margin-top'>
            <button className='nav-button admin button full-width' onClick={() => this.onNavigate('/hub/classes')}>
              <i className='fas fa-search' style={{color: '#FEFEFE', fontSize: '1.4rem', paddingBottom: '4px'}} />
              <span>Class Search</span>
            </button>
          </div>

          <div className='col-xs-12 col-sm-2 col-md-2 col-lg-2 margin-top'>
            <button className='nav-button admin button full-width' onClick={() => this.onNavigate('/hub/accounts')}>
              <i className='fas fa-users' style={{color: '#FEFEFE', fontSize: '1.4rem', paddingBottom: '4px'}} />
              <span>Accounts</span>
            </button>
          </div>

          {/* <div className='col-xs-12 col-sm-2 col-md-2 col-lg-2 margin-top'>
            <button className='nav-button admin button full-width' onClick={() => this.onNavigate('/hub/analytics')}>
              <i className='fas fa-chart-line' style={{color: '#FEFEFE', fontSize: '1.4rem', paddingBottom: '4px'}} />
              <span>Analytics</span>
            </button>
          </div> */}

          <div className='col-xs-12 col-sm-2 col-md-2 col-lg-2 margin-top'>
            <button className='nav-button admin button full-width' onClick={() => this.onNavigate('/hub/switchboard')}>
              <i className='fa fa-toggle-on' style={{color: '#FEFEFE', fontSize: '1.4rem', paddingBottom: '4px'}}></i>
              <span>Switchboard</span>
            </button>
          </div>

          <div className='col-xs-12 col-sm-2 col-md-2 col-lg-2 margin-top'>
            <button className='nav-button admin button full-width' onClick={() => this.onNavigate('/hub/insights')}>
              <i className='fas fa-eye' style={{color: '#FEFEFE', fontSize: '1.4rem', paddingBottom: '4px'}}></i>
              <span>Insights</span>
            </button>
          </div>

          {/* <div className='col-xs-12 col-sm-2 col-md-2 col-lg-2 margin-top'>
            <button className='nav-button admin button full-width' onClick={() =>
              this.prop s.history.push({pathname: '/hub/reports', state: {reports: this.state.reports}})}>
              <i className='fa fa-flag' style={{color: '#FEFEFE', fontSize: '1.4rem', paddingBottom: '4px'}}></i>
              <span>Reports (
                {this.state.loadingReports ? <Loading style={{color: 'white'}}/>
                  : this.state.reports.length
                }
              )</span>
            </button>
          </div> */}
        </div>
      </div>
    )
  }

  getStatusCount (key) {
    const status = this.state.statuses.find(status => status.name === key)
    return status && status.classes
  }

  renderMaintMenu () {
    const changeCount = this.getStatusCount('Class Issue') || 0
    const maintCount = this.getStatusCount('Under Maintenance') || 0

    const disableChange = changeCount === 0
    const disableMaint = maintCount === 0

    return (
      <div>
        <span className='button-header center-text'>Classes in the shop</span>
        <div className='nav-button-container row full-width'>
          {(this.isChangeReqUser() || this.isAdminUser()) && <div className='col-xs-12 col-sm-3 col-md-3 col-lg-3 margin-top'>
            <button
              className={`nav-button maint button full-width ${disableChange ? 'disabled' : ''}`}
              disabled={disableChange}
              onClick={this.onNeedsChange.bind(this)}
            >
              <img src='/src/assets/images/icons/change_requests.png'/>
              <span>Change Request (
                {this.state.loadingStatuses ? <Loading style={{color: '#a0a0a0'}} />
                  : changeCount
                }
              )</span>
            </button>
          </div>}
          {/* {this.isAdminUser() && <div className='col-xs-12 col-sm-3 col-md-3 col-lg-3 margin-top'>
            <button
              className={`nav-button maint button full-width ${disableMaint ? 'disabled' : ''}`}
              disabled={disableMaint}
              onClick={this.onNeedsMaint.bind(this)}
            >
              <img src='/src/assets/images/icons/repair.png'/>
              <span>Under Maintenance (
                {this.state.loadingStatuses ? <Loading style={{color: '#a0a0a0'}} />
                  : maintCount
                }
              )</span>
            </button>
          </div>} */}
        </div>
      </div>
    )
  }

  render () {
    const syllabiCount = this.getStatusCount('Workable Syllabi') || 0

    return (
      <div className='cn-hub-landing-container'>
        <div className='full-width'>
          <div className='row'>
            <div className='col-xs-12 col-sm-10 col-md-8 center-content'>
              <h1 className='header'>Welcome to <strong>the Hub.</strong></h1>
              <p className='description margin-top'>Where the syllabus magic happens <i className="em em-crystal_ball"></i></p>

              <div>
                <span className='button-header center-text'>What&apos;s in action?</span>
                <div className='nav-button-container row full-width'>

                  <div className='col-xs-12 col-sm-3 col-md-3 col-lg-3 margin-top'>
                    <button
                      className={`nav-button button full-width ${syllabiCount === 0 ? 'disabled' : ''}`}
                      disabled={syllabiCount === 0}
                      onClick={() => this.getNextClass()}
                    >
                      <img src='/src/assets/images/icons/Assignments.png'/>
                      <span>Syllabi (
                        {this.state.loadingStatuses ? <Loading style={{color: '#a0a0a0'}} />
                          : syllabiCount
                        }
                      )</span>
                    </button>
                  </div>
                </div>
              </div>
              {(this.isChangeReqUser() || this.isAdminUser()) && this.renderMaintMenu()}
              {this.isAdminUser() && this.renderAdminMenu()}
            </div>
          </div>

        </div>
      </div>
    )
  }
}

HubLanding.propTypes = {
  rootStore: PropTypes.object,
  history: PropTypes.object
}

export default withRouter(HubLanding)
