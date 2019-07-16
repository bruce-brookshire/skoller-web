import React from 'react'
import SkProgressBar from '../../components/SkProgressBar'
import PropTypes from 'prop-types'
import actions from '../../../actions'
import { inject, observer } from 'mobx-react'
import { browserHistory } from 'react-router';

@inject('rootStore') @observer
class SelectSchool extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      loading: true,
      firstClass: null
    }

    this.getFirstClass()
  }

  getFirstClass () {
    this.setState({loading: true})
    actions.classes.getStudentClassesById(this.props.rootStore.userStore.user.student.id).then((classes) => {
      if (classes.length > 1) {
        browserHistory.push('/student')
      } else if (classes.length === 0) {
        browserHistory.push('/onboard/select-school')
      } else {
        this.setState({
          firstClass: classes[0],
          loading: false
        })
      }
    })
  }

  render () {
    return (
      <div>
        <SkProgressBar progress={0.75} width={'100%'} backgroundColor={'$cn-color-blue'}/>
        {this.state.loading
          ? null
          : <div className='onboard-first-class'>
            <h1>{this.state.firstClass.name}</h1>
            <div className="onboard-first-class-sammi-container">
              <div className="sammi-message"><p>Yay! You're in your first class!</p></div>
              <img src='/src/assets/images/sammi/Smile@3x.png' />
            </div>
          </div>
        }
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
