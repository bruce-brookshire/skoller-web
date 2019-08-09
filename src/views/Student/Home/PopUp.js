import React from 'react'
import { inject, observer } from 'mobx-react'
import SkModal from '../../components/SkModal/SkModal'
import PropTypes from 'prop-types'
import FirstClass from '../Onboard/FirstClass/index'
import SelectSchool from '../Onboard/SelectSchool';

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

  renderSetPrimarySchoolPopUp () {
    return (
      <div style={{padding: '2rem', maxWidth: '380px'}}>
        <SelectSchool
          renderPartner={() => { return null }}
          onSubmit={() => this.closeModal()}
          customMessage={'Please tell me your school and current term so I can help you find your classes!'}
        />
      </div>
    )
  }

  render () {
    return (
      <div>
        {this.props.type === 'needSyllabus' &&
          <SkModal closeModal={() => this.closeModal()}>
            {this.renderNeedSyllabusPopUp()}
          </SkModal>
        }
        {this.props.type === 'needPrimarySchool' &&
          <SkModal>
            {this.renderSetPrimarySchoolPopUp()}
          </SkModal>
        }
      </div>
    )
  }
}

PopUp.propTypes = {
  closeModal: PropTypes.func,
  rootStore: PropTypes.obj,
  type: PropTypes.string
}

export default PopUp
