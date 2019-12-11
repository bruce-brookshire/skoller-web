import React from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import Onboard from './Onboard'
import EnrollLink from './EnrollLink/index'
import StudentLink from './EnrollLink/StudentLink'

@inject('rootStore') @observer
class Switch extends React.Component {
  componentDidMount () {
    this.props.rootStore.studentNavStore.onboarding = true
  }

  componentWillUMount () {
    this.props.rootStore.studentNavStore.onboarding = true
  }
  render () {
    if (this.props.route.type === 'onboard') {
      return (
        <Onboard params={this.props.params} />
      )
    } else if (this.props.route.type === 'e') {
      return (
        <EnrollLink params={this.props.params} />
      )
    } else if (this.props.route.type === 's') {
      return (
        <StudentLink params={this.props.params} isStudent={true} />
      )
    }
  }
}

Switch.propTypes = {
  params: PropTypes.object,
  route: PropTypes.object,
  rootStore: PropTypes.object
}

export default Switch
