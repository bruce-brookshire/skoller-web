import React from 'react'
import PropTypes from 'prop-types'

class WeightConverter extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      val_converter: '0'
    }
  }

  toggleConverter (e) {
    let obj = {}
    if (e.target.value > 0.5) {
      obj[e.target.name] = 1
    } else {
      obj[e.target.name] = 0
    }
    this.setState(obj)
  }

  render () {
    const classes = ['ball']
    const {value, id} = this.props
    if (value) classes.push('active')

    return (
      <div id={id} className='cn-weight-converter' onClick={() => this.props.onChange()}>
        <div className='slider full-width round'>
          <div className={classes.join(' ')}/>
        </div>
      </div>
    )
  }
}

WeightConverter.propTypes = {
  value: PropTypes.bool,
  id: PropTypes.string,
  onChange: PropTypes.func
}

export default WeightConverter
