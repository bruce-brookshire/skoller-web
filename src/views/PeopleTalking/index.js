import React from 'react'
import LandingNav from '../components/LandingNav'
import {inject, observer} from 'mobx-react'
import LandingFooter from '../components/LandingFooter'
import WhoTalking from './WhoTalking'
import CallToAction from '../LearnMore/CallToAction'

@inject('rootStore') @observer
class PeopleTalking extends React.Component {
  render () {
    return (
      <div className='cn-people-talking-container'>
        <LandingNav rootStore={this.props.rootStore} />
        <div className='cn-people-talking-content'>
          <h2 className='center-text'>Here&apos;s what people are saying about us</h2>
          <div className='cn-people-talking-who'>
            <div className='video-wrapper'>
              <div className='video'>
                <iframe src="https://www.youtube.com/embed/7RYLsLhkjFc" frameBorder="0" allowFullScreen></iframe>
              </div>
            </div>
            <WhoTalking />
          </div>
          <div className='testimonials'>
            <div className='testimonial'>
              This app combines everything that I have ever needed to keep up with classes. I recommend to everyone in college! My semester was significantly easier because of this app
            </div>
            <div className='testimonial'>
              I love this app. It has been a lifesaver. I have had trouble staying on top of and keeping track of my assignments in the past and Skoller has been a huge help in helping me work towards fixing that problem.
            </div>
            <div className='testimonial'>
              Overall I love the app! Very helpful in not letting me forget about assignments and lowers the stress of possibly missing a due date.
            </div>
            <div className='testimonial'>
              I love that it reminded me, days in advance, it saved me from &quot;O sh*t&quot; moments   ----- My favorite lol
            </div>
            <div className='testimonial'>
              Skoller&apos;s grade calculator and tracker has stepped in where my university&apos;s platform failed. I can see how I&apos;m doing in all my classes in one place and keep myself on target more easily than clicking back through each individual syllabus. Love it!
            </div>
            <div className='testimonial'>
              Really amazing app! I wish more people would use it. It has helped me streamline my semester and made keeping up with assignments easier. I love Skoller!
            </div>
          </div>
        </div>
        <CallToAction/>
        <LandingFooter />
      </div>
    )
  }
}

export default PeopleTalking
