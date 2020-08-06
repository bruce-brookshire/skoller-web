import React from 'react'
import PropTypes from 'prop-types'
import { asyncForEach } from '../../../utilities/api'
import actions from '../../../actions'

function AdminSettings (props) {
  const [loading, setLoading] = React.useState(true)
  const [orgs, setOrgs] = React.useState([])

  const getOrgs = async () => {
    setOrgs([])
    let updatedOrgs = []

    await asyncForEach(props.user.org_owners, async (org) => {
      await actions.insights.getOrgById(org.organization_id)
        .then(r => {
          updatedOrgs.push(r)
        })
    })

    setOrgs(updatedOrgs)
    setLoading(false)
  }

  React.useEffect(() => {
    if (loading) {
      getOrgs()
    }
  }, [])

  const onOrgSelect = async (id) => {
    props.onOrgSelect(id)
  }

  const renderContent = () => {
    return (
      <div className='si-settings-admin'>
        <label>Select org to view:</label>
        <div className='si-settings-admin-orgs'>
          {orgs.map(o => {
            return <div
              className={'org org-' + (o.id === props.currentOrgId ? 'active' : 'inactive')}
              key={orgs.indexOf(o)}
              onClick={() => onOrgSelect(o.id)}
            >{o.name}</div>
          })}
        </div>
      </div>
    )
  }

  return (
    orgs.length > 0
      ? <div className='si-settings-content'>
        <h1>Admin Settings</h1>
        {renderContent()}
      </div>
      : null
  )
}

AdminSettings.propTypes = {
  user: PropTypes.object,
  onOrgSelect: PropTypes.func,
  currentOrgId: PropTypes.number
}

export default AdminSettings
