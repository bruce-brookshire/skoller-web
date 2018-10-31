import React from 'react'
import PropTypes from 'prop-types'
import Grid from '../../../components/Grid'
import Card from '../../../components/Card'

const headers = [
  {
    field: 'email_domain',
    display: 'Domain'
  }
]

class EmailDomainDetails extends React.Component {
  mapRow (item, index) {
    const {id, email_domain: emailDomain} = item
    const row = {
      id: id,
      email_domain: emailDomain
    }
    return row
  }

  getRows () {
    const {emailDomains} = this.props
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

  renderTitle () {
    const {title} = this.props
    return (
      <div className='cn-icon-flex'>
        {title}
        <i className='fa fa-plus cn-blue cursor' onClick={() => this.props.onAdd() } />
      </div>
    )
  }

  render () {
    return (
      <Card
        title={this.renderTitle()}
        content={this.renderEmailDomainTable()}
      />
    )
  }
}

EmailDomainDetails.propTypes = {
  school: PropTypes.object,
  title: PropTypes.string,
  onAdd: PropTypes.func,
  emailDomains: PropTypes.array
}

export default EmailDomainDetails
