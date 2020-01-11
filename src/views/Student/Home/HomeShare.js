import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import Sammi from '../../components/Sammi'
import actions from '../../../actions'
import partners from '../Onboard/partners'
import {browserHistory} from 'react-router'
import SkBanner from '../../components/StudentLayout/SkBanner'

@inject('rootStore') @observer
class HomeShare extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      partner: null,
      show: false
    }

    this.getPartnerByUser()
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

  hasCompletedClass () {
    let hasCompletedClass = false
    if (this.props.classes) {
      this.props.classes.forEach(cl => {
        if (cl.status.id > 1300) {
          hasCompletedClass = true
        }
      })
    }
    return hasCompletedClass
  }

  async getPartnerByUser () {
    await actions.students.getStudentSignupOrganization(this.props.rootStore.userStore.user.student.id)
      .then((r) => {
        let slug = r.link.replace(/(.+)(\/c\/)/g, '')
        this.setState({partner: this.getPartner(slug), show: true})
        if (this.hasCompletedClass()) {
          this.setState({
            partner: this.getPartner(slug),
            show: true,
            hasCompletedClass: true
          })
        } else {
          this.setState({
            partner: this.getPartner(slug),
            show: false,
            hasCompletedClass: false
          })
        }
      })
      .catch(r => {
        this.setState({show: false})
      })
  }

  renderShareMessage () {
    let partner = this.state.partner
    if (this.state.hasCompletedClass) {
      return (
        <p>Because of you, <b>$1 was donated to {partner.philanthropy}.</b> Share this link to raise even more money!</p>
      )
    } else {
      return (
        <p>Upload your {this.state.classes.length > 1 ? 'syllabi' : 'syllabus'} to get <b>$1 donated to {partner.philanthropy}.</b> Share this link to raise even more money!</p>
      )
    }
  }

  render () {
    let partner = this.state.partner
    if (this.state.show) {
      return (
        <div className="home-shadow-box margin-top">
          <h1 className='home-heading' onClick={() => browserHistory.push('/student/share/aoii')}>Share</h1>
          <div className="home-card-content">
            <div className='home-share'>
              <div className='home-share-link'>
                <Sammi
                  emotion='happy'
                  position='left'
                >
                  {this.state.hasCompletedClass
                    ? <p>Because of you, <b>$1 was donated to {partner.philanthropy}.</b> Share to raise even more money!</p>
                    : <p>Upload your syllabus to get <b>$1 donated to {partner.philanthropy}.</b> Share to raise even more money!</p>
                  }
                </Sammi>
                <SkBanner state='partner' style={{boxShadow: '0 0 0 0', margin: '0 0 0 0'}} hideText={true} />
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return null
    }
  }
}

HomeShare.propTypes = {
  classes: PropTypes.array,
  onAddClass: PropTypes.func,
  rootStore: PropTypes.object
}

export default HomeShare
