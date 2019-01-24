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
        <img src={require('../../assets/images/landing_collaborate.png')} className='image-landing-message' />
        <img src={require('../../assets/images/landing_keepup.png')} className='image-landing-message' />
        <img src={require('../../assets/images/landing_organize.png')} className='image-landing-message' />
      </div>
    )
  }
}

export default LandingMessage
