import React from 'react'

class PromoSignup extends React.Component {
  render () {
    return (
      <div className='container-landing-message'>
        <h2 className='margin-bottom'>Keep up with your classes, together.</h2>
        <ul className='landing-message'>
          <li className='message-row'>
            <div className='cn-person'>
              <img style={{width: '50px'}} src='src/assets/images/landing_page/dudley.png' />
            </div>
            Reminders for every assignment
          </li>
          <li className='message-break'>
            <img src='src/assets/images/landing_page/squiggle1.png' />
          </li>
          <li className='message-row'>
            <div className='cn-person'>
              <img style={{width: '69px'}} src='src/assets/images/landing_page/matilda.png' />
            </div>
            Chat with all your classmates
          </li>
          <li className='message-break'>
            <img src='src/assets/images/landing_page/squiggle2.png' />
          </li>
          <li className='message-row'>
            <div className='cn-person'>
              <img style={{width: '50px'}} src='src/assets/images/landing_page/peggy.png' />
            </div>
            Private and student-powered
          </li>
        </ul>
      </div>
    )
  }
}

export default PromoSignup
