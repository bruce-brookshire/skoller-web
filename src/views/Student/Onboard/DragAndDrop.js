import React from 'react'
import PropTypes from 'prop-types'

class DragAndDrop extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      dragging: false
    }
  }

  handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  handleDragIn = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.dragCounter++

    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      this.setState({dragging: true})
    }
  }

  handleDragOut = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.dragCounter--
    if (this.dragCounter > 0) return
    this.setState({dragging: false})
  }

  handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.setState({dragging: false})
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      this.props.handleDrop(e.dataTransfer.files)
      e.dataTransfer.clearData()
    }
    this.dragCounter = 0
  }

  componentDidMount () {
    let div = this.dropRef
    div.addEventListener('dragenter', this.handleDragIn)
    div.addEventListener('dragleave', this.handleDragOut)
    div.addEventListener('dragover', this.handleDrag)
    div.addEventListener('drop', this.handleDrop)
    this.dragCounter = 0
  }

  componentWillUnmount () {
    let div = this.dropRef
    div.removeEventListener('dragenter', this.handleDragIn)
    div.removeEventListener('dragleave', this.handleDragOut)
    div.removeEventListener('dragover', this.handleDrag)
    div.removeEventListener('drop', this.handleDrop)
  }

  render () {
    return (
      <div
        className='sk-drag-and-drop'
        ref={dropRef => { this.dropRef = dropRef }}
      >
        {this.state.dragging &&
          <div
            className='sk-drag-and-drop-overlaw'
            style={{
              border: 'dashed grey 1px',
              backgroundColor: 'rgba(255,255,255,.8)',
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 1
            }}
          >
          </div>
        }
        {this.props.children}
      </div>
    )
  }
}

DragAndDrop.propTypes = {
  children: PropTypes.object
}

export default DragAndDrop
