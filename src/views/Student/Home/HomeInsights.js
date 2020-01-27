import React from 'react'
import {inject, observer, PropTypes} from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { VictoryBar } from 'victory'

@inject('rootStore') @observer
class HomeInsights extends React.Component {
  constructor (props) {
    super(props)

    console.log(this.props.rootStore.studentAssignmentStore)
  }
  render () {
    return (
      <div className="home-shadow-box">
        <h1 className='home-heading' onClick={() => this.props.history.push('/student/tasks')}>Insights</h1>
        <div className="home-sub-heading">Next 10 days</div>
        <div className="home-card-content">
          <div className='home-insights'>
            <VictoryBar />
          </div>
        </div>
      </div>
    )
  }
}

HomeInsights.propTypes = {
  history: PropTypes.arrayOrObservableArray,
  rootStore: PropTypes.object
}

export default withRouter(HomeInsights)
