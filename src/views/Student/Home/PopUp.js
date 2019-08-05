import React from 'react'
import { inject, observer } from 'mobx-react'
import SkModal from '../../components/SkModal/SkModal'
import PropTypes from 'prop-types'
import FirstClass from '../Onboard/FirstClass/index'

@inject('rootStore') @observer
class PopUp extends React.Component {
  closeModal = () => {
    this.props.rootStore.userStore.setPopUpState(false)
    this.props.closeModal()
  }

  renderNeedSyllabusPopUp () {
    return (
      <div style={{padding: '2rem', maxWidth: '380px'}}>
        <FirstClass disableNext={true} />
      </div>
    )
  }

  render () {
    return (
      <SkModal closeModal={() => this.closeModal()}>
        {this.renderNeedSyllabusPopUp()}
      </SkModal>
    )
  }
}

PopUp.propTypes = {
  closeModal: PropTypes.func,
  rootStore: PropTypes.obj
}

export default PopUp
