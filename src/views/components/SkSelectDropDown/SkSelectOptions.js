import React from 'react'
import PropTypes from 'prop-types'
import OutsideClickHandler from 'react-outside-click-handler'

class SkSelectOptions extends React.Component {
  constructor () {
    super()

    this.state = {
      boundingClient: null,
      top: 0,
      y: 0,
      dropdownRefTop: null,
      dropdownRefHeight: null,
      maxHeight: '200'
    }

    this.dropdownRef = null

    window.addEventListener('scroll', this.updatePosition)

    // if a modal is open, this updates the top based on the scroll position of the modal
    this.skModal = document.getElementById('sk-modal-container')
    if (this.skModal) {
      this.skModal.addEventListener('scroll', this.updatePosition)
    }

    console.log('re-constructing')
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
    if (this.ref) {
      this.setState({top: this.ref.getBoundingClientRect().top, y: this.ref.getBoundingClientRect().y})
    } else {
      this.setState({top: 0})
    }
  }

  updateDropDownPosition () {
    if (this.dropdownRef) {
      let ref = this.dropdownRef.getBoundingClientRect()
      let maxHeight = this.state.maxHeight
      if ((this.state.dropdownRefTop + this.state.dropdownRefHeight) > (window.innerHeight)) {
        maxHeight = (window.innerHeight - this.state.dropdownRefTop).toString() + 'px'
      } else {
        maxHeight = this.state.maxHeight + 'px'
      }
      this.setState({dropdownRefTop: ref.top, dropdownRefHeight: ref.height, maxHeight})
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
      style.maxHeight = this.state.maxHeight
    }

    return (
      <div ref={ref => { this.ref = ref }}>
        <OutsideClickHandler
          onOutsideClick={() => this.handleClickOutside()}
        >
          <div onScroll={() => this.updateDropDownPosition()} ref={ref => { this.dropdownRef = ref }} style={style} className='sk-select-dropdown'>
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
