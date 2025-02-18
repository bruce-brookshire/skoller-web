import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import SignUpForm from '../components/SignUpForm'
import { inject, observer } from 'mobx-react'
import { Cookies } from 'react-cookie'
import actions from '../../actions'

@inject('rootStore')
@observer
class Signup extends React.Component {
  constructor (props) {
    super(props)
    this.cookie = new Cookies()
  }

  onSubmit (form) {
    let newUser = {
      email: form.email,
      student: {
        name_first: form.student.name_first,
        name_last: form.student.name_last,
        phone: form.student.phone,
        future_reminder_notification_time: '22:00:00',
        notification_time: '12:00:00'
      }
    }
    actions.auth
      .registerUser(newUser)
      .then(() => {
        // actions.auth.verifyStudentPhoneNumber({phone: newUser.student.phone}).then(() => {
        this.props.history.push({ pathname: '/o' })
        // })
      })
      .catch(error => console.log(error))
  }

  render () {
    return (
      <div id="promo-signup" className="container-promo-signup">
        <div className="container-form-register">
          <div id="sign-up-form">
            <SignUpForm
              {...this.props}
              header={
                <div>
                  <h1>Sign up<small>It&apos;s free!</small></h1>
                </div>
              }
              buttonText="Sign up"
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

export default withRouter(Signup)
