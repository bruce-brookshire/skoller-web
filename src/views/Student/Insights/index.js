import React from 'react'
import {inject, observer} from 'mobx-react'
import PropTypes from 'prop-types'
import StudentLayout from '../../components/StudentLayout'
import InsightsPage from './InsightsTab/Insights'

@inject('rootStore') @observer
class Insights extends React.Component {
  render () {
    return (
      <StudentLayout>
        <InsightsPage />
      </StudentLayout>
    )
  }
}

Insights.propTypes = {
  rootStore: PropTypes.object,
  location: PropTypes.object
}

export default Insights
