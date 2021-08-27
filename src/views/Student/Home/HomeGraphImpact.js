import React from 'react'
import {inject, observer} from 'mobx-react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import moment from 'moment'
import AssignmentsTimeline from '../Insights/AssignmentsTimeline'
import WeightsTimeline from '../Insights/WeightsTimeline'
import Distribution from '../Insights/Distribution'
import Sammi from '../../components/Sammi'
import Progress from '../Insights/Progress'
import SkSelect from '../../components/SkSelect'
import ToolTip from '../../components/ToolTip'


import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-bootstrap4';
import '@devexpress/dx-react-chart-bootstrap4/dist/dx-react-chart-bootstrap4.css';
import { Animation } from '@devexpress/dx-react-chart';

const data = [
  { year: '1950', population: 2.525 },
  { year: '1960', population: 3.018 },
  { year: '1970', population: 3.682 },
  { year: '1980', population: 4.440 },
  { year: '1990', population: 5.310 },
  { year: '2000', population: 6.127 },
  { year: '2010', population: 6.930 },
];

@inject('rootStore') @observer
class HomeGraphImpact extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      type: 'Distribution',
      data,
    }
  }

  




  




  render () {
      const { data: chartData } = this.state;
    return (
      <div className='home-shadow-box margin-top home-insights'>
       
           <div className="card">
            <Chart
          data={chartData}
        >
          <ArgumentAxis />
          <ValueAxis max={7} />

          <BarSeries
            valueField="population"
            argumentField="year"
          />
          <Title text="Grade Impact" />
          <Animation />
        </Chart>
          </div>
          
        
        
      </div>
    )
  }
}

HomeGraphImpact.propTypes = {
  history: PropTypes.object,
  rootStore: PropTypes.object
}

export default withRouter(HomeGraphImpact)
