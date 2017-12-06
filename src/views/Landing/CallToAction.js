import React from 'react'
import Slant from '../../components/Slant'

class CallToAction extends React.Component {
  render () {
    return (
      <div>
        <Slant className='slant-inverse'/>
        <div className='row'>
          <div className='col-xs-12 center-text'>
            <button 
              className='button'
              >
              This is dope. Sign me up.
            </button>
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-12 center-text'>
            <p>
              <a href=''>Interested in becoming an ambassador at your school?</a>
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default CallToAction
