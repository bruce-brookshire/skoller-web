import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'

@inject('rootStore') @observer
class HomeTasks extends React.Component {
  render () {
    return (
      <div className='home-tasks'>
        {this.props.classes.length === 0 &&
          <p style={{textAlign: 'center', color: 'rgba(0,0,0,0.30)', margin: '3rem 0'}}>No tasks yet.</p>
        }
      </div>
    )
  }
}

HomeTasks.propTypes = {
  classes: PropTypes.object,
  onAddClass: PropTypes.function,
  onClassSelect: PropTypes.function
}

export default HomeTasks
