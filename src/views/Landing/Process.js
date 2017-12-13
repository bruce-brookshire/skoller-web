import React from 'react'
import Slant from '../../components/Slant'

class Process extends React.Component {
  render () {
    return (
      <div className='shift-up page-height vertical-align center'>
        <Slant className='no-bg white-fill'/>
        <h2 className='center-text'>{'Here\'s how it works'}</h2>
        <div className='row section-header'>
          <div className='col-xs-12 col-sm-4 center-text'>
            <img className='process-icon-size' src='src/assets/images/landing_page/step_one.png'/>
            <h4>
              1. Create and account
            </h4>
            <p className='muted-text'>
              Create an account using your school email and select your classes.
            </p>

          </div>
          <div className='col-xs-12 col-sm-4 center-text'>
            <img className='process-icon-size' src='src/assets/images/landing_page/step_two.png'/>
            <h4>
              2. Upload your syllabi
            </h4>
            <p className='muted-text'>
              Drop a syllabus for each of your classes on our website.
            </p>
          </div>
          <div className='col-xs-12 col-sm-4 center-text'>
            <img className='process-icon-size' src='src/assets/images/landing_page/step_three.png'/>
            <h4>
              3. Relax
            </h4>
            <p className='muted-text'>
              Forget the stress while the important information on your syllabus is extracted seamlessly.
            </p>
          </div>
        </div>
        <div>
          <h4 className='center-text blue-text'>
            When the syllabus process is finished, just open the app and find everything already in place.
          </h4>
        </div>
      </div>
    )
  }
}

export default Process
