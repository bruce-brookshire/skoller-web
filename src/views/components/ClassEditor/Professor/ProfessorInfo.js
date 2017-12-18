import React from 'react'
import PropTypes from 'prop-types'

class ProfessorInfo extends React.Component {
  render () {
    const {professor: {name_first, name_last, phone, email,
       office_location, office_availability}} = this.props

    return (
      <div>
        <div className='margin-top margin-bottom' style={{padding: 10, borderRadius: 5, backgroundColor: '#fff', border: '2px solid #a0a0a0'}}>
          <p><strong>{name_first ? `${name_first} ` : ''}{name_last || ''}</strong></p>
          <p style={{fontSize: '12px'}}>{phone || 'Phone number missing.'}</p>
          <p style={{fontSize: '12px'}}>{email || 'Email address missing.'}</p>
          <p style={{fontSize: '12px'}}>{office_location || 'Office location missing.'}</p>
          <p style={{fontSize: '12px'}}>{office_availability || 'Office hours missing'}</p>
        </div>
        <div>
          <a style={{float: 'left', color: 'red'}} onClick={() => this.props.onRemoveProfessor()}>remove professor</a>
          <a style={{float: 'right'}} onClick={() => this.props.onEditProfessor()}>edit professor info </a>
        </div>
      </div>
    )
  }
}

ProfessorInfo.propTypes = {
  onEditProfessor: PropTypes.func.isRequired,
  onRemoveProfessor: PropTypes.func.isRequired,
  professor: PropTypes.object.isRequired
}

export default ProfessorInfo
