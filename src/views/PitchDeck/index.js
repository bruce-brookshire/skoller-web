import React from 'react'
import LandingNav from '../components/LandingNav'
import LandingFooter from '../components/LandingFooter'

class PitchDeck extends React.Component {
  render () {
    return (
      <div id='cn-pitch-deck'>
        <LandingNav
          hideLogin={true}
        />
        <div id='cn-pitch-container'>
          <iframe
            src="https://docs.google.com/presentation/d/e/2PACX-1vTRHFiq3gcYXfZswP46WP3eYkA1O9GIx4KBVTzVONByMLt0FYb_YtkA28EmCHxB__qgenMSXNBv1DJj/embed?start=false&loop=false&delayms=60000"
            frameBorder="0"
            allowFullScreen="true"
            mozallowfullscreen="true"
            webkitallowfullscreen="true">
          </iframe>
        </div>
        <LandingFooter />
      </div>
    )
  }
}
export default PitchDeck
