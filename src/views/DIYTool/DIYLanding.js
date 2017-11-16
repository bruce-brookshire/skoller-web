import React from 'react'
import PropTypes from 'prop-types'
import {browserHistory} from 'react-router'

class DIYLanding extends React.Component {
  onNext () {
    browserHistory.push('/diy/tool')
  }
  render () {
    return (
      <div className='cn-diy-landing-container'>
        <div className='row content-container'>
          <div className='col-xs-12 col-sm-6 left-align'>
            <div>
              <h1>You are a hero.</h1>
              <p className='info'>{`The informtion you're grabbing from this syllabus only has to be inputted one time. This will set up the class for you and all yof your classmates, so please be sure the information is correct.`}</p>
              <p className='info'>{`Don't worry, we'll show you exactly what to do. this should on take a minute or two per class.`}</p>
            </div>
            <button className='button full-width' onClick={this.onNext.bind(this)}>Next</button>
          </div>
        </div>
      </div>
    )
  }
}

export default DIYLanding
