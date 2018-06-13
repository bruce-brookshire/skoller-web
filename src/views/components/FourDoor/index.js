import React from 'react'
import PropTypes from 'prop-types'

class FourDoor extends React.Component {
  constructor (props) {
    super(props)

    // Boolean lists enabled as follows:
    // is_diy_enabled, is_diy_preferred, is_auto_syllabus
    this.fourDoorStatesDef = {
      diy_sw: [true, false, true],
      diy_preferred_sw: [true, true, true],
      sw: [false, false, true],
      diy: [true, true, false]
    }
  }

  handleFourDateStateChange () {
    const values = Object.values(this.fourDoorStatesDef)
    const states = Object.keys(this.fourDoorStatesDef)
    const curState = this.getFourDoorState()
    const currIdx = states.findIndex(s => s === curState)
    const nextIdx = currIdx + 1 > states.length - 1 ? 0 : currIdx + 1

    const { school } = this.props

    let form = {
      is_diy_enabled: values[nextIdx][0],
      is_diy_preferred: values[nextIdx][1],
      is_auto_syllabus: values[nextIdx][2]
    }

    school ? this.props.onChange(school, form) : this.props.onChange(form)
  }

  getFourDoorState () {
    const statesDef = this.fourDoorStatesDef
    const { is_diy_enabled: diy, is_diy_preferred: diyPref, is_auto_syllabus: autoSyllabus } = this.props.currentValues
    const curState = [diy, diyPref, autoSyllabus]
    const comp = JSON.stringify(curState)
    const curIdx = Object.values(statesDef).findIndex((b) => comp === JSON.stringify(b))

    return Object.keys(statesDef)[curIdx]
  }

  render () {
    let sImg = 'default'
    let dImg = 'default'
    let label = 'Normal'

    switch (this.getFourDoorState()) {
      case 'diy_preferred_sw':
        sImg = 'default'
        dImg = 'on'
        label = 'DIY Preferred'

        break
      case 'sw':
        sImg = 'on'
        dImg = 'off'
        label = 'Skoller only'
        break
      case 'diy':
        sImg = 'off'
        dImg = 'on'
        label = 'DIY only'
        break
    }

    return (
      <div>
        {label}
        <a onClick={this.handleFourDateStateChange.bind(this)}
          style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <img className='four-door-icon margin-right' src={`/src/assets/images/four_door/skoller_${sImg}.png`} />
          <img className='four-door-icon' src={`/src/assets/images/four_door/diy_${dImg}.png`} />
        </a>
      </div>
    )
  }
}

FourDoor.propTypes = {
  onChange: PropTypes.func,
  school: PropTypes.object,
  currentValues: PropTypes.object
}

export default FourDoor
