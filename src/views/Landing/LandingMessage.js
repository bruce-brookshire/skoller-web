import React from 'react'

class LandingMessage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      imageSrc: '/src/assets/images/landing_collaborate.png'
    }
  }

  render () {
    return (
      <div className='container-landing-message'>
        <div className='landing-image-carousel'>
          <div className='landing-image-carousel-container'>
            <div className='landing-image-container'>
              <img src={require('../../assets/images/landing_collaborate.png')} className='landing-image' />
            </div>
            <div className='landing-image-text'>A better way for students to <b>Collaborate</b></div>
          </div>
          <div className='landing-image-carousel-container'>
            <div className='landing-image-container'>
              <img src={require('../../assets/images/landing_organize.png')} className='landing-image' />
            </div>
            <div className='landing-image-text'>A better way for students to <b>Organize</b></div>
          </div>
          <div className='landing-image-carousel-container'>
            <div className='landing-image-container'>
              <img src={require('../../assets/images/landing_keepup.png')} className='landing-image' />
            </div>
            <div className='landing-image-text'>A better way for students to <b>Keep Up</b></div>
          </div>
        </div>
      </div>
    )
  }
}

export default LandingMessage
