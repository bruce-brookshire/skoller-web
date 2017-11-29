import React from 'react'
import Slant from '../../components/Slant'

class FeatureHighlights extends React.Component {
  render () {
    return (
      <div className='even-section'>
        
        <h3>{'ClassNav answers all of the biggest questions you\'ll have throughout your semester.'}</h3>

        <div className='row'>
          <div>
            <img src='src/assets/images/landing_page/Calendar@2x.png'/>
          </div>
          <div>
            <img src='src/assets/images/landing_page/Tasks@2x.png'/>
          </div>
          <div>
            <img src='src/assets/images/landing_page/Classes@2x.png'/>
          </div>
          <div>
            <img src='src/assets/images/landing_page/Tasks@2x.png'/>
          </div>
        </div>
      </div>
    )
  }
}

export default FeatureHighlights
