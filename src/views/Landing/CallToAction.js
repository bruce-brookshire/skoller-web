import React from 'react'
import Slant from '../../components/Slant'

class CallToAction extends React.Component {

  constructor (props) {
    super(props)
  }

  goToSignup () {
    window.location.href = "/#promo-signup";
  }


  render () {
    return (
      <div >
        <Slant className='slant-inverse'/>
        <div className='row'>
          <div className='col-xs-12 center-text'>
            <a href="#promo-signup">
              <button
                className='button'
                >
                This is dope. Sign me up.
              </button>
            </a>
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-12 center-text'>
            <p>
              <a href='http://ambassador.skoller.co'>Interested in becoming an ambassador at your school?</a>
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default CallToAction
