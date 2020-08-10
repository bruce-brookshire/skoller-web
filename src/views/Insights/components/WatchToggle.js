import React from 'react'
import PropTypes from 'prop-types'
import {CSSTransition} from 'react-transition-group'
import actions from '../../../actions'
import { inject, observer } from 'mobx-react'

@inject('rootStore') @observer
class WatchToggle extends React.Component {
  state = {changed: false}

  timer = () => setTimeout(() => this.setState({changed: false}), 2000)

  toggleWatching = async () => {
    let insightsStore = this.props.rootStore.insightsStore
    let watching = insightsStore.isWatching(this.props.user)
    console.log(watching)
    if (watching) {
      let watchlistId = insightsStore.watchlist.find(s => s.org_student_id === this.props.user.id).id

      if (insightsStore.userType === 'orgOwner') {
        await actions.insights.removeStudentFromOrgOwnerWatchlist(this.props.user.organization_id, this.props.rootStore.userStore.user.org_owners[0].id, watchlistId)
      } else if (insightsStore.userType === 'groupOwner') {
        let orgStudent = this.props.user
        let orgGroupToAddStudentToGroupOwnerWatchlist = insightsStore.groups.find(g => orgStudent.org_groups.map(gr => gr.id).includes(g.id))
        let memberId = insightsStore.groupOwners.find(go => go.user_id === this.props.rootStore.userStore.user.id).id
        let groupOwner = orgGroupToAddStudentToGroupOwnerWatchlist.owners.find(o => o.org_member_id === memberId)
        await actions.insights.removeStudentFromGroupOwnerWatchlist(this.props.user.organization_id, groupOwner.id, orgGroupToAddStudentToGroupOwnerWatchlist.id, orgStudent.id)
          .then(r => {
            let index = insightsStore.watchlist.indexOf(insightsStore.watchlist.find(s => s.org_student_id === orgStudent.id))
            insightsStore.watchlist.splice(index, 1)
          })
      }
    } else {
      if (insightsStore.userType === 'orgOwner') {
        await actions.insights.addStudentToOrgOwnerWatchlist(insightsStore.org.id, this.props.rootStore.userStore.user.org_owners[0].id, this.props.user.id)
          .then(r => console.log('watchlist response', r))
      } else if (insightsStore.userType === 'groupOwner') {
        let orgStudent = this.props.user
        let orgGroupToAddStudentToGroupOwnerWatchlist = insightsStore.groups.find(g => orgStudent.org_groups.map(gr => gr.id).includes(g.id))
        let memberId = insightsStore.groupOwners.find(go => go.user_id === this.props.rootStore.userStore.user.id).id
        let groupOwner = orgGroupToAddStudentToGroupOwnerWatchlist.owners.find(o => o.org_member_id === memberId)
        await actions.insights.addStudentToGroupOwnerWatchlist(this.props.user.organization_id, groupOwner.id, orgGroupToAddStudentToGroupOwnerWatchlist.id, orgStudent.id)
      }
    }

    await insightsStore.updateData(insightsStore.userType === 'orgOwner' ? ['orgOwnerWatchlist'] : ['groupOwnerWatchlist'])
    this.setState({changed: true})

    this.timer()
  }

  star = () => {
    return (
      <svg width="24px" height="24px" viewBox="0 0 24 24">
        <g stroke="none" strokeWidth="2" fill="none" fillRule="evenodd">
          <polygon id="Star" stroke="#55B9E5" fill={this.props.rootStore.insightsStore.isWatching(this.props.user) ? '#55B9E5' : 'none'} fillRule="nonzero" points="12 18.5 5.53436222 21.8991869 6.76918916 14.6995935 1.53837832 9.60081306 8.76718111 8.55040653 12 2 15.2328189 8.55040653 22.4616217 9.60081306 17.2308108 14.6995935 18.4656378 21.8991869"></polygon>
        </g>
      </svg>
    )
  }

  render () {
    return (
      <div className='si-watch-toggle' style={this.props.showConfirm ? {position: 'relative'} : {display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
        <div onClick={() => this.toggleWatching()}>
          {this.star()}
        </div>
        <CSSTransition
          in={this.state.changed}
          timeout={300}
          classNames="fade"
          unmountOnExit
        >
          <p className={this.props.rootStore.insightsStore.isWatching(this.props.user) ? 'added' : 'removed'} style={this.props.showConfirm ? {width: '112px', padding: '2px 2px 0 2px', position: 'absolute', bottom: '-6px'} : {margin: '-4px 4px 4px 8px', padding: '4px 4px 0 4px'}}>
            {this.props.rootStore.insightsStore.isWatching(this.props.user) ? 'Added to ' : 'Removed from '} watchlist
          </p>
        </CSSTransition>
      </div>
    )
  }
}

WatchToggle.propTypes = {
  user: PropTypes.object,
  rootStore: PropTypes.object,
  showConfirm: PropTypes.bool
}

export default WatchToggle
