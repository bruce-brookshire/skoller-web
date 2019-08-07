import React from 'react'
import partners from './partners'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import LoginVerificationModal from '../../components/LoginForm/LoginVerificationModal'
import {Cookies} from 'react-cookie'
import actions from '../../../actions'
import SignUp from './SignUp'
import SelectSchool from './SelectSchool'
import FindAClass from './FindAClass'
import FirstClass from './FirstClass/index'
import { browserHistory } from 'react-router'
import SkLoader from '../../../assets/sk-icons/SkLoader'
import SharePartner from './SharePartner'
import Layout from './Layout'

@inject('rootStore') @observer
class Onboard extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      step: 'sign-up',
      partner: this.getPartner(),
      loading: true,
      user: this.props.rootStore.userStore.user !== undefined ? this.props.rootStore.userStore.user : null,
      backData: null
    }

    this.cookie = new Cookies()

    this.props.rootStore.studentNavStore.setActivePage('calendar')
  }

  componentDidMount () {
    this.loginStudent()
  }

  async loginStudent () {
    if (this.cookie.get('skollerToken')) {
      console.log('async login student')
      await actions.auth.getUserByToken(this.cookie.get('skollerToken')).catch((r) => console.log(r))
      this.setState({user: this.props.rootStore.userStore.user})
      this.getStep()
    } else {
      if (this.state.user) {
        this.setState({step: 'verify', loading: false})
      } else if (this.state.partner !== null) {
        this.setState({step: 'sign-up', loading: false})
      } else {
        browserHistory.push('/landing')
      }
    }
  }

  async getStep () {
    const user = this.state.user
    let classNumber = 0
    if (user) {
      await actions.classes.getStudentClassesById(user.student.id).then(classes => {
        classNumber = classes.length
      }).catch(r => console.log(r))
      if (classNumber > 1) {
        browserHistory.push('/student')
      }
      if (!user.student.primary_school || !user.student.primary_period) {
        this.setState({step: 'select-school'})
      } else if (classNumber === 1) {
        this.setState({step: 'first-class'})
      } else if (user.student.primary_school && user.student.primary_period && (classNumber === 0)) {
        this.setState({step: 'find-a-class'})
      } else {
        browserHistory.push('/student')
      }
    } else {
      browserHistory.push('/student')
    }
    this.setState({loading: false})
  }

  getPartner () {
    let partner = null
    Object.keys(partners).forEach(partnerKey => {
      if (partners[partnerKey].slug === this.props.params.partner) {
        partner = partners[partnerKey]
      }
    })
    return partner
  }

  onVerificationSubmit = () => {
    this.setState({step: 'select-school'})
  }

  renderVerify () {
    return (
      <LoginVerificationModal closeModal={null} onSubmit={this.onVerificationSubmit} phone={this.props.rootStore.userStore.user.student.phone}/>
    )
  }

  renderOnboardContent (children) {
    return (
      children
    )
  }

  renderPartner = () => {
    if (this.state.partner) {
      return (
        <div className='onboard-partner'>
          <p>in partnership with</p> <img src={this.state.partner.logo} />
        </div>
      )
    }
  }

  renderSignUp () {
    return (
      <SignUp
        onSubmit={() => {
          this.setState({
            step: 'verify'
          })
        }}
        renderPartner={this.renderPartner}
        partner={this.state.partner}
      />
    )
  }

  renderSelectSchool () {
    return (
      this.renderOnboardContent(
        <SelectSchool
          onSubmit={(data) => {
            this.setState({
              step: 'find-a-class',
              selectSchoolData: data
            })
          }}
          renderPartner={this.renderPartner}
          backData={this.state.backData}
        />
      )
    )
  }

  renderFindAClass () {
    return (
      this.renderOnboardContent(
        <FindAClass
          onSubmit={() => this.setState({step: 'first-class'})}
          onBack={(school, term) => {
            this.setState({
              step: 'select-school',
              backData: {
                schoolChoice: school,
                termChoice: term
              }
            })
          }}
          params={this.state.selectSchoolData}
          renderPartner={this.renderPartner}
          partner={this.state.partner}
        />
      )
    )
  }

  renderFirstClass () {
    return (
      this.renderOnboardContent(
        <FirstClass
          onSubmit={
            (this.state.partner)
              ? () => {
                this.setState({step: 'share-partner'})
              }
              : () => {
                browserHistory.push('/student')
              }
          }
          renderPartner={this.renderPartner}
          partner={this.state.partner}
        />
      )
    )
  }

  renderSharePartner () {
    return (
      this.renderOnboardContent(
        <SharePartner
          onSubmit={() => {
            browserHistory.push('/student')
          }}
          renderPartner={this.renderPartner}
          partner={this.state.partner}
        />
      )
    )
  }

  render () {
    return (
      (this.state.loading)
        ? <div className='onboard-loading'>
          <SkLoader />
        </div>
        : <Layout hideModal={this.state.step === 'verify'}>
          {(this.state.step === 'sign-up')
            ? this.renderSignUp()
            : null
          }
          {(this.state.step === 'verify')
            ? this.renderVerify()
            : null
          }
          {this.state.step === 'select-school'
            ? this.renderSelectSchool()
            : null
          }
          {this.state.step === 'find-a-class'
            ? this.renderFindAClass()
            : null
          }
          {this.state.step === 'first-class'
            ? this.renderFirstClass()
            : null
          }
          {this.state.step === 'share-partner'
            ? this.renderSharePartner()
            : null
          }
        </Layout>
    )
  }
}

Onboard.propTypes = {
  rootStore: PropTypes.object,
  params: PropTypes.object
}

export default Onboard
