import React from 'react'
import {browserHistory} from 'react-router'

class Faq extends React.Component {
  render () {
    return (
      <div className='cn-faq-container'>
        <div className='content-landing'>
          <div className="center-text">
            <h2>
              <img
                className='faq-logo'
                onClick={() => { browserHistory.push('/landing') }}
                src='../../../src/assets/images/logo-wide-blue@1x.png'/>
              <span style={{display: 'block'}}>Skoller FAQ</span>
            </h2>
            <em>Last modified: January 2018</em>
          </div>
          <div className='faq-content'>
            <div className='faq-section'>
              <h3 className='center-text'>Here are some frequently asked questions about Skoller.</h3>
              <ol>
                <li>
                  <strong>Is Skoller available for all college students?</strong><br/>
                  <em>No. Skoller’s technology is currently available for students at the 14 supported schools.
                    Want Skoller available at your school? Let us know!</em>
                </li>
                <li>
                  <strong>How much does it cost?</strong><br/>
                  <em>Nothing. Skoller is free for students.</em>
                </li>
                <li>
                  <strong>Do I have to input my information into the app?</strong><br/>
                  <em>Nope! Skoller is fueled by a syllabus.
                  Students simply login to our website and submit a syllabus for each class.
                  Skoller’s team of humans and robots will grab the important information from each syllabus
                  and put it in the app within 24-36 hours.</em><br/><br/>
                  <em>The best part is Skoller <strong>crowdsources</strong> syllabus submission.
                  Once a syllabus has been submitted and processed for a class,
                  your classmates simply enroll through the app to find everything already organized for them!</em>
                </li>
                <li>
                  <strong>How is Skoller different from Blackboard/Canvas/Moodle etc.?</strong><br/>
                  <em>Skoller is a student-driven platform to help you manage your classes in the simplest and most reliable way.
                  It is not connected with your professor or university and cannot be used for assignment submission.</em>
                </li>
                <li>
                  <strong>Can I use Skoller to cheat?</strong><br/>
                  <em>Skoller strongly discourages cheating.
                  Skoller seeks to connect classmates to foster collaboration and community.
                  If you see inappropriate use of Skoller, lets us know at <a href='mailto:support@skoller.co'>support@skoller.co</a>.</em>
                </li>
                <li>
                  <strong>Can my professor use Skoller?</strong><br/>
                  <em>No. This is one aspect that makes Skoller unique and a win-win for professors and students.
                  Skoller eliminates the constant challenge professors face of having to keep class schedules
                  and everyone’s grades up-to-date. We are combining syllabus information with the power of
                  crowdsourcing to make staying on top of class information easier for everyone.</em>
                </li>
                <li>
                  <strong>Is Skoller provided by my university?</strong><br/>
                  <em>No. Skoller is independent of Universities. The app is made by and for students.</em>
                </li>
                <li>
                  <strong>Do I have to input my own grades?</strong><br/>
                  <em>Yes. This allows you to input your grades into a pre-weighted calculator
                  that will generate your exact average in the class.
                  With Skoller, you don’t have to wait on your professor to use Blackboard/Canvas
                  to see where you stand in your classes.</em>
                </li>
                <li>
                  <strong>If one of my classmates updates his/her schedule, does mine automatically update too?</strong><br/>
                  <em>No. When a student adjusts a due date or creates a new assignment,
                  classmates get a notification with the option to copy or dismiss the change.</em>
                </li>
                <li>
                  <strong>Do schedule updates ever ‘auto-update’ for an entire class?</strong><br/>
                  <em>Yes. Skoller keeps score of copies versus dismisses for each change.
                  When the score reaches a critical threshold, we auto-update the schedule for students
                  who have not yet responded to the change.</em>
                </li>
              </ol>
            </div>
            <div className='faq-section center-text'>
              Have other questions? Shoot us a note at <a href='mailto:support@skoller.co'>support@skoller.co</a>.
              We would love to hear from you!
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Faq
