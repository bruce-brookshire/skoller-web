import React from 'react'
import {inject, observer} from 'mobx-react'
import PropTypes from 'prop-types'
import StudentLayout from '../../components/StudentLayout'
import actions from '../../../actions'
import SkLoader from '../../../assets/sk-icons/SkLoader'
import ShareClasses from './ShareClasses'
import ShareNoClasses from './ShareNoClasses';

@inject('rootStore') @observer
class Share extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      user: this.props.rootStore.userStore.user,
      classes: [],
      loading: true
    }

    this.getClasses()
    this.props.rootStore.studentNavStore.setActivePage('share')
  }

  getClasses () {
    this.setState({loading: true})
    actions.classes
      .getStudentClassesById(this.state.user.student.id)
      .then(classes => {
        let setupClasses = classes.filter(c => c.status.id >= 1400)
        this.setState({loading: false, classes: setupClasses, classSelection: setupClasses[0]})
      })
  }

  renderHeader () {
    return (
      <div className='sk-share-header'>
        <h1>Share with Your Community</h1>
        <p>Inviting classmates to Skoller helps you keep up with classes and earn points!</p>
        <div className='sk-share-points'>
          <p>Your points: {this.state.user.student.points}</p>
        </div>
      </div>
    )
  }

  renderContent () {
    return (
      <div className='sk-share-container'>
        {this.renderHeader()}
        {this.state.classes.length > 0
          ? <ShareClasses
            classes={this.state.classes}
            user={this.state.user}
          />
          : <ShareNoClasses
            user={this.state.user}
          />
        }
      </div>
    )
  }

  render () {
    return (
      <StudentLayout>
        {this.state.loading
          ? <SkLoader />
          : this.renderContent()
        }
      </StudentLayout>
    )
  }
}

Share.propTypes = {
  rootStore: PropTypes.object
}

export default Share
