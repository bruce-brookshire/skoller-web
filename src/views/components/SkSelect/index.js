import React from 'react'
import PropTypes from 'prop-types'
import SkSelectDropDown from '../SkSelectDropDown'

class SkSelect extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      open: false
    }
  }

  render () {
    let jobsStyle = {
      backgroundColor: '#efeff4',
      borderColor: '#15A494',
      color: '#15A494'
    }

    let className = (this.props.className ? this.props.className : '')
    return (
      <div className={className}>
        <div
          className='sk-select'
          style={this.props.jobsMode ? jobsStyle : {}}
          onClick={() => this.setState({open: !this.state.open})}
        >
          <p className='sk-select-selection'>{this.props.selection}</p>
        </div>
        <div onClick={() => this.setState({open: !this.state.open})}>
          <SkSelectDropDown
            optionsMap={this.props.optionsMap}
            toggle={() => this.setState({open: !this.state.open})}
            show={this.state.open}
            disableModalLogic={this.props.disableModalLogic}
            jobsMode={this.props.jobsMode}
          />
        </div>
      </div>
    )
  }
}

SkSelect.propTypes = {
  selection: PropTypes.string,
  optionsMap: PropTypes.func,
  className: PropTypes.string,
  disableModalLogic: PropTypes.bool,
  jobsMode: PropTypes.bool
}

export default SkSelect
