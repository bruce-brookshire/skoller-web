import React from 'react'
import {inject, observer} from 'mobx-react'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import JobCell from './JobCell'
import StudentLayout from '../../../components/StudentLayout'
import InfiniteScroll from 'react-infinite-scroller'
import SkLoader from '../../../../assets/sk-icons/SkLoader'
import JobsDisclaimer from './JobsDisclaimer'

@inject('rootStore') @observer
class JobsBrowse extends React.Component {
  constructor (props) {
    super(props)

    if (this.props.rootStore.studentJobsStore.listings.length === 0) {
      this.props.rootStore.studentJobsStore.getJobsListings()
    }

    this.props.rootStore.studentNavStore.setActivePage('jobs/browse')
    this.props.rootStore.studentNavStore.location = this.props.location
  }

  loadMore = () => {
    this.props.rootStore.studentJobsStore.loadMoreJobs()
  }

  renderJobs () {
    let items = []
    this.props.rootStore.studentJobsStore.listings.map(job => {
      items.push(
        <div key={this.props.rootStore.studentJobsStore.listings.indexOf(job)}>
          <JobCell job={job} />
        </div>
      )
    })

    if (items.length > 0) {
      return (
        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadMore}
          hasMore={true}
          loader={<div className="loader" key={0}><SkLoader /></div>}
          useWindow={false}
        >
          <div>
            <div key={-1} className='spacer' />
            {items}
          </div>
        </InfiniteScroll>
      )
    } else {
      return (
        <p style={{color: 'white', marginTop: '100px'}}>No listings right now. Check back soon for more results!</p>
      )
    }
  }

  renderContent () {
    let items = []
    this.props.rootStore.studentJobsStore.listings.map(job => {
      items.push(
        <div key={this.props.rootStore.studentJobsStore.listings.indexOf(job)}>
          <JobCell job={job} />
        </div>
      )
    })

    return (
      <div className='jobs-browse-container'>
        <div className='jobs-browse-header'>
          <h1>Browse Jobs</h1>
          <JobsDisclaimer />
        </div>
        {this.renderJobs()}
      </div>
    )
  }

  render () {
    return (
      <StudentLayout>
        {this.props.rootStore.studentJobsStore.loadingListings
          ? <SkLoader />
          : this.renderContent()
        }
      </StudentLayout>
    )
  }
}

JobsBrowse.propTypes = {
  rootStore: PropTypes.object,
  location: PropTypes.object
}

export default withRouter(JobsBrowse)
