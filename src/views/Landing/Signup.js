import React from 'react'
import PropTypes from 'prop-types'
import {browserHistory} from 'react-router'
import SignUpForm from '../components/SignUpForm'
import {inject, observer} from 'mobx-react'
import {Cookies} from 'react-cookie'

@inject('rootStore') @observer
class Signup extends React.Component {
  constructor (props) {
    super(props)
    this.cookie = new Cookies()
  }

  onSubmit (form) {
    console.log(this.props.rootStore)
    console.log(form)
    browserHistory.push({pathname: '/onboard'})
  }

  render () {
    return (
      <div id='promo-signup' className='container-promo-signup'>
        <div className='container-form-register'>
          <div id='sign-up-form'>
            <SignUpForm {...this.props}
              header={
                <div>
                  <h1>Get started!</h1>
                  <small>You&apos;re a few clicks away from the easiest semester of your life.</small>
                </div>
              }
              buttonText='Sign Up'
              onSubmit={this.onSubmit.bind(this)}
            />
          </div>
        </div>
      </div>
    )
  }
}

Signup.propTypes = {
  rootStore: PropTypes.object
}

export default Signup
