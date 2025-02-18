import React from 'react'
import { inject, observer } from 'mobx-react'
import SkModal from '../../components/SkModal/SkModal'
import PropTypes from 'prop-types'
import SelectSchool from '../Onboard/SelectSchool'
import AddClassModal from '../../Student/components/AddClassModal'
import MajorForm from '../MiscViews/MajorForm'
import DocumentsForm from '../Jobs/components/DocumentsForm'
import ClassStatusModal from '../../components/ClassStatusModal'
import PaymentPlans from '../../Student/components/StripeModals'
import CancelSubscriptionModal from '../components/CancelSubscriptionModal'
import LifeTimeUserModal from '../components/LifeTimeUserModal'

@inject('rootStore') @observer
class PopUp extends React.Component {
  closeModal = () => {
    this.props.rootStore.userStore.setPopUpState(false)
    if (this.props.refreshClasses) {
      this.props.refreshClasses()
    }
    this.props.closeModal()
  }

  renderNeedSyllabusPopUp () {
    return (
      // <FirstClass disableNext={false} closeModal={() => this.props.closeModal()} />
      <ClassStatusModal cl={this.props.rootStore.studentClassesStore.classes[0]} closeModal={() => this.props.closeModal()} />
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
  renderPaymentPlans () {
    return (
      <div className='sk-pop-up'>
        <PaymentPlans
          closeModal={() => this.props.closeModal()}
          handleModalClose={() => this.props.handleModalClose()}
        />
      </div>
    )
  }
  renderCancelSubscription () {
    return (
      <div style={{padding: '2rem'}}>
        <CancelSubscriptionModal
          closeModal={() => this.props.handleModalClose()}

        />
      </div>
    )
  }

  renderLifeTimeTrialUserModal () {
    return (
      <div>
        <LifeTimeUserModal
          closeModal={() => this.props.closeModal()}
          handleModalClose={() => this.props.handleModalClose()}
        />
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
          this.renderNeedSyllabusPopUp()
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
        {this.props.type === 'CancelSubscription' &&
          <SkModal>
            {this.renderCancelSubscription()}
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
        {this.props.type === 'PaymentPlans' &&
          <SkModal
            closeModal={this.props.shouldAllowClose ? () => this.props.closeModal() : null}
            disableOutsideClick={this.props.shouldAllowClose}
          >
            {this.renderPaymentPlans()}
          </SkModal>
        }
        {
          this.props.type === 'LifeTimeTrialUser' &&
            <SkModal closeModal={() => this.closeModal()}>
              {this.renderLifeTimeTrialUserModal()}
            </SkModal>
        }
      </div>
    )
  }
}

PopUp.propTypes = {
  closeModal: PropTypes.func,
  rootStore: PropTypes.obj,
  type: PropTypes.string,
  refreshClasses: PropTypes.func,
  handleModalClose: PropTypes.func,
  shouldAllowClose: PropTypes.bool
}

export default PopUp
