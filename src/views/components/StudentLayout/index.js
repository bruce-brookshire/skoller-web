import React from 'react'
import StudentNav from '../StudentNav'
import PropTypes from 'prop-types'
import SkBanner from './SkBanner'
import {inject, observer} from 'mobx-react'
import SkLoader from '../../../assets/sk-icons/SkLoader'

@inject('rootStore') @observer
class StudentLayout extends React.Component {
  gettingData () {
    if (this.props.rootStore.studentClassesStore.loading) {
      return true
    } else {
      return false
    }
  }

  render () {
    if (this.gettingData()) {
      return <SkLoader />
    } else {
      return (
        <div className='sk-layout'>
          <StudentNav />
          <main>
            <SkBanner />
            {this.props.children}
          </main>
        </div>
      )
    }
  }
}

StudentLayout.propTypes = {
  rootStore: PropTypes.object,
  noLogin: PropTypes.bool,
  imgPath: PropTypes.string,
  children: PropTypes.node.isRequired
}

export default StudentLayout
