import React from 'react'
import PropTypes from 'prop-types'

class ModCard extends React.Component {
  render () {
    return (
      <div className='cn-shadow-box'>
        <div className='cn-shadow-box-content'>
          <div className='cn-card-title'>
            Mods
          </div>
        </div>
      </div>
    )
  }
}

ModCard.propTypes = {
  mods: PropTypes.array.isRequired
}

export default ModCard
