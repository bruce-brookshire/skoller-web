import React from 'react'
import SkProgressBar from '../../components/SkProgressBar'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
import actions from '../../../actions'

@inject('rootStore') @observer
class SelectSchool extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      schools: []
    }
  }

  searchSchools (value) {
    if (value) {
      this.setState({loading: true, value})
      console.log(this.props.rootStore.userStore)
      actions.schools.searchSchools(value).then((schools) => {
        this.setState({schools})
      }).catch(() => { this.setState({loading: false}) })
    } else {
      this.setState({schools: []})
    }
  }

  renderSchool () {
    return (
      <div className='sk-select-school'>
        <div className='sk-select-school-label'>School</div>
        <div className='sk-select-school-field' style={{height: '25px', width: '100%', border: '1px solid rgba(0,0,0,.12)', boxSizing: 'border-box'}} contentEditable={true} onInput={e => { this.searchSchools(e.currentTarget.textContent) }}>
        </div>
        {(this.state.schools)
          ? this.state.schools.map((school) => school.name)
          : null
        }
      </div>
    )
  }

  render () {
    return (
      <div>
        <SkProgressBar progress={0.25} width={'100%'} backgroundColor={'$cn-color-blue'}/>
        <div className='onboard-select-school'>
          <h1>Meet Sammi 👋</h1>
          <div className="onboard-select-school-sammi-container">
            <div className="sammi-message"><p>I found your school!</p></div>
            <img src='/src/assets/images/sammi/Smile@3x.png' />
          </div>
        </div>
        {this.renderSchool()}
        <div className='onboard-next' onClick={() => this.props.onSubmit()}>
          <p>Next</p>
        </div>
      </div>
    )
  }
}

SelectSchool.propTypes = {
  onSubmit: PropTypes.func,
  rootStore: PropTypes.object
}

export default SelectSchool
