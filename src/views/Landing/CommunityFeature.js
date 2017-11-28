import React from 'react'


class CommunityFeature extends React.Component {
    render () {
      return (
        <div className=''>
            <div className='row'>
                <h3>Plus, a community you can't find anywhere else.</h3>
            </div>
            <div className='row'>
                <div>
                    <img src='src/assets/images/landing_page/chat@2x.png'/>
                    <img src='src/assets/images/landing_page/updates@2x.png'/>
                </div>
                <div>
                    <p>
                        As the semester goes on, your class schedules are bound to change. With ClassNav's Updates, you and your classmatets have nothing to worry about.
                        When one student adjusts their schedule on ClassNav, all classmates get a notification with the option to copy or 
                        dismiss the change.
                    </p>
                    <p>
                        Wanna talk to your classmates about what's going on in class? Our chat feature let's you and
                        your classmates talk about whatever you want. You can even talk to everyone at your school by 
                        posting on the university feed.
                    </p>
                </div>
            </div>           
        </div>
      )
    }
}

export default CommunityFeature