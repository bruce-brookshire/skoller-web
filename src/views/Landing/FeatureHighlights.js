import React from 'react'
import Slant from '../../components/Slant'

class FeatureHighlights extends React.Component {
  render () {
    return (
      <div className='even-section'>
        
        <h3 className='section-topper section-header blue-section-text'>{'ClassNav answers all of the biggest questions you\'ll have throughout your semester.'}</h3>

        <div className='row'>
          <div className='col-xs-12 col-sm-3'>
            <h1>Filler</h1>
            <div className='speech-bubble'>          
              <p>This is the speech bubble</p>
            </div>
            <img className='highlights-images' src='src/assets/images/landing_page/Calendar@2x.png'/>
          </div>
          <div className='col-xs-12 col-sm-3'>
            <img className='highlights-images' src='src/assets/images/landing_page/Tasks@2x.png'/>
          </div>
          <div className='col-xs-12 col-sm-3'>
            <h1>Filler</h1>
            <img className='highlights-images' src='src/assets/images/landing_page/Classes@2x.png'/>
          </div>
          <div className='col-xs-12 col-sm-3'>
            <img className='highlights-images' src='src/assets/images/landing_page/Tasks@2x.png'/>
          </div>
        </div>
      </div>
    )
  }
}

export default FeatureHighlights
