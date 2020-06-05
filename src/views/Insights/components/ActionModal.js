import React, { Component } from 'react'
import PropTypes from 'prop-types'
import GentleModal from './GentleModal'

export default class ActionModal extends Component {
  constructor (props) {
    super(props)

    this.state = {
      showActions: false
    }
  }

  static propTypes = {
    children: PropTypes.object
  }

  renderActions () {
    return (
      <GentleModal closeModal={() => this.setState({showActions: false})} show={this.state.showActions}>
        {this.props.children}
      </GentleModal>
    )
  }

  render () {
    return (
      <span className='si-action-modal' style={{marginLeft: '8px'}}>
        {this.renderActions()}
        <i onClick={() => this.setState({showActions: true})} className='fas fa-ellipsis-h' />
      </span>
    )
  }
}
