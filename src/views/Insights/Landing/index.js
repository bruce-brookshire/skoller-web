import React from 'react'
import LandingNav from '../../components/LandingNav'
import LandingFooter from '../../components/LandingFooter'
import Dashboard from '../Dashboard'

class InsightsLanding extends React.Component {
  constructor (props) {
    super(props)

    this.state = {}
  }

  render () {
    return (
      <div className='si-landing'>
        <LandingNav />
        <div className='si-landing-content'>
          <h1>Skoller Insights</h1>
          <h1><span>🏋🏾🏌🏼⛹🏽‍♀️</span></h1>
          <Dashboard />
        </div>
        <LandingFooter />
      </div>
    )
  }
}

export default InsightsLanding
