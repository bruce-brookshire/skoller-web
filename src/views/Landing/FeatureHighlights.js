import React from 'react'
import Slant from '../../components/Slant'

class FeatureHighlights extends React.Component {
  render () {
    return (
      <div className='even-section'>
        <Slant/>
        <h3 className='section-topper section-header blue-section-text'>{'Skoller answers all of the biggest questions you\'ll have throughout your semester.'}</h3>
        <div className='section-header'>
          <div className='row'>
            <div className='col-xs-6 col-sm-3'>
              <div className='speech-bubble'>
                <p>{'When\'s the best weekend to go on that big road trip?'}</p>
                <div className='triangle-inner' />
              </div>
              <img className='highlights-images' src='src/assets/images/landing_page/Calendar@2x.png'/>
            </div>
            <div className='col-xs-6 col-sm-3'>
              <img className='highlights-images' src='src/assets/images/landing_page/Tasks@2x.png'/>
              <div className='speech-bubble invert'>
                <p className='invert'>{'What\'s most important to work on today?'}</p>
                <div className='triangle-inner' />
              </div>
            </div>
            <div className='col-xs-6 col-sm-3'>
              <div className='speech-bubble'>
                <p>How am I doing in all my classes?</p>
                <div className='triangle-inner' />
              </div>
              <img className='highlights-images' src='src/assets/images/landing_page/Classes@2x.png'/>
            </div>
            <div className='col-xs-6 col-sm-3'>
              <img className='highlights-images' src='src/assets/images/landing_page/Tasks@2x.png'/>
              <div className='speech-bubble invert'>
                <p className='invert'>What do I need to make on the rest of my assignments to get the grade I want?</p>
                <div className='triangle-inner' />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default FeatureHighlights
