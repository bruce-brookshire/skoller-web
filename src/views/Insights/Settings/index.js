import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import SiToggle from '../components/forms/SiToggle'
import {Cookies} from 'react-cookie'
import { Link } from 'react-router-dom'
import AdminSettings from './AdminSettings'

@inject('rootStore') @observer
class Settings extends Component {
  constructor (props) {
    super(props)

    this.props.rootStore.navStore.setActivePage('insights/settings')
    this.cookie = new Cookies()
  }

  toggleDarkMode () {
    const currentDarkMode = this.props.rootStore.insightsStore.darkMode
    this.cookie.set('skollerInsightsDarkMode', !currentDarkMode, { maxAge: 86400 * 270, path: '/' })
    this.props.rootStore.insightsStore.getDarkModeCookie()
  }

  onOrgSelect = (id) => {
    if (this.props.rootStore.insightsStore.orgSelection !== id) {
      this.cookie.set('skollerInsightsOrgSelection', id, { maxAge: 86400 * 270, path: '/' })
    }

    this.props.rootStore.insightsStore.switchOrg()
  }

  renderAdminSettings () {
    const user = this.props.rootStore.userStore.user
    return <AdminSettings currentOrgId={this.props.rootStore.insightsStore.org.id} onOrgSelect={this.onOrgSelect} user={user} rootStore={this.props.rootStore} />
  }

  render () {
    return (
      <div className='si-settings-container'>
        <div className='si-settings'>
          <div className='si-settings-content'>
            <h1>Your Settings</h1>
            <div className='si-settings-row'>
              <div>Dark mode:</div>
              <SiToggle checked={this.props.rootStore.insightsStore.darkMode} onChange={() => this.toggleDarkMode()} />
            </div>
            <div className='si-settings-row'>
              <div>Password:</div>
              <Link className='link-style' to={{
                pathname: '/forgot_password',
                state: {
                  insightsReset: true
                }
              }}>Reset your password</Link>
            </div>
          </div>
          {this.renderAdminSettings()}
        </div>
      </div>
    )
  }
}

Settings.propTypes = {
  rootStore: PropTypes.object
}

export default Settings
