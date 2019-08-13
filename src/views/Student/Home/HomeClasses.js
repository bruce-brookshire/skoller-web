import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import ClassList from '../../components/ClassList'
import Sammi from '../../components/Sammi'

@inject('rootStore') @observer
class HomeClasses extends React.Component {
  render () {
    return (
      <div className='home-classes'>
        <ClassList
          classes={this.props.classes}
          emptyMessage='You are not enrolled in any classes.'
          onSelect={this.props.onClassSelect}
        />
        {this.props.classes.length === 0 &&
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', margin: '1rem 0'}}>
            <button className='button add-button' onClick={() => this.props.onAddClass()}>
              Join a Class
            </button>
          </div>
        }
        {this.props.classes.length === 1 &&
          <div className='home-classes-sammi-container'>
            <Sammi
              emotion='wow'
              position='left'
            >
              <div className='home-classes-sammi-message'>
                <p>You&apos;ve joined your first class!</p>
                <div className='home-classes-sammi-button'>
                  <p onClick={() => this.props.onAddClass()}>Click here to join another.</p>
                </div>
              </div>
            </Sammi>
          </div>
        }
      </div>
    )
  }
}

HomeClasses.propTypes = {
  classes: PropTypes.object,
  onAddClass: PropTypes.function,
  onClassSelect: PropTypes.function
}

export default HomeClasses
