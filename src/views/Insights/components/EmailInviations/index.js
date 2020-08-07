import React from 'react'
import PropTypes from 'prop-types'
import SkModal from '../../../components/SkModal/SkModal'
import actions from '../../../../actions'

function EmailInvitations (props) {
  const [modal, setModal] = React.useState(false)

  const onSendInvite = () => {
    actions.insights.invitations.sendEmailInvitation(props.type, props.orgId, props.id)
      .then(r => {
        console.log(r)
        setModal(false)
      })
  }

  const onSendReminder = () => {
    actions.insights.invitations.sendReminderEmail(props.type, props.orgId, props.id)
      .then(r => {
        console.log(r)
        setModal(false)
      })
  }

  const renderInviteDetail = () => {
    if (!props.count) {
      return null
    } else {
      return (
        <div className='si-email-invites-count'>
          This will send an email to the {props.count} athletes that have not activated their accounts.
        </div>
      )
    }
  }

  const renderModal = () => {
    return (
      <SkModal closeModal={() => setModal(false)}>
        <div className='si-email-invites'>
          <h1>Email athlete{props.count ? 's' : ''}</h1>
          {renderInviteDetail()}
          <div className='si-button'>
            <p onClick={onSendInvite}><i className='fas fa-envelope' /> Send invitation{props.count ? 's' : ''} via email</p>
          </div>
          <div className='si-button'>
            <p onClick={onSendReminder}><i className='fas fa-envelope' /> Send reminder email{props.count ? 's' : ''}</p>
          </div>
        </div>
      </SkModal>
    )
  }

  return (
    <div>
      <div onClick={() => setModal(true)}>
        {props.children}
      </div>
      {modal && renderModal()}
    </div>
  )
}

EmailInvitations.propTypes = {
  children: PropTypes.object,
  type: PropTypes.string,
  orgId: PropTypes.number,
  id: PropTypes.number,
  count: PropTypes.number
}

export default EmailInvitations
