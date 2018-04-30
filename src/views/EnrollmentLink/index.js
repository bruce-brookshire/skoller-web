import React from 'react'
import PropTypes from 'prop-types'
import actions from '../../actions'

class EnrollmentLink extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.initializeState()
  }

  initializeState () {
    return {
      linkDetail: null
    }
  }

  componentWillMount () {
    actions.classes.getClassByLink(this.props.params.link).then((linkDetail) => {
      this.setState({linkDetail})
    }).catch(() => false)
  }

  render () {
    return (
      <div>
      </div>
    )
  }
}

EnrollmentLink.PropTypes = {
  params: PropTypes.object.isRequired
}

export default EnrollmentLink
