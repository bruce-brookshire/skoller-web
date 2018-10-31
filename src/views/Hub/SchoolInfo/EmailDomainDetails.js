import React from 'react'
import PropTypes from 'prop-types'
import Grid from '../../../components/Grid'
import actions from '../../../actions'

const headers = [
  {
    field: 'email_domain',
    display: 'Domain'
  }
]

class EmailDomainDetails extends React.Component {
  constructor (props) {
    super(props)

    this.state = this.initializeState()
  }

  initializeState () {
    return {
      emailDomains: []
    }
  }

  componentWillMount () {
    const {school} = this.props
    actions.schools.getEmailDomains(school.id).then(emailDomains => {
      this.setState(emailDomains)
    }).catch(() => false)
  }

  mapRow (item, index) {
    const {id, email_domain: emailDomain} = item
    const row = {
      id: id,
      email_domain: emailDomain
    }
    return row
  }

  getRows () {
    const {emailDomains} = this.state
    return emailDomains.map((item, index) =>
      this.mapRow(item, index)
    )
  }

  renderEmailDomainTable () {
    return (
      <Grid
        className='striped'
        headers={headers}
        rows={this.getRows()}
        disabled={true}
        canDelete={true}
        canSelect={false}
        emptyMessage={'No domains yet.'} />
    )
  }

  render () {
    return (
      <div>
        {this.renderEmailDomainTable()}
      </div>
    )
  }
}

EmailDomainDetails.propTypes = {
  school: PropTypes.object
}

export default EmailDomainDetails
