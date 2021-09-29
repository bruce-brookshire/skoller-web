import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import SkLoader from '../../../assets/sk-icons/SkLoader'
import AdminNav from '../AdminNav/AdminNav'
import AdminTop from '../AdminNav/AdminTop'
import ScrollToTop from './ScrollToTop'

@inject('rootStore') @observer
class AdminLayout extends React.Component {
  constructor (props) {
    super(props)
    let rootStore = this.props.rootStore

    const user = rootStore.userStore.user
    const role = this.getRole(user)
    rootStore.insightsStore.org.role = role
    this.getData(role)
  }

  getRole (user) {
    if (user.org_owners) {
      if (user.org_owners.length > 0) {
        return 'orgOwner'
      } else if (user.org_group_owners.length > 0) {
        return 'groupOwner'
      } else {
        return false
      }
    } else {
      return false
    }
  }

  getData (role) {
    let rootStore = this.props.rootStore

    switch (role) {
      case 'orgOwner':
        rootStore.insightsStore.getData(['students', 'invitations', 'groups', 'org', 'orgOwnerWatchlist', 'groupOwners', 'orgOwners', 'studentClasses'])
        break
      case 'groupOwner':
        rootStore.insightsStore.getData(['students', 'org', 'groups', 'groupOwners', 'studentClasses', 'groupOwnerWatchlist'])
    }
  }

  gettingData () {
    if (this.props.rootStore.insightsStore.loading) {
      return true
    } else {
      return false
    }
  }

  renderContent () {
    return (
      <div className={'si-layout theme ' + (this.props.rootStore.insightsStore.darkMode ? 'theme--dark' : 'theme--default')} id='si-layout'>
        {/* <AdminTop /> */}
        <AdminNav />
        <ScrollToTop />
        <main id='main'>
          {this.props.children}
        </main>
      </div>
    )
  }

  render () {
    if (this.gettingData()) {
      return <SkLoader />
    } else {
      return (
        this.renderContent()
      )
    }
  }
}

AdminLayout.propTypes = {
  rootStore: PropTypes.object,
  noLogin: PropTypes.bool,
  imgPath: PropTypes.string,
  children: PropTypes.node.isRequired
}

export default AdminLayout
