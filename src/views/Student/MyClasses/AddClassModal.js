import React from 'react'
import { inject, observer } from 'mobx-react'
import SkModal from '../../components/SkModal/SkModal'
import PropTypes from 'prop-types'
import FindAClass from '../Onboard/FindAClass'
import ChangeSchool from './ChangeSchool'

@inject('rootStore') @observer
class AddClassModal extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      formState: 'findClass',
      params: {
        schoolChoice: this.props.rootStore.userStore.user.student.primary_school,
        termChoice: this.props.rootStore.userStore.user.student.primary_period
      }
    }
  }

  changeParams (data) {
    console.log(data)
    this.setState({
      params: data,
      formState: 'findClass'
    })
  }

  onSubmit () {
    this.props.rootStore.studentClassesStore.updateClasses()
    this.props.closeModal()
  }

  launchClassStatusModal (cl) {
    if (this.props.launchClassStatusModal) {
      this.props.launchClassStatusModal(cl)
    } else {
      return null
    }
  }

  render () {
    return (
      <div className='sk-add-class-modal-wrapper'>
        <SkModal
          title={this.state.formState === 'editSchool' ? 'Join a School' : 'Join a Class'}
          closeModal={() => this.props.closeModal()}
        >
          <div className='sk-add-class-modal'>
            {this.state.formState === 'findClass' &&
              <FindAClass
                hideOnboard={true}
                onBack={() => this.setState({formState: 'editSchool'})}
                params={this.state.params}
                onSubmit={() => this.onSubmit()}
                launchClassStatusModal={(cl) => this.launchClassStatusModal(cl)}
              />
            }
            {this.state.formState === 'editSchool' &&
              <ChangeSchool backData={this.state.params} onSubmit={(data) => this.changeParams(data)} />
            }
          </div>
        </SkModal>
      </div>
    )
  }
}

AddClassModal.propTypes = {
  closeModal: PropTypes.function,
  rootStore: PropTypes.object,
  launchClassStatusModal: PropTypes.function
}

export default AddClassModal
