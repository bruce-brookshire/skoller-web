import React from 'react'
import LoginForm from '../LoginForm'
import PropTypes from 'prop-types'
import {browserHistory} from 'react-router'
import actions from '../../../actions'

class LandingNav extends React.Component {
  onSubmitLogin () {
    const { userStore: { user } } = this.props.rootStore

    if (user.student) {
      if (user.student.is_verified) {
        actions.classes.getStudentClassesById(user.student.id).then((classes) => {
          classes.length > 0
            ? browserHistory.push('/student/classes')
            : browserHistory.push('/student/find-classes')
        }).catch(() => false)
      } else {
        browserHistory.push('/student/verify')
      }
    } else {
      browserHistory.push('/hub')
    }
  }

  render () {
    return (
      <div className='cn-landing-navbar'>
        <div className='cn-navbar-content'>
          <h1>
            <a onClick={() => { browserHistory.push('/landing'); window.scrollTo(0, 0) }} ><img alt="Skoller" className='logo' src={this.props.imgPath || 'src/assets/images/logo-wide-blue@1x.png'} /></a>
          </h1>
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

export default LandingNav
