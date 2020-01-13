import React from 'react'
import logo from '.././../../../assets/images/jobs/skoller-jobs-logo.png'
import PropTypes from 'prop-types'

class Welcome extends React.Component {
  render () {
    return (
      <div className='jobs-welcome'>
        <div className='jobs-welcome-headline'>
          <p className='jobs-welcome-welcome'>Welcome to</p>
          <div className='jobs-welcome-logo' style={{
            backgroundImage: `url(${logo})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center'
          }} />
          <p className='jobs-welcome-subtitle'>From the classroom to your dream career.</p>
        </div>
        <div className='jobs-welcome-description'>
          <div className='jobs-welcome-description-row'>
            <div className='jobs-welcome-description-title'><i className='far fa-star' /> BUILD A ROCKSTAR PROFILE</div>
            <div className='jobs-welcome-description-text'>Tell us more about your accomplishments and what you value in the workplace.</div>
          </div>
          <div className='jobs-welcome-description-row'>
            <div className='jobs-welcome-description-title'><i className='far fa-clock' /> SHOW OFF YOUR PROGRESS</div>
            <div className='jobs-welcome-description-text'>Let your progress on Skoller and your initiative in staying organized speak for itself!</div>
          </div>
          <div className='jobs-welcome-description-row'>
            <div className='jobs-welcome-description-title'><i className='far fa-handshake' /> LAND THE JOB YOU LOVE</div>
            <div className='jobs-welcome-description-text'>Skoller leverages your detailed profile to help you match with your dream career.</div>
          </div>
        </div>
        <div className='jobs-welcome-button'>
          <p onClick={() => this.props.onSubmit()}>
            Get started
          </p>
        </div>
      </div>
    )
  }
}

Welcome.propTypes = {
  onSubmit: PropTypes.func
}

export default Welcome
