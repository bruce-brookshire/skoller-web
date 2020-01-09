import React from 'react'
import PropTypes from 'prop-types'

class SeeMore extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      seeMore: this.props.children.length > 1
    }
  }

  render () {
    if (this.state.seeMore && !this.props.disable) {
      return (
        <div
          className='see-more'
          style={{
            height: this.state.seeMore ? this.props.hideHeight : '100%',
            marginBottom: '0.5rem',
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          <p className='see-more-button' onClick={() => this.setState({seeMore: false})}>
            {this.props.customText ? this.props.customText : 'See more'}
          </p>
          <div style={{height: '100%'}}>
            {this.props.children}
          </div>
        </div>
      )
    } else {
      return (
        <div>
          {this.props.children}
        </div>
      )
    }
  }
}

SeeMore.propTypes = {
  children: PropTypes.array,
  hideHeight: PropTypes.string,
  customText: PropTypes.string,
  disable: PropTypes.bool
}

export default SeeMore
