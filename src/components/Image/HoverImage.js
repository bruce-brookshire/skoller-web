import React from 'react'
import PropTypes from 'prop-types'

class HoverImage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      src: this.props.img
    }
  }

  mouseOver () {
    this.setState({src: this.props.hoverImg})
  }

  mouseOut () {
    this.setState({src: this.props.img})
  }

  render () {
    return (
      <img className={this.props.className} src={this.state.src} onMouseOver={this.mouseOver.bind(this)} onMouseOut={this.mouseOut.bind(this)} />
    )
  }
}

HoverImage.propTypes = {
  hoverImg: PropTypes.string,
  img: PropTypes.string,
  className: PropTypes.string
}
export default HoverImage
