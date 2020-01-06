import React from 'react'
import { inject, observer } from 'mobx-react'
import SkModal from '../../components/SkModal/SkModal'
import PropTypes from 'prop-types'
import FirstClass from '../Onboard/FirstClass/index'
import SelectSchool from '../Onboard/SelectSchool'
import AddClassModal from '../MyClasses/AddClassModal'
import MajorForm from '../MiscViews/MajorForm'
import DocumentsForm from '../Jobs/components/DocumentsForm';

@inject('rootStore') @observer
class PopUp extends React.Component {
  closeModal = () => {
    this.props.rootStore.userStore.setPopUpState(false)
    this.props.closeModal()
  }

  renderNeedSyllabusPopUp () {
    return (
      <div className='sk-pop-up'>
        <FirstClass disableNext={false} />
      </div>
    )
  }

  renderSetPrimarySchoolPopUp () {
    return (
      <div className='sk-pop-up'>
        <SelectSchool
          renderPartner={() => { return null }}
          onSubmit={() => this.closeModal()}
          customMessage={'Please tell me your school and current term so I can help you find your classes!'}
        />
      </div>
    )
  }

  renderFindClassPopUp () {
    return (
      <div className='sk-pop-up'>
        <AddClassModal closeModal={() => this.props.closeModal()} />
      </div>
    )
  }

  renderGetMajor () {
    return (
      <div className='sk-pop-up'>
        <MajorForm onSubmit={() => this.props.closeModal()} />
      </div>
    )
  }

  renderGetResume () {
    return (
      <div className='sk-pop-up'>
        <DocumentsForm homeModal={true} rootStore={this.props.rootStore} onSubmit={() => this.props.closeModal()} />
      </div>
    )
  }

  render () {
    return (
      <div className='sk-pop-up-container'>
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
        {this.props.type === 'findClass' &&
          <SkModal>
            {this.renderFindClassPopUp()}
          </SkModal>
        }
        {this.props.type === 'getMajor' &&
          <SkModal closeModal={() => this.closeModal()}>
            {this.renderGetMajor()}
          </SkModal>
        }
        {this.props.type === 'getResume' &&
          <SkModal closeModal={() => this.closeModal()}>
            {this.renderGetResume()}
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
