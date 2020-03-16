import React from 'react'
import LoginForm from '../LoginForm'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import actions from '../../../actions'

class LandingNav extends React.Component {
  onSubmitLogin () {
    const { userStore: { user } } = this.props.rootStore

    if (user.student) {
      if (user.student.is_verified) {
        actions.classes.getStudentClassesById(user.student.id).then((classes) => {
          classes.length > 0
            ? this.props.history.push('/student/classes')
            : this.props.history.push('/student/find-classes')
        }).catch(() => false)
      } else {
        this.props.history.push('/student/verify')
      }
    } else {
      this.props.history.push('/hub')
    }
  }

  render () {
    return (
      <div className='cn-landing-navbar'>
        <div className='cn-navbar-content'>
          <div className='cn-navbar-logo'>
            <a onClick={() => { this.props.history.push('/landing'); window.scrollTo(0, 0) }} ><img alt="Skoller" className='logo' src={this.props.imgPath || 'src/assets/images/logo-wide-blue@1x.png'} /></a>
            <span className='cn-navbar-slogan'>Keep Up with Classes, Together</span>
          </div>
          {!this.props.noLogin && <LoginForm
            rootStore={this.props.rootStore}
            onSubmit={() => this.onSubmitLogin()}
          />}
        </div>
      </div>
    )
  }
}

LandingNav.propTypes = {
  rootStore: PropTypes.object,
  noLogin: PropTypes.bool,
  imgPath: PropTypes.string
}

export default withRouter(LandingNav)
