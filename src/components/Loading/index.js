import React from 'react'

class Loading extends React.Component {
  render () {
    return (
      <i className="fa fa-circle-o-notch fa-spin" style={{color: '#57b9e4', ...this.props.style}} />
    )
  }
}

export default Loading
