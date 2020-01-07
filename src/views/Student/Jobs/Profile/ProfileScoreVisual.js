import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import PropTypes from 'prop-types'
import { calculateTotalProfileScore } from '../utils'
import { inject, observer } from 'mobx-react'

@inject('rootStore') @observer
class ProfileScoreVisual extends React.Component {
  constructor (props) {
    super(props)

    let score = calculateTotalProfileScore(this.props.profile, this.props.user) + 0
    let timeoutTime = (100 / score) * 2

    this.state = {
      score,
      timeoutTime,
      displayScore: 0
    }

    this.timeout = undefined
  }

  componentDidMount () {
    this.startCountUp()
  }

  componentWillUnmount () {
    window.clearTimeout(this.timeout)
  }

  getTimeout () {
    if (this.state.score - this.state.displayScore < 6) {
      return this.state.timeoutTime + 20
    } else if (this.state.score - this.state.displayScore < 12) {
      return this.state.timeoutTime + 12
    } else if (this.state.displayScore / this.state.score > 0.5) {
      return this.state.timeoutTime + 0.25
    } else if (this.state.displayScore / this.state.score > 0.25) {
      return this.state.timeoutTime + 0.1
    } else {
      return this.state.timeoutTime
    }
  }

  plusOne () {
    this.setState({
      displayScore: this.state.displayScore + 1,
      timeoutTime: this.getTimeout()
    })
  }

  startCountUp () {
    this.timeout = window.setTimeout(() => {
      if (this.state.score > this.state.displayScore) {
        this.plusOne()
        this.startCountUp()
      }
    }, this.state.timeoutTime)
  }

  render () {
    let percentage = this.state.displayScore
    let color = '#15A494'

    if (this.state.score <= 50) {
      color = '#FF4159'
    } else if (this.state.score <= 75) {
      color = '#F7D300'
    }

    if (this.props.placeholder) {
      return (
        <div style={{height: '124px', width: '124px', margin: '1rem', fontWeight: '600'}}>
          <CircularProgressbar
            value={0}
            text={``}
            styles={buildStyles({

              // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
              strokeLinecap: 'round',

              // Text size
              textSize: '18px',

              // How long animation takes to go from one percentage to another, in seconds
              // pathTransitionDuration: 0.5,

              // Can specify path transition in more detail, or remove it entirely
              pathTransition: 'none',

              // Colors
              pathColor: color,
              textColor: color,
              trailColor: '#00000000',
              backgroundColor: '#4a4a4a'
            })}
          />
        </div>
      )
    } else {
      return (
        <div style={{height: '124px', width: '124px', margin: '1rem', fontWeight: '600'}}>
          <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            styles={buildStyles({

              // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
              strokeLinecap: 'round',

              // Text size
              textSize: '18px',

              // How long animation takes to go from one percentage to another, in seconds
              // pathTransitionDuration: 0.5,

              // Can specify path transition in more detail, or remove it entirely
              pathTransition: 'none',

              // Colors
              pathColor: color,
              textColor: color,
              trailColor: '#00000000',
              backgroundColor: '#4a4a4a'
            })}
          />
        </div>
      )
    }
  }
}

ProfileScoreVisual.propTypes = {
  profile: PropTypes.object,
  user: PropTypes.object,
  placeholder: PropTypes.bool
}

export default ProfileScoreVisual
