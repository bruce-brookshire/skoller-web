import React from 'react'

class Process extends React.Component {

  /**
   * @TODO Refactor out helper classes
   */
  render () {
    return (
      <div className='section-process'>
        <div className="content">
          <h2 className="section-header">Here's how it works</h2>
          <ul className='row process-list'>
            <li className='col-xs-12 col-sm-4 center-text'>
              <img className='process-icon-size' src='src/assets/images/landing_page/step_one.png'/>
              <h3>
                1. Create and account
              </h3>
              <p className='muted-text'>
                Create an account using your school email and select your classes.
              </p>
            </li>
            <li className='col-xs-12 col-sm-4 center-text'>
              <img className='process-icon-size' src='src/assets/images/landing_page/step_two.png'/>
              <h3>
                2. Upload your syllabi
              </h3>
              <p className='muted-text'>
                Drop a syllabus for each of your classes on our website.
              </p>
            </li>
            <li className='col-xs-12 col-sm-4 center-text'>
              <img className='process-icon-size' src='src/assets/images/landing_page/step_three.png'/>
              <h3>
                3. Relax
              </h3>
              <p className='muted-text'>
                Forget the stress while the important information on your syllabus is extracted seamlessly.
              </p>
            </li>
          </ul>
          <p className='copy'>
            When the syllabus process is finished, just open the app and find everything already in place.
          </p>
        </div>
      </div>
    )
  }
}

export default Process
