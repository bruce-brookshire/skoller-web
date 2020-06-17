import React from 'react'
// import {inject, observer} from 'mobx-react'
import PropTypes from 'prop-types'
import Sammi from '../index'
import AddClassModal from '../../../Student/MyClasses/AddClassModal'

class SecondClassPrompt extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      showAddClassModal: false
    }
  }

  closeAddClassModal () {
    if (this.props.onAddClass) {
      this.props.onAddClass()
    }
    this.setState({showAddClassModal: false})
  }

  render () {
    if (this.props.show) {
      return (
        <div>
          <Sammi
            emotion='wow'
            position='left'
          >
            <div className='sammi-prompt-message'>
              <p>You&apos;ve joined your first class!</p>
              <div className='sammi-prompt-button'>
                <p onClick={() => this.setState({showAddClassModal: true})}>Click here to join another.</p>
              </div>
            </div>
          </Sammi>
          {this.state.showAddClassModal &&
            <AddClassModal closeModal={() => this.closeAddClassModal()} />
          }
        </div>
      )
    } else {
      return null
    }
  }
}

SecondClassPrompt.propTypes = {
  show: PropTypes.bool,
  onAddClass: PropTypes.func
}

export default SecondClassPrompt
