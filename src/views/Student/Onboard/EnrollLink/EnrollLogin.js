import React from 'react'
import PropTypes from 'prop-types'
import {Cookies} from 'react-cookie'
import actions from '../../../../actions'
import NumberFormat from 'react-number-format'

class EnrollLogin extends React.Component {
  constructor (props) {
    super(props)

    this.cookie = new Cookies()

    this.state = {
      form: {
        phone: ''
      }
    }
  }

  handlePhoneChange = e => {
    const phone = e.target.value
    this.setState({
      form: {
        phone: phone
      }
    })
  }

  onSubmit = (event) => {
    event.preventDefault()
    actions.auth.verifyStudentPhoneNumber(this.state.form).then(() => {
      this.props.onSubmit(this.state.form.phone)
    }).catch(() => false)
  }

  render () {
    return (
      <div>
        <form className="sk-enroll-login" onSubmit={(e) => this.onSubmit(e)}>
          <div className='sk-enroll-login-number' >
            <NumberFormat
              placeholder='Phone number'
              format="+1 (###) ###-####"
              mask=" "
              onValueChange={(values) => {
                const {value} = values
                this.setState({
                  form: {
                    phone: value
                  }
                })
              }}
            />
          </div>

          <button type="submit" className="button">Login</button>
        </form>
      </div>
    )
  }
}

EnrollLogin.propTypes = {
  onSubmit: PropTypes.function
}

export default EnrollLogin
