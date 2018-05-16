import React from 'react'
import PropTypes from 'prop-types'

class ProfessorInfo extends React.Component {
  render () {
    const {professor: {name_first, name_last, phone, email, office_location, office_availability}} = this.props

    return (
      <div>
        <div className='margin-top margin-bottom'>
          <p><strong>{name_first ? `${name_first} ` : ''}{name_last || ''}</strong></p>
          <p>{phone || 'Phone number missing.'}</p>
          <p>{email || 'Email address missing.'}</p>
          <p>{office_location || 'Office location missing.'}</p>
          <p>{office_availability || 'Office hours missing'}</p>
        </div>
      </div>
    )
  }
}

ProfessorInfo.propTypes = {
  disableEdit: PropTypes.bool,
  onEditProfessor: PropTypes.func.isRequired,
  onRemoveProfessor: PropTypes.func.isRequired,
  professor: PropTypes.object.isRequired
}

export default ProfessorInfo
