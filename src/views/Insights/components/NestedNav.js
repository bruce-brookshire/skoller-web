import React from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import ForwardArrow from '../../../assets/sk-icons/navigation/ForwardArrow'

@inject('rootStore') @observer
class NestedNav extends React.Component {
  getLastPage = () => {
    let history = this.props.rootStore.navStore.history
    let currentPath = history[history.length - 1]

    let i = 1
    let backPath = history[history.length - i]
    while (i <= this.props.history.length && backPath === currentPath) {
      i += 1
      backPath = history[history.length - i]
    }
    return backPath
  }

  getNestedNav = () => {
    let pathArray = []
    if (this.props.pageType === 'studentDetail') {
      let student = this.props.rootStore.insightsStore.students.find(s => s.id === parseInt(this.props.match.params.orgStudentId)).student

      if (this.props.rootStore.insightsStore.userType === 'orgOwner') {
        pathArray = [
          {
            name: 'Athletes',
            path: '/insights/students'
          },
          {
            name: student.name_first + ' ' + student.name_last
          }
        ]
      } else {
        pathArray = [
          {
            name: 'Dashboard',
            path: '/insights/dashboard'
          },
          {
            name: student.name_first + ' ' + student.name_last
          }
        ]
      }
    }
    return pathArray
  }

  renderContent () {
    let pathArray = this.getNestedNav()
    return (
      <div className='nested-nav-forward'>
        {pathArray.map(p => {
          return (
            <div className='nested-nav-item' key={pathArray.indexOf(p)} onClick={() => this.props.history.push(p.path)}>
              {p.name}{pathArray.indexOf(p) !== pathArray.length - 1 ? <ForwardArrow fill={this.props.rootStore.navStore.jobsMode ? '#6ED6AE' : ''} width="14" height="14" /> : null}
            </div>
          )
        })}
      </div>
    )
  }

  render () {
    return (
      <div className='nested-nav' style={{color: this.props.rootStore.navStore.jobsMode ? '#6ED6AE' : ''}}>
        {this.renderContent()}
      </div>
    )
  }
}

NestedNav.propTypes = {
  history: PropTypes.object,
  back: PropTypes.bool,
  rootStore: PropTypes.object,
  match: PropTypes.object,
  pageType: PropTypes.string
}

export default withRouter(NestedNav)
