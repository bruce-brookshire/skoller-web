import React from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import Onboard from './Onboard'
import EnrollLink from './EnrollLink/index'
import StudentLink from './EnrollLink/StudentLink'

@inject('rootStore') @observer
class Switch extends React.Component {
  componentDidMount () {
    this.props.rootStore.navStore.onboarding = true
  }

  componentWillUMount () {
    this.props.rootStore.navStore.onboarding = true
  }

  render () {
    console.log(this.props)
    if (this.props.type === 'onboard') {
      return (
        <Onboard params={this.props.match.params} />
      )
    } else if (this.props.type === 'e') {
      return (
        <EnrollLink params={this.props.match.params} />
      )
    } else if (this.props.type === 's') {
      return (
        <StudentLink params={this.props.match.params} isStudent={true} />
      )
    }
  }
}

Switch.propTypes = {
  params: PropTypes.object,
  route: PropTypes.object,
  rootStore: PropTypes.object,
  type: PropTypes.string
}

export default withRouter(Switch)
