import React from 'react'

class CallToAction extends React.Component {
  render () {
    return (
      <div className="section-cta">
        <ul className="actions">
          <li className="action">
            <a className="button" href="#promo-signup">
              This is dope. Sign me up.
            </a>
          </li>
          <li className="action">
            <a href='https://docs.google.com/forms/d/1lgXeLjNEbrFeQ6YWJw-q-Ou6BKY8TSaOpGyUkAkNWKY/edit'>
              Interested in becoming an ambassador at your school?
            </a>
          </li>
        </ul>
      </div>
    )
  }
}

export default CallToAction
