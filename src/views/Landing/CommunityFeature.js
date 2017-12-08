import React from 'react'
import Slant from '../../components/Slant'

class CommunityFeature extends React.Component {
  render () {
    return (
      <div>
        <Slant className='slant-inverse'/>
        <h3 className='section-topper section-header' >Plus, a <span className='blue-text'>community</span> {'you can\'t find anywhere else.'}</h3>
        <div className='row section-header'>
          <div className='col-xs-12 col-sm-6'>
            <div className='twin-image-div'>
              <img className='twin-image' src='src/assets/images/landing_page/chat@2x.png'/>
              <img className='twin-image twin-image-top' src='src/assets/images/landing_page/updates@2x.png'/>
            </div>
          </div>
          <div className='col-xs-12 col-sm-6 paragraph-spacing'>
            <p>As the semester goes on, your class schedules are bound to change. <span className='blue-text'>{'With ClassNav\'s Updates, you and your classmatets have nothing to worry about.'}</span> When one student adjusts their schedule on ClassNav, all classmates get a notification with the option to copy or dismiss the change.
            </p>
            <p>{'Wanna talk to your classmates about what\'s going on in class?'} <span className='blue-text'>{'Our chat feature let\'s you and your classmates talk about whatever you want.'}</span> You can even talk to everyone at your school by posting on the university feed.
            </p>
          </div>
        </div>

      </div>
    )
  }
}

export default CommunityFeature
