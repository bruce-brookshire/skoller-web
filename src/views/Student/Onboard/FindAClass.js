import React from 'react'
import SkProgressBar from '../../components/SkProgressBar'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

@inject('rootStore') @observer
class SelectSchool extends React.Component {
  render () {
    return (
      <div>
        <SkProgressBar progress={0.5} width={'100%'} backgroundColor={'$cn-color-blue'}/>
        <div className='onboard-find-class'>
          <h1>{this.props.params.schoolChoice.name}</h1>
          <h3>{this.props.params.termChoice.name}</h3>
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
  onSubmit: PropTypes.func,
  rootStore: PropTypes.object,
  params: PropTypes.object
}

export default SelectSchool
