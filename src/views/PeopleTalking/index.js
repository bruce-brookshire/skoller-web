import React from 'react'
import LandingNav from '../components/LandingNav'
import {inject, observer} from 'mobx-react'
import LandingFooter from '../components/LandingFooter'

@inject('rootStore') @observer
class PeopleTalking extends React.Component {
  render () {
    return (
      <div className='cn-people-talking-container'>
        <LandingNav rootStore={this.props.rootStore} />
        <div className='cn-people-talking-content'>
          
        </div>
        <LandingFooter />
      </div>
    )
  }
}

export default PeopleTalking
