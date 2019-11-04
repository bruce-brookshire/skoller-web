import React from 'react'
import {inject, observer} from 'mobx-react'
import PropTypes from 'prop-types'
import StudentLayout from '../../components/StudentLayout'
import actions from '../../../actions'
import SkLoader from '../../../assets/sk-icons/SkLoader'
import ShareClasses from './ShareClasses'
import ShareNoClasses from './ShareNoClasses'
import partners from '../Onboard/partners'

@inject('rootStore') @observer
class Share extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      user: this.props.rootStore.userStore.user,
      classes: [],
      loading: true,
      partner: null
    }

    this.getPartnerByUser()
    this.getClasses()
    this.props.rootStore.studentNavStore.setActivePage('share')
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

  async getPartnerByUser () {
    await actions.students.getStudentSignupOrganization(this.props.rootStore.userStore.user.student.id)
      .then((r) => {
        let slug = r.link.replace(/(.+)(\/c\/)/g, '')
        this.setState({partner: this.getPartner(slug), show: true})
      })
      .catch(r => {
        this.setState({partner: false})
      })
  }

  getClasses () {
    this.setState({loading: true})
    actions.classes
      .getStudentClassesById(this.state.user.student.id)
      .then(classes => {
        let setupClasses = classes.filter(c => c.status.id >= 1400)
        this.setState({loading: false, classes: setupClasses, classSelection: setupClasses[0]})
      })
  }

  renderHeader () {
    console.log(this.state.user.student.raise_effort)
    return (
      <div className='sk-share-header'>
        <h1>Share with Your Community</h1>
        <p>Inviting classmates to Skoller helps you keep up with classes and earn points!</p>
        <div
          className='sk-share-points'
          style={{backgroundColor: this.state.partner ? '#' + this.state.partner.primaryColor : ''}}
        >
          {this.state.partner
            ? <div>
              <p>Your raise: ${this.state.user.student.raise_effort.personal_signups}</p>
              <p>{this.state.partner.name} raise: ${this.state.user.student.raise_effort.org_singups}</p>
            </div>
            : <p>Your points: {this.state.user.student.points}</p>
          }
        </div>
      </div>
    )
  }

  renderContent () {
    return (
      <div className='sk-share-container'>
        {this.renderHeader()}
        {this.state.classes.length > 0
          ? <ShareClasses
            classes={this.state.classes}
            user={this.state.user}
            partner={this.state.partner}
          />
          : <ShareNoClasses
            user={this.state.user}
            partner={this.state.partner}
          />
        }
      </div>
    )
  }

  render () {
    return (
      <StudentLayout>
        {this.state.loading
          ? <SkLoader />
          : this.renderContent()
        }
      </StudentLayout>
    )
  }
}

Share.propTypes = {
  rootStore: PropTypes.object
}

export default Share
