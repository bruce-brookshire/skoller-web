import React from 'react'
import {browserHistory} from 'react-router'

class CallToAction extends React.Component {
  render () {
    return (
      <div className="section-cta">
        <ul className="actions">
          <li className="action">
            <a className="button" onClick={() => { browserHistory.push('/landing'); window.scrollTo(0, 0) }}>
              This is dope. Sign me up.
            </a>
          </li>
          <li className="action" style={{marginBottom: '1.2rem'}}>
            <a href='https://docs.google.com/forms/d/1lgXeLjNEbrFeQ6YWJw-q-Ou6BKY8TSaOpGyUkAkNWKY/edit'>
              Interested in becoming an ambassador at your school?
            </a>
          </li>
          <li className="action">
            <a onClick={() => { browserHistory.push('/faq'); window.scrollTo(0, 0) }} style={{textDecoration: 'underline'}}>
              Want to learn more? Check out our FAQ&apos;s.
            </a>
          </li>
        </ul>
      </div>
    )
  }
}

export default CallToAction
