import React from 'react'
import { inject, observer } from 'mobx-react'
import SkModal from '../../components/SkModal/SkModal'
import PropTypes from 'prop-types'
import FindAClass from '../Onboard/FindAClass'
import ChangeSchool from './ChangeSchool'
import ClassStatusModal from '../../components/ClassStatusModal';

@inject('rootStore') @observer
class AddClassModal extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      formState: 'findClass',
      params: {
        schoolChoice: this.props.rootStore.userStore.user.student.primary_school,
        termChoice: this.props.rootStore.userStore.user.student.primary_period
      },
      classStatusModal: {
        show: false,
        cl: null
      }
    }
  }

  changeParams (data) {
    this.setState({
      params: data,
      formState: 'findClass'
    })
  }

  onSubmit () {
    return null
    // console.log('onSubmit')
    // this.props.rootStore.studentClassesStore.updateClasses()
    // this.props.closeModal()
  }

  launchClassStatusModal (cl) {
    // if (this.props.launchClassStatusModal) {
    //   this.props.launchClassStatusModal(cl)
    // } else {
    //   return null
    // }
    this.setState({classStatusModal: {show: true, cl: cl}})
  }

  closeModal = () => {
    this.props.closeModal()
    return null
  }

  renderAddClassModal () {
    return (
      <div>
        {this.state.classStatusModal.show &&
          <ClassStatusModal cl={this.state.classStatusModal.cl} firstOpen={true} closeModal={() => this.props.closeModal()} onSubmit={() => this.onSubmit()} />
        }
        <div className='sk-add-class-modal-wrapper' style={this.state.classStatusModal.show ? {display: 'none'} : {}}>
          <SkModal
            title={this.state.formState === 'editSchool' ? 'Join a School' : 'Join a Class'}
            closeModal={() => {
              this.closeModal()
            }}
          >
            <div className='sk-add-class-modal'>
              {this.state.formState === 'findClass' &&
                <FindAClass
                  hideOnboard={true}
                  onBack={() => this.setState({formState: 'editSchool'})}
                  params={this.state.params}
                  onSubmit={() => console.log('FindAClass onSubmit')}
                  launchClassStatusModal={(cl) => this.launchClassStatusModal(cl)}
                />
              }
              {this.state.formState === 'editSchool' &&
                <ChangeSchool backData={this.state.params} onSubmit={(data) => this.changeParams(data)} />
              }
            </div>
          </SkModal>
        </div>
      </div>
    )
  }

  render () {
    return (
      this.renderAddClassModal()
    )
  }
}

AddClassModal.propTypes = {
  closeModal: PropTypes.function,
  rootStore: PropTypes.object,
  launchClassStatusModal: PropTypes.function
}

export default AddClassModal
