import React from 'react'
import PropTypes from 'prop-types'
import actions from '../../../actions'

class FindClasses extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      
    }
  }

  /*
  * Fetch the classes for a user.
  */
  componentWillMount () {
  }

  render () {
    return (
      <div className='cn-find-classes-container'>
        <div className='cn-find-classes-content'>
          <div className='cn-find-classes-header'>
            <h2>Set up or find a class</h2>
            <p>Make sure this info is correct so your classmates can find the class!</p>
          </div>
        </div>
      </div>
    )
  }
}

export default FindClasses
