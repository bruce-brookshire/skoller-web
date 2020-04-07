import React from 'react'
import PropTypes from 'prop-types'
// import SkBanner from './SkBanner'
import {inject, observer} from 'mobx-react'
import SkLoader from '../../../assets/sk-icons/SkLoader'
import InsightsNav from './InsightsNav'

@inject('rootStore') @observer
class InsightsLayout extends React.Component {
  gettingData () {
    if (this.props.rootStore.studentClassesStore.loading || this.props.rootStore.studentJobsStore.loading) {
      return true
    } else {
      return false
    }
  }

  renderContent () {
    return (
      <div className='si-layout' id='si-layout'>
        <InsightsNav />
        <main id='main'>
          {/* <SkBanner /> */}
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
