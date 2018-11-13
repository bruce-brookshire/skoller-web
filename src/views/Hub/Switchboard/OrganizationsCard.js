import React from 'react'
import Card from '../../../components/Card'
import Grid from '../../../components/Grid'
import actions from '../../../actions'
import Modal from '../../../components/Modal'
import OrganizationForm from './OrganizationForm'

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
  constructor (props) {
    super(props)
    this.state = {
      organizations: [],
      openOrganizationModal: false
    }
  }

  componentWillMount () {
    this.getOrganizations()
  }

  getOrganizations () {
    actions.organizations.getOrganizations().then((organizations) => {
      this.setState({organizations})
    }).catch(() => false)
  }

  getRows () {
    const {organizations} = this.state
    return organizations.map((item, index) =>
      this.mapRow(item, index)
    )
  }

  onFormSubmit () {
    this.toggleOrganizationModal()
    this.getOrganizations()
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

  toggleOrganizationModal () {
    const {openOrganizationModal} = this.state
    this.setState({openOrganizationModal: !openOrganizationModal})
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

  renderOrganizationModal () {
    return (
      <Modal
        open={this.state.openOrganizationModal}
        onClose={() => this.setState({openOrganizationModal: false})}
      >
        <OrganizationForm
          onSubmit={this.onFormSubmit.bind(this)}
        />
      </Modal>
    )
  }

  renderOrganizationsTitle () {
    return (
      <div className='cn-icon-flex'>
        Organizations
        <i className='fa fa-plus cn-blue cursor margin-left' onClick={() => this.toggleOrganizationModal()} />
      </div>
    )
  }

  render () {
    return (
      <div>
        <Card
          title={this.renderOrganizationsTitle()}
          content={this.renderOrganizationsContent()}
        />
        {this.renderOrganizationModal()}
      </div>
    )
  }
}

export default OrganizationsCard
