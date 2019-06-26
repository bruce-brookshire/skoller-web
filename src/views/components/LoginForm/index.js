import React from 'react'
import PropTypes from 'prop-types'
import LoginVerificationModal from './LoginVerificationModal'
import SkModal from '../../components/SkModal/SkModal'
import {Cookies} from 'react-cookie'
import actions from '../../../actions'

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
      showLoginVerificationModal: false
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
    actions.auth.verifyStudentPhoneNumber(this.state.form).then(() => {
      this.setState({showLoginVerificationModal: true})
    }).catch(() => false)
    // if (this.props.validateForm(this.state.form, requiredFields)) {
    //   console.log(this.state.form)
    //   actions.auth.authenticateUser(this.state.form).then(() => {
    //     this.props.resetValidation()

    //     const { userStore: { authToken } } = this.props.rootStore
    //     this.cookie.remove('skollerToken', { path: '/' })
    //     this.cookie.set('skollerToken', authToken, { maxAge: 86400 * 7, path: '/' })
    //     if (this.props.onSubmit) {
    //       this.props.onSubmit()
    //     }
    //   }).catch(() => false)
    // }
  }

  render () {
    return (
      <form className="form-login" onSubmit={this.onSubmit}>
        <div className='form-control' >
          <input
            onChange={this.handlePhoneChange}
            type='text'
            placeholder='Phone number'
          />
        </div>

        <button type="submit" className="button">Login</button>
        {this.state.showLoginVerificationModal
          // ? <SkModal><p>cool modal</p></SkModal>
          ? <LoginVerificationModal phone={this.state.form.phone} closeModal={this.closeModal}/>
          : null
        }
      </form>
    )
  }
}

export default LoginForm
