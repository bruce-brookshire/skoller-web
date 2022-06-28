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
    this.props.rootStore.navStore.setActivePage('share')
  }

  getPartner (partnerSlug) {
    let partner = null
    Object.keys(partners).forEach(partnerKey => {
      if (partners[partnerKey].slug.toLowerCase() === partnerSlug.toLowerCase() || partners[partnerKey].altName.toLowerCase() === partnerSlug.toLowerCase()) {
        partner = partners[partnerKey]
      }
    })
    return partner
  }

  async getPartnerByUser () {
    await actions.students.getStudentSignupOrganization(this.props.rootStore.userStore.user.student.id)
      .then((r) => {
        let slug = r.link.replace(/(.+)(\/c\/)/g, '')
        if (this.props.rootStore.userStore.user.student.raise_effort) {
          this.setState({partner: this.getPartner(slug)})
        } else {
          this.setState({partner: false})
        }
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

  renderContent () {
    return (
      <div className='sk-share-container'>
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
