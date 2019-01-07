import React from 'react'
import PropTypes from 'prop-types'

class Card extends React.Component {
  render () {
    const {title, content, boxClassName, contentClassName} = this.props

    return (
      <div className={'cn-shadow-box ' + boxClassName}>
        <div className={'cn-shadow-box-content ' + contentClassName}>
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
  title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  content: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  titleClass: PropTypes.string,
  boxClassName: PropTypes.string,
  contentClassName: PropTypes.string
}
