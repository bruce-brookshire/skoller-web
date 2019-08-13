import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import ClassList from '../../components/ClassList'

@inject('rootStore') @observer
class HomeClasses extends React.Component {
  render () {
    return (
      <div>
        <ClassList
          classes={this.state.classes}
          emptyMessage='You are not enrolled in any classes.'
          onSelect={() => this.props.onClassSelect()}
        />
        {this.state.classes.length === 0 &&
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', margin: '1rem 0'}}>
            <button className='button add-button' onClick={() => this.props.onClick()}>
              Join a Class
            </button>
          </div>
        }
      </div>
    )
  }
}

HomeClasses.propTypes = {
  classes: PropTypes.object,
  onClick: PropTypes.function,
  onClassSelect: PropTypes.function
}

export default HomeClasses
