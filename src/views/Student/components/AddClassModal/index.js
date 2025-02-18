import React from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import FindAClass from '../../Onboard/FindAClass'
import ChangeSchool from './ChangeSchool'
import ClassStatusModal from '../../../components/ClassStatusModal'
import moment from 'moment'
import SkLoader from '../../../../assets/sk-icons/SkLoader'
import actions from '../../../../actions'
import ProgressModal from '../ProgressModal'

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
      },
      loading: false
    }

    this.checkForActiveTerm()
  }

  checkForActiveTerm () {
    if (this.props.rootStore.userStore.user.student.primary_period && this.props.rootStore.userStore.user.student.primary_school) {
      if (moment(this.props.rootStore.userStore.user.student.primary_period.end_date).isBefore(moment())) {
        this.setState({loading: true})
        let activeMainTerms = []
        this.props.rootStore.userStore.user.student.primary_school.periods.forEach(term => {
          if (term.is_main_period && moment(term.end_date).isAfter(moment())) {
            activeMainTerms.push(term)
          }
        })

        let terms = activeMainTerms.sort((a, b) => moment(a.start_date).isAfter(moment(b.start_date)) ? 0 : -1)
        if (terms.length > 0) {
          actions.students.setStudentPrimaryPeriod(this.props.rootStore.userStore.user.id, this.props.rootStore.userStore.user.student.id, terms[0].id)
            .then((r) => {
              this.setState({
                params: {
                  schoolChoice: this.props.rootStore.userStore.user.student.primary_school,
                  termChoice: r
                },
                loading: false
              })
            })
            .catch(e => console.log(e))
        }
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
    this.props.closeModal()
  }

  launchClassStatusModal (cl) {
    this.setState({classStatusModal: {show: true, cl: cl}})
  }

  closeModal = () => {
    this.props.closeModal()
    return null
  }

  renderAddClassModal () {
    return (
      <div className='sk-add-class-container'>
        {this.state.classStatusModal.show &&
          <ClassStatusModal
            cl={this.state.classStatusModal.cl}
            firstOpen={true}
            closeModal={() => this.props.closeModal()}
            onSubmit={() => this.onSubmit()}
            trial={this.props.rootStore.userStore.user.trial}
            isSubscribed={!!this.props.rootStore.userStore.user.subscriptions}
            onUpgradeToPremiumClicked={this.props.onUpgradeToPremiumClicked} />
        }
        <div className='sk-add-class-modal-wrapper' style={this.state.classStatusModal.show ? {display: 'none'} : {}}>
          <ProgressModal
            title={this.state.formState === 'editSchool' ? 'Join a School' : 'Join a Class'}
            closeModal={() => {
              !this.state.classStatusModal.show && this.closeModal()
            }}
          >
            <div className='sk-add-class-modal' style={{overflow: 'auto'}}>
              {this.state.formState === 'findClass' &&
                <FindAClass
                  hideOnboard={true}
                  onBack={() => this.setState({formState: 'editSchool'})}
                  params={this.state.params}
                  onSubmit={() => null}
                  launchClassStatusModal={(cl) => this.launchClassStatusModal(cl)}
                />
              }
              {this.state.formState === 'editSchool' &&
                <ChangeSchool backData={this.state.params} onSubmit={(data) => this.changeParams(data)} />
              }
            </div>
          </ProgressModal>
        </div>
      </div>
    )
  }

  render () {
    return (
      this.state.loading
        ? <SkLoader />
        : this.renderAddClassModal()
    )
  }
}

AddClassModal.propTypes = {
  closeModal: PropTypes.func,
  rootStore: PropTypes.object,
  onUpgradeToPremiumClicked: PropTypes.func,
  trial: PropTypes.bool,
  isSubscribed: PropTypes.bool,
  subscribedCancelled: PropTypes.bool
}

export default AddClassModal
