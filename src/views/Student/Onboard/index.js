import React from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import Onboard from './Onboard'
import EnrollLink from './EnrollLink/index'

@inject('rootStore') @observer
class Switch extends React.Component {
  render () {
    if (this.props.route.type === 'onboard') {
      return (
        <Onboard params={this.props.params} />
      )
    } else if (this.props.route.type === 'e') {
      return (
        <EnrollLink params={this.props.params} />
      )
    }
  }
}

Switch.propTypes = {
  params: PropTypes.object,
  route: PropTypes.object
}

export default Switch
