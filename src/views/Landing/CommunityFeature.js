import React from 'react'

class CommunityFeature extends React.Component {
  render () {
    return (
      <div className='section-community-feature'>
        <div className="content">
          <h2 className='section-header'>Plus, a <span className='blue-text'>community</span> you can't find anywhere else.</h2>
          <div className='row'>
            <div className='col-xs-12 col-sm-6'>
              <div className='twin-image'>
                <img src='src/assets/images/landing_page/chat@2x.png'/>
                <img src='src/assets/images/landing_page/updates@2x.png'/>
              </div>
            </div>
            <div className='col-xs-12 col-sm-6 copy'>
              <p>As the semester goes on, your class schedules are bound to change.&nbsp;
                <span className='blue-text'>
                  {'With Skoller\'s Updates, you and your classmates have nothing to worry about.'}
                </span> When one student adjusts their schedule on Skoller, all classmates get a notification with the option to copy or dismiss the change.
              </p>
              <p>{'Wanna talk to your classmates about what\'s going on in class?'} <span className='blue-text'>{'Our chat feature let\'s you and your classmates talk about whatever you want.'}</span> You can even talk to everyone at your school by posting on the university feed.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CommunityFeature
