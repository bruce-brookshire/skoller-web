import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'

@inject('rootStore') @observer
class AssignmentAdmin extends React.Component {
  constructor (props) {
    super(props)
    let {navbarStore} = this.props.rootStore
    navbarStore.title = 'Assignment Admin'
    this.state = this.initializeState()
  }

  initializeState () {
    return {
    }
  }

  render () {
    return (
      <div>Hello</div>
    )
  }
}

AssignmentAdmin.propTypes = {
  rootStore: PropTypes.object
}

export default AssignmentAdmin
