import React from 'react'

class FeatureHighlights extends React.Component {
  /**
   * @TODO refactor away utility classes
   */
  render () {
    return (
      <div className='section-features'>
        <div className="content">
          <h2 className='section-header'>
            Skoller answers all of the biggest questions you&apos;ll have throughout your semester.
          </h2>
          <div className='row features'>
            <div className='feature'>
              <div className='speech-bubble'>
                <p>{'When\'s the best weekend to go on that big road trip?'}</p>
                <div className="triangle"></div>
              </div>
              <img src='src/assets/images/landing_page/Calendar@2x.png'/>
            </div>
            <div className='feature'>
              <img src='src/assets/images/landing_page/Tasks@2x.png'/>
              <div className='speech-bubble'>
                <p>{'What\'s most important to work on today?'}</p>
                <div className="triangle"></div>
              </div>
            </div>
            <div className='feature'>
              <div className='speech-bubble'>
                <p>How am I doing in all my classes?</p>
                <div className="triangle"></div>
              </div>
              <img src='src/assets/images/landing_page/Classes@2x.png'/>
            </div>
            <div className='feature'>
              <img src='src/assets/images/landing_page/Assignments@2x.png' style={{width: '65%', transform: 'rotate(18deg) translateX(30%) translateY(-5%)'}}/>
              <div className='speech-bubble'>
                <p>What do I need to make on the rest of my assignments to get the grade I want?</p>
                <div className="triangle"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default FeatureHighlights
