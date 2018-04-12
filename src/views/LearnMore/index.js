import React from 'react'
import LandingNav from '../components/LandingNav'
import {inject, observer} from 'mobx-react'

@inject('rootStore') @observer
class LearnMore extends React.Component {
  render () {
    return (
      <div>
        <LandingNav rootStore={this.props.rootStore} />
      </div>
    )
  }
}

export default LearnMore
