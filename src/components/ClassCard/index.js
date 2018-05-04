import React from 'react'
import PropTypes from 'prop-types'

class ClassCard extends React.Component {

  render () {
    const {cl} = this.props

    return (
      <div className='cn-class-card'>
        <div className='cn-class-card-content'>
          <div className='cn-class-title'>
            {cl.name}
          </div>
        </div>
      </div>
    )
  }
}

export default ClassCard

ClassCard.propTypes = {
  cl: PropTypes.object
}
