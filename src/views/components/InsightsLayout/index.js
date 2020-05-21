import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import SkLoader from '../../../assets/sk-icons/SkLoader'
import InsightsNav from '../InsightsNav/InsightsNav'
import InsightsTop from '../InsightsNav/InsightsTop'

@inject('rootStore') @observer
class InsightsLayout extends React.Component {
  constructor (props) {
    super(props)

    this.props.rootStore.insightsStore.getData(['students', 'groups', 'org', 'orgOwnerWatchlist', 'groupOwners', 'orgOwners', 'studentClasses'])
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
      <div className='si-layout' id='si-layout'>
        <InsightsTop />
        <InsightsNav />
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

InsightsLayout.propTypes = {
  rootStore: PropTypes.object,
  noLogin: PropTypes.bool,
  imgPath: PropTypes.string,
  children: PropTypes.node.isRequired
}

export default InsightsLayout
