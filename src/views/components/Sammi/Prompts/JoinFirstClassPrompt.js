import React from 'react'
import PropTypes from 'prop-types'
import Sammi from '../index'
import AddClassModal from '../../../Student/MyClasses/AddClassModal'

class JoinFirstClassPrompt extends React.Component {
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
              <div className='sammi-prompt-button' style={{padding: '0.5rem 1rem'}}>
                <p onClick={() => this.setState({showAddClassModal: true})}>Join your first class!</p>
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

JoinFirstClassPrompt.propTypes = {
  show: PropTypes.bool,
  onAddClass: PropTypes.function
}

export default JoinFirstClassPrompt
