import React from 'react'
import { observer, inject } from 'mobx-react'
import StudentLayout from '../../components/StudentLayout'
import CalendarComponent from './CalendarComponent'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'

@inject('rootStore')
@observer
class Calendar extends React.Component {
  constructor (props) {
    super(props)
    this.props.rootStore.navStore.setActivePage('calendar') // set active page state for navbar
    this.props.rootStore.navbarStore.title = '' // clear the 'title' at the top of the page (let's remove this later, probably)
    this.props.rootStore.navStore.location = this.props.location // set active page route location for access from other components
  }

  render () {
    return (
      <StudentLayout>
        {/* use react-helmet here to prevent Chrome from trying to translate the abbreviation "Fri" ヽ(ಠ_ಠ)ノ */}
        <Helmet>
          <meta name="google" value="notranslate" />
        </Helmet>
        <div className="calendar-container" style={this.props.onboardData ? {marginTop: '64px', boxSizing: 'border-box', overflow: 'hidden', maxHeight: 'calc(100vh - 64px)', height: '100%'} : null}>
          <CalendarComponent onboardData={this.props.onboardData} />
        </div>
      </StudentLayout>
    )
  }
}

Calendar.propTypes = {
  location: PropTypes.object,
  rootStore: PropTypes.object,
  onboardData: PropTypes.object
}

export default Calendar
