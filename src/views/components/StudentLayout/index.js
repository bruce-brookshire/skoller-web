import React from 'react'
import StudentNav from '../StudentNav'
import PropTypes from 'prop-types'
import {browserHistory} from 'react-router'
import actions from '../../../actions'

class StudentLayout extends React.Component {
  onSubmitLogin () {
    const { userStore: { user } } = this.props.rootStore

    if (user.student) {
      if (user.student.is_verified) {
        actions.classes.getStudentClassesById(user.student.id).then((classes) => {
          classes.length > 0
            ? browserHistory.push('/student/classes')
            : browserHistory.push('/student/find-classes')
        }).catch(() => false)
      } else {
        browserHistory.push('/student/verify')
      }
    } else {
      browserHistory.push('/hub')
    }
  }

  render () {
    return (
      <div className='sk-layout'>
        <StudentNav />
        <main>{this.props.children}</main>
      </div>
    )
  }
}

StudentLayout.propTypes = {
  rootStore: PropTypes.object,
  noLogin: PropTypes.bool,
  imgPath: PropTypes.string,
  children: PropTypes.node.isRequired
}

export default StudentLayout
