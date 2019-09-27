import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import Sammi from '../../components/Sammi'
import actions from '../../../actions'
import partners from '../Onboard/partners'
import CopyBox from '../../components/CopyBox'
import {browserHistory} from 'react-router'

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
        if (cl.status.id > 1100) {
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
            show: true,
            hasCompletedClass: false
          })
        }
      })
      .catch(r => {
        this.setState({show: false})
      })
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
                    ? <p>Because of you, <b>$1 was donated to {partner.philanthropy}.</b> Share this link to raise even more money!</p>
                    : <p>Upload your syllabus to get <b>$1 donated to {partner.philanthropy}.</b> Share this link to raise even more money!</p>
                  }
                </Sammi>
                <div className='home-share-copy-box'>
                  <CopyBox linkValue={('https://skoller.co/c/' + partner.slug)} />
                </div>
                <img src={partner.logo} className='home-share-logo' />
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
  classes: PropTypes.object,
  onAddClass: PropTypes.function,
  onClassSelect: PropTypes.function,
  rootStore: PropTypes.object
}

export default HomeShare
