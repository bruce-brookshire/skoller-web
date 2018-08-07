import React from 'react'
import PropTypes from 'prop-types'

class Card extends React.Component {
  render () {
    const {title, content} = this.props

    return (
      <div className='cn-shadow-box'>
        <div className='cn-shadow-box-content'>
          {title && <div className={'cn-card-title margin-bottom'}>
            {title}
          </div>}
          {content}
        </div>
      </div>
    )
  }
}

export default Card

Card.propTypes = {
  title: PropTypes.element,
  content: PropTypes.element,
  titleClass: PropTypes.string
}
