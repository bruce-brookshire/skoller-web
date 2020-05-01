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
import { withRouter } from 'react-router-dom'
import SkLoader from '../../../assets/sk-icons/SkLoader'
import SharePartner from './SharePartner'
import Layout from './Layout'

@inject('rootStore') @observer
class Onboard extends React.Component {
  constructor (props) {
    super(props)

    if (this.props.params.partner) {
      this.props.params.partner = this.props.params.partner.toLowerCase()
    }

    this.state = {
      step: 'sign-up',
      partner: this.getPartner(this.props.params.partner),
      loading: true,
      user: this.props.rootStore.userStore.user !== undefined ? this.props.rootStore.userStore.user : null,
      backData: null,
      redirect: false
    }

    this.cookie = new Cookies()

    this.props.rootStore.navStore.setActivePage('calendar')
  }

  componentDidMount () {
    this.loginStudent()
  }

  async getPartnerByUser () {
    let hasPartner = true
    await actions.students.getStudentSignupOrganization(this.props.rootStore.userStore.user.student.id)
      .then((r) => {
        let slug = r.link.replace(/(.+)(\/c\/)/g, '')
        if (this.props.params.partner && (this.props.params.partner !== slug)) {
          this.props.history.push(('/student/share/' + this.props.params.partner))
          this.setState({redirect: true})
        }
        this.setState({partner: this.getPartner(slug)})
      })
      .catch(r => {
        if (this.props.params.partner) {
          this.setState({partner: null, redirect: true})
          this.props.history.push(('/student/share/' + this.props.params.partner))
          console.log('but')
          hasPartner = false
        }
      })
    return new Promise(resolve => resolve(hasPartner))
  }

  async loginStudent () {
    if (this.cookie.get('skollerToken')) {
      console.log('0')
      await actions.auth.getUserByToken(this.cookie.get('skollerToken')).catch((r) => console.log(r))
      await this.getPartnerByUser() // <-- sets onboard to partner state if user signed up through custom link
        .then(r => {
          if (r) {
            this.setState({user: this.props.rootStore.userStore.user})
            this.getStep()
          }
        })
    } else {
      if (this.state.user) {
        this.setState({step: 'verify', loading: false})
      } else if (this.state.partner !== null) {
        this.setState({step: 'sign-up', loading: false})
      } else {
        this.props.history.push('/landing')
      }
    }
  }

  updateStudent () {
    if (this.cookie.get('skollerToken')) {
      actions.auth.getUserByToken(this.cookie.get('skollerToken')).catch((r) => console.log(r))
    }
  }

  async getStep () {
    console.log('getStep')
    const user = this.state.user
    let classNumber = 0
    if (user) {
      await actions.classes.getStudentClassesById(user.student.id).then(classes => {
        classNumber = classes.length
      }).catch(r => console.log(r))
      if (classNumber > 1) {
        this.props.history.push('/student')
      }
      if (!user.student.primary_school || !user.student.primary_period) {
        this.setState({step: 'select-school'})
      } else if (classNumber === 1) {
        this.setState({step: 'first-class'})
      } else if (user.student.primary_school && user.student.primary_period && (classNumber === 0)) {
        this.setState({step: 'find-a-class'})
      } else {
        this.props.history.push('/student')
      }
    } else {
      this.props.history.push('/student')
    }
    this.setState({loading: false})
  }

  getPartner (partnerSlug) {
    let partner = null
    Object.keys(partners).forEach(partnerKey => {
      if (partners[partnerKey].slug === partnerSlug) {
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
          <p>in partnership with</p> <img src={this.state.partner.logo} alt={this.state.partner.name} />
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
            this.updateStudent()
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
          onSubmit={() => {
            this.updateStudent()
            this.setState({step: 'first-class'})
          }}
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
          onboard={true}
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
                this.updateStudent()
                this.props.history.push('/student')
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
            this.props.history.push('/student')
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
        : <Layout id='onboard-layout' hideModal={this.state.step === 'verify' || this.state.step === 'first-class'}>
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

export default withRouter(Onboard)
