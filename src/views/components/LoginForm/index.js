import React from 'react'
import PropTypes from 'prop-types'
import LoginVerificationModal from './LoginVerificationModal'
import {Cookies} from 'react-cookie'
import actions from '../../../actions'
import NumberFormat from 'react-number-format'

class LoginForm extends React.Component {
  static propTypes = {
    rootStore: PropTypes.object,
    onSubmit: PropTypes.func
  }

  constructor (props) {
    super(props)

    this.cookie = new Cookies()

    this.state = {
      form: {
        phone: ''
      },
      showLoginVerificationModal: false,
      loginButtonDisabled: false
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

  closeModal = () => {
    this.setState({showLoginVerificationModal: false})
  }

  onSubmit = (event) => {
    event.preventDefault()
    this.setState({loginButtonDisabled: true})
    actions.auth.verifyStudentPhoneNumber(this.state.form).then(() => {
      this.setState({loginButtonDisabled: false})
      this.setState({showLoginVerificationModal: true})
    }).catch(() => {
      console.log("Error occurred LoginForm.onSubmit")
      this.setState({loginButtonDisabled: false})
    })
  }

  render () {
    const loginButtonDisabled = this.state.loginButtonDisabled ? 'disabled' : '';
    return (
      <div>
        <form className="form-login" onSubmit={this.onSubmit}>
          <div className='form-control' >
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
              type="tel"
            />
          </div>
          <button 
            type="submit" 
            className={`button ${loginButtonDisabled}`} 
            disabled={this.state.loginButtonDisabled}
          >Login</button>
        </form>
        {this.state.showLoginVerificationModal
          ? <LoginVerificationModal phone={this.state.form.phone} closeModal={this.closeModal}/>
          : null
        }
      </div>
    )
  }
}

export default LoginForm
