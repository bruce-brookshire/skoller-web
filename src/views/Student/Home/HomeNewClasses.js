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
          <div className="row">
            <div className="center-block col-md-6">
              Introduction to phychology<br></br>
              Upload Syllabus
            </div>
            <div className="center-block col-md-6">Sociology</div>
          </div>
          <div className="row">
            <div className="center-block col-md-6">
              Introduction to phychology
            </div>
            <div className="center-block col-md-6">Sociology</div>
          </div>
          <div className="row">
            <div className="center-block col-md-6">
              Introduction to phychology
            </div>
            <div className="center-block col-md-6">Sociology</div>
          </div>
        </div>
      )
    }
  }
}

HomeClasses.propTypes = {
  classes: PropTypes.array,
  onAddClass: PropTypes.func,
  onClassSelect: PropTypes.func,
  launchClassStatusModal: PropTypes.func,
  rootStore: PropTypes.object
}

export default HomeClasses
