import React from 'react'
import PropTypes from 'prop-types'
import Card from '../../../components/Card'
import Grid from '../../../components/Grid'

const headers = [
  {
    field: 'name',
    display: 'Name'
  },
  {
    field: 'link',
    display: 'Link'
  }
]

class OrganizationsCard extends React.Component {
  getRows () {
    const {organizations} = this.props
    return organizations.map((item, index) =>
      this.mapRow(item, index)
    )
  }

  mapRow (item, index) {
    const {name, id, custom_signup_link: {link}} = item

    const row = {
      id: id,
      name: name,
      link: link
    }
    return row
  }

  renderOrganizationsContent () {
    return (
      <Grid
        className='striped'
        headers={headers}
        rows={this.getRows()}
        disabled={true}
        canDelete={false}
        canSelect={false}
        emptyMessage={'No organizations exist yet.'}
        deleteMessage={''}
      />
    )
  }

  render () {
    return (
      <Card
        title='Organizations'
        content={this.renderOrganizationsContent()}
      />
    )
  }
}

OrganizationsCard.propTypes = {
  organizations: PropTypes.array.isRequired
}

export default OrganizationsCard
