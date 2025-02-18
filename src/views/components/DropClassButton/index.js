import React from 'react'
import actions from '../../../actions'
import SkModal from '../SkModal/SkModal'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'

@inject('rootStore') @observer
class DropClassButton extends React.Component {
  state = {
    showDropClassConfirm: false
  }

  onDropClass () {
    this.setState({showDropClassConfirm: true})
  }

  async onDropClassConfirm () {
    this.setState({loading: true})
    this.props.rootStore.studentClassesStore.updateClasses()
    this.props.rootStore.studentAssignmentsStore.updateAssignments()
    await actions.classes.dropClass(this.props.cl.id).catch(r => console.log(r))
      .then(() => {
        this.props.rootStore.studentClassesStore.updateClasses()
        this.props.rootStore.studentAssignmentsStore.updateAssignments()
      })
    this.props.onDropClass()
  }

  renderDropClassConfirm () {
    return (
      <SkModal>
        <div className='sk-drop-class-modal'>
          <h3>Are you sure you want to drop this class?</h3>
          <div
            className='sk-drop-class-modal-yes'
            onClick={() => this.onDropClassConfirm()}
          >
            <p>Yes, drop class.</p>
          </div>
          <div
            className='sk-drop-class-modal-no'
            onClick={() => this.setState({showDropClassConfirm: false})}
          >
            <p>No, stay in this class.</p>
          </div>
        </div>
      </SkModal>
    )
  }

  renderDropButton () {
    return (
      <div
        className='sk-drop-class'
      >
        {this.props.icon
          ? <i className='fas fa-arrow-alt-circle-down' onClick={() => this.onDropClass()} />
          : <p
            onClick={() => this.onDropClass()}
          >Drop this class</p>
        }
      </div>
    )
  }

  render () {
    return (
      <div>
        {this.renderDropButton()}
        {this.state.showDropClassConfirm &&
          this.renderDropClassConfirm()
        }
      </div>
    )
  }
}

DropClassButton.propTypes = {
  cl: PropTypes.object,
  onDropClass: PropTypes.func,
  rootStore: PropTypes.object,
  icon: PropTypes.bool
}

export default DropClassButton
