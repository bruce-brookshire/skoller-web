import React from 'react'

class Slant extends React.Component {
  render () {
    const classNames = ['slants']
    const polygonClasses = ['even-section']
    if (this.props.className) classNames.push(this.props.className)
    if (this.props.className) polygonClasses.push(this.props.className)
    return (
        <svg className={classNames.join(' ')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polygon className={polygonClasses.join(' ')} fill="#57B9E4" points="0,100 100,0 100, 100"/>
        </svg>
    )
  }
}

export default Slant