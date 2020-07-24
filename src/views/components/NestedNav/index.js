import React from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import BackArrow from '../../../assets/sk-icons/navigation/BackArrow'
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
    let history = this.props.rootStore.navStore.history
    let paths = history[history.length - 1]
    let currentPath = paths.split('/')
    let pathArray = []
    currentPath.forEach(p => {
      let d = null
      if (parseInt(p)) {
        let prevPath = currentPath[currentPath.indexOf(p) - 1]
        if (prevPath === 'class') {
          let path = currentPath.slice(0, currentPath.indexOf(p) + 1).join('/')
          d = {
            name: this.props.rootStore.studentClassesStore.classes.filter(cl => cl.id === parseInt(p))[0].name,
            path: path
          }
        } else if (prevPath === 'assignments') {
          d = {
            name: this.props.rootStore.studentAssignmentsStore.assignments.filter(a => a.assignment_id === parseInt(p))[0].name,
            path: currentPath.slice(0, currentPath.indexOf(p) + 1).join('/')
          }
        }
        pathArray.push(d)
      } else if (p === 'class') {
        pathArray.push({
          name: 'Classes',
          path: '/student/classes'
        })
      }
    })
    return pathArray
  }

  renderContent () {
    if (this.props.back) {
      let backPath = this.getLastPage()
      if (backPath && backPath !== '/') {
        return (
          <div className='nested-nav-back' onClick={() => this.props.history.push(backPath)}>
            <BackArrow fill={this.props.rootStore.navStore.jobsMode ? '#6ED6AE' : ''} width="14" height="14" />
            <p>Back</p>
          </div>
        )
      } else {
        return null
      }
    } else {
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
  }

  render () {
    if (this.props.rootStore.studentClassesStore.loading || this.props.rootStore.studentAssignmentsStore.loading) {
      return null
    } else {
      return (
        <div className='nested-nav' style={{color: this.props.rootStore.navStore.jobsMode ? '#6ED6AE' : ''}}>
          {this.renderContent()}
        </div>
      )
    }
  }
}

NestedNav.propTypes = {
  history: PropTypes.object,
  back: PropTypes.bool,
  rootStore: PropTypes.object
}

export default withRouter(NestedNav)
