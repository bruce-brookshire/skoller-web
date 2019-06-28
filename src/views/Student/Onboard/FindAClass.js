import React from 'react'
import SkProgressBar from '../../components/SkProgressBar'
import PropTypes from 'prop-types'

class SelectSchool extends React.Component {
  render () {
    return (
      <div>
        <SkProgressBar progress={0.5} width={'100%'} backgroundColor={'$cn-color-blue'}/>
        <div className='onboard-find-class'>
          <h1>Stanford University</h1>
          <div className="onboard-find-class-sammi-container">
            <img src='/src/assets/images/sammi/Wow@3x.png' />
            <div className="sammi-message"><p>Find your first class!</p></div>
          </div>
        </div>
        <div className='onboard-next' onClick={() => this.props.onSubmit()}>
          <p>Next</p>
        </div>
      </div>
    )
  }
}

SelectSchool.propTypes = {
  onSubmit: PropTypes.func
}

export default SelectSchool
