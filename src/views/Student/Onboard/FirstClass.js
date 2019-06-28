import React from 'react'
import SkProgressBar from '../../components/SkProgressBar'
import PropTypes from 'prop-types'

class SelectSchool extends React.Component {
  render () {
    return (
      <div>
        <SkProgressBar progress={0.75} width={'100%'} backgroundColor={'$cn-color-blue'}/>
        <div className='onboard-first-class'>
          <h1>Intermediate Microeconomics</h1>
          <div className="onboard-first-class-sammi-container">
            <div className="sammi-message"><p>Yay! You're in your first class!</p></div>
            <img src='/src/assets/images/sammi/Smile@3x.png' />
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
