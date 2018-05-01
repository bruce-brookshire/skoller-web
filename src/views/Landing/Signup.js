import React from 'react'
import {browserHistory} from 'react-router'
import SignUpForm from '../components/SignUpForm'

class Signup extends React.Component {
  render () {
    return (
      <div id='promo-signup' className='container-promo-signup'>
        <div className='container-form-register'>
          <div id='sign-up-form'>
            <SignUpForm {...this.props}
              header={<div>Sign up <small className='sub-header'>(it&apos;s free!)</small></div>}
              buttonText='Take me there.'
              onSubmit={() => { browserHistory.push('/student/verify') }}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Signup
