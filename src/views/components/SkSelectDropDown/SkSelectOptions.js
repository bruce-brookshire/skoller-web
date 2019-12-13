import React from 'react'
import PropTypes from 'prop-types'
import OutsideClickHandler from 'react-outside-click-handler'

class SkSelectOptions extends React.Component {
  constructor () {
    super()

    this.state = {
      boundingClient: null,
      top: 0,
      y: 0
    }

    window.addEventListener('scroll', this.updatePosition)

    // if a modal is open, this updates the top based on the scroll position of the modal
    this.skModal = document.getElementById('sk-modal-container')
    if (this.skModal) {
      this.skModal.addEventListener('scroll', this.updatePosition)
    }
  }

  componentDidMount () {
    this.updatePosition()
  }

  componentWillUnmount () {
    if (this.skModal) {
      this.skModal.removeEventListener('scroll', () => this.updatePosition())
    }
    window.removeEventListener('scroll', () => this.updatePosition())
  }

  updatePosition = () => {
    this.setState({boundingClient: this.props.refObject.getBoundingClientRect()})
    console.log(this.props.refObject.getBoundingClientRect())
    if (this.ref) {
      this.setState({top: this.ref.getBoundingClientRect().top, y: this.ref.getBoundingClientRect().y})
    } else {
      this.setState({top: 0})
    }
  }

  handleClickOutside = () => {
    this.props.toggle(false)
  }

  render () {
    let style = {width: this.props.refWidth}
    if (this.skModal) {
      style.top = 0
      style.transform = `translateY(${this.state.y}px)`
      // style.zIndex = '2000'
    }
    return (
      <div ref={ref => { this.ref = ref }} onScroll={() => console.log('scroll')}>
        <OutsideClickHandler
          onOutsideClick={() => this.handleClickOutside()}
        >
          <div style={style} className='sk-select-dropdown'>
            {this.props.optionsMap()}
          </div>
        </OutsideClickHandler>
      </div>
    )
  }
}

SkSelectOptions.propTypes = {
  optionsMap: PropTypes.func,
  show: PropTypes.bool,
  toggle: PropTypes.func,
  refWidth: PropTypes.string,
  refObject: PropTypes.object
}

export default SkSelectOptions
