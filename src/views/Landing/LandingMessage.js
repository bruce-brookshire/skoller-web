import React from 'react'

class PromoSignup extends React.Component {
  render () {
    return (
      <div className='container-landing-message'>
        <h2>Keep up with your classes, together.</h2>
        <ul className='landing-message'>
          <li className='message-row'>
            <img className='cn-person' src='src/assets/images/landing_page/dudley.png' />
            Reminders for every assignment
          </li>
          <li className='message-break'>
            <img src='src/assets/images/landing_page/squiggle1.png' />
          </li>
          <li className='message-row'>
            <img className='cn-matilda' src='src/assets/images/landing_page/matilda.png' />
            Chat with all your classmates
          </li>
          <li className='message-break'>
            <img src='src/assets/images/landing_page/squiggle2.png' />
          </li>
          <li className='message-row'>
            <img className='cn-person' src='src/assets/images/landing_page/peggy.png' />
            Private and student-powered
          </li>
        </ul>
      </div>
    )
  }
}

export default PromoSignup
