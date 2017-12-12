import React from 'react'
import PropTypes from 'prop-types'
import {browserHistory} from 'react-router'

class HubLanding extends React.Component {
  onNavigate(route) {
    browserHistory.push(route)
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
                    <button className='nav-button button full-width' onClick={() => this.onNavigate('/diy/weights')}>
                      <img src='/src/assets/images/icons/Weights.png'/>
                      <span>Weights (110)</span>
                    </button>
                  </div>

                  <div className='col-xs-12 col-sm-3 col-md-3 col-lg-3 margin-top'>
                    <button className='nav-button button full-width' onClick={() => this.onNavigate('/diy/assignments')}>
                      <img src='/src/assets/images/icons/Assignments.png'/>
                      <span>Assigments (69)</span>
                    </button>
                  </div>

                  <div className='col-xs-12 col-sm-3 col-md-3 col-lg-3 margin-top'>
                    <button className='nav-button button full-width' onClick={() => this.onNavigate('/diy/review')}>
                      <img src='/src/assets/images/icons/Review.png'/>
                      <span>Review (420)</span>
                    </button>
                  </div>

                  <div className='col-xs-12 col-sm-3 col-md-3 col-lg-3 margin-top'>
                    <button className='nav-button button full-width' onClick={() => this.onNavigate('/diy/needs_help')}>
                      <img src='/src/assets/images/icons/NeedsHelp.png'/>
                      <span>Needs Help (99999)</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className='margin-top margin-bottom'>
                <span className='button-header center-text margin-top'>Admin panel</span>
                <div className='nav-button-container row full-width'>

                  <div className='col-xs-12 col-sm-3 col-md- col-lg-3 margin-top'>
                    <button className='nav-button admin button full-width' onClick={() => this.onNavigate('/hub/schools')}>
                      <img src='/src/assets/images/icons/School.png'/>
                      <span>Schools (500)</span>
                    </button>
                  </div>

                  <div className='col-xs-12 col-sm-3 col-md-3 col-lg-3 margin-top'>
                    <button className='nav-button admin button full-width' onClick={() => this.onNavigate('/hub/class_search')}>
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
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default HubLanding
