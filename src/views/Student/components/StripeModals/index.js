import React from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import FindAClass from '../../Onboard/FindAClass'
import PremminiumPlans from './PreminiumPlans'
import InfoModal from './InfoModal'
import PaymentModel from './PaymentModel'
import ClassStatusModal from '../../../components/ClassStatusModal'
import moment from 'moment'
import SkLoader from '../../../../assets/sk-icons/SkLoader'
import actions from '../../../../actions'
import ProgressModal from '../ProgressModal'

@inject('rootStore') @observer
class PaymentPlans extends React.Component {
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

  componentDidMount () {
    // actions.stripe.getMySubscription().catch((r) => console.log(r, 66));

    actions.stripe.getMySubscription()
      .then((data) => {
        if (data.data.length > 0) {
          let len = data.data.length
          let latestplan = data.data.plan
        } else {

        }
        // this.setState({plans: data.data})
      })
      .catch((e) => {
        console.log(e)
      })
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

  //   closeModal = () => {
  //     this.props.closeModal()
  //     return null
  //   }

  renderPaymentPlans () {
    return (
      <div className='sk-add-class-container'>
        {this.state.classStatusModal.show &&
          <ClassStatusModal cl={this.state.classStatusModal.cl} firstOpen={true} closeModal={() => this.props.closeModal()} onSubmit={() => this.onSubmit()} />
        }
        <div className='sk-add-class-modal-wrapper' style={this.state.classStatusModal.show ? {display: 'none'} : {}}>
          <ProgressModal
            // title=""
            closeModal={() => {
              !this.state.classStatusModal.show && this.props.closeModal()
            }}
          >
            {/* <PremminiumPlans backData={this.state.params} onSubmit={(data) => this.changeParams(data)} /> */}
            {/* <InfoModal backData={this.state.params} onSubmit={(data) => this.changeParams(data)} /> */}
            <PaymentModel backData={this.state.params} onSubmit={(data) => this.changeParams(data)} closeModal={() => this.props.closeModal()} handleModalClose={() => this.props.handleModalClose()} />
          </ProgressModal>
        </div>
      </div>
    )
  }

  render () {
    return (
      this.state.loading
        ? <SkLoader />
        : this.renderPaymentPlans()
    )
  }
}

PaymentPlans.propTypes = {
  closeModal: PropTypes.func,
  rootStore: PropTypes.object
}

export default PaymentPlans
