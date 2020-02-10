import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import ClassList from '../../components/ClassList'
import JoinFirstClassPrompt from '../../components/Sammi/Prompts/JoinFirstClassPrompt'
import SecondClassPrompt from '../../components/Sammi/Prompts/SecondClassPrompt'
import SkLoader from '../../../assets/sk-icons/SkLoader';

@inject('rootStore') @observer
class HomeClasses extends React.Component {
  launchClassStatusModal (cl) {
    if (this.props.launchClassStatusModal) {
      this.props.launchClassStatusModal(cl)
    } else {
      return null
    }
  }

  render () {
    if (this.props.rootStore.studentClassesStore.loading) {
      return <SkLoader />
    } else {
      return (
        <div className='home-classes'>
          <ClassList
            classes={this.props.rootStore.studentClassesStore.classes}
            emptyMessage='You are not enrolled in any classes.'
            onSelect={this.props.onClassSelect}
          />
          <JoinFirstClassPrompt onAddClass={() => this.props.onAddClass()} show={this.props.classes.length === 0} launchClassStatusModal={(cl) => this.launchClassStatusModal(cl)} />
          <SecondClassPrompt onAddClass={() => this.props.onAddClass()} show={this.props.classes.length === 1} launchClassStatusModal={(cl) => this.launchClassStatusModal(cl)} />
          {this.props.classes.length < 2 &&
            <br />
          }
        </div>
      )
    }
  }
}

HomeClasses.propTypes = {
  classes: PropTypes.array,
  onAddClass: PropTypes.func,
  onClassSelect: PropTypes.function,
  launchClassStatusModal: PropTypes.function,
  rootStore: PropTypes.object
}

export default HomeClasses
