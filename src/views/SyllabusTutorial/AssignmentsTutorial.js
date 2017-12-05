import React from 'react'
import PropTypes from 'prop-types'
import Tutorial from './Tutorial'
import Assignments from './TestAssignments'
import AssignmentSyllabus from './AssignmentSyllabus'

const styles = {
  toolTip: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    border: '1px solid black',
    borderRadius: '10px',
    mainColor: '#ff4456',
    textAlign: 'center',
    overflow: 'hidden',
    maxWidth: '29rem',
    arrow: {
    },
    beacon: {
      offsetX: 10,
      offsetY: 10,
      inner: '#ccc',
      outer: '#ccc'
    },
    close: {
      display: 'none'
    },
    header: {
      display: 'none',
      textAlign: 'right'
      // or any style attribute
    },
    main: {
      padding: '20px'
    },
    footer: {
      display: 'none'
    },
    skip: {
      color: '#f04'
    },
    hole: {
      backgroundColor: 'rgba(255,255,255,0)'
    }
  }
}

const steps = [
  {
    title: '',
    text: 'The syllabi will pop up in this box on the right.',
    selector: '.syllabus',
    position: 'top',
    type: 'hover',
    isFixed: true,
    style: styles.toolTip
  },
  {
    title: '',
    text: 'And your control panel pops up on the left.',
    selector: '.control-panel',
    position: 'top',
    type: 'hover',
    isFixed: true,
    style: styles.toolTip
  },
  {
    title: '',
    text: 'First, look through the syllabus for the section with the assignments and their due dates.',
    selector: '#assignments-table',
    position: 'top',
    type: 'hover',
    isFixed: true,
    style: styles.toolTip,
    scrollToRef: 'syllabus',
    scrollToElementId: 'assignments-table',
    scrollExtraHeight: 300

  },
  {
    title: '',
    text: 'Start entering the assignments in your control panel. If there\'s no due date listed for an assignment, don\'t add the assignment. Feel free to copy and paste from the syllabus - it\'ll be faster and more accurate',
    selector: '#class-editor-assignment-form',
    position: 'top',
    type: 'hover',
    isFixed: true,
    style: styles.toolTip,
    scrollToRef: 'controlPanel',
    scrollToElementId: 'class-editor-assignment-form'
  },
  {
    title: '',
    text: 'The assignments will pop up in this box. If you mess up, you can delete or edit categories by clicking on them.',
    selector: '#class-editor-assignments-table',
    position: 'top',
    type: 'hover',
    isFixed: true,
    style: styles.toolTip,
    scrollToRef: 'controlPanel',
    scrollToElementId: 'class-editor-assignments-table',
    scrollExtraHeight: -1000
  },
  {
    title: '',
    text: 'If something just isn\'t right with this class or the file dropped, don\'t get hung up! Throw it to the side by marking it as having issues and someone at the Skollar HQ will resolve the issue.',
    selector: '.having-issues',
    position: 'top',
    type: 'hover',
    isFixed: true,
    style: styles.toolTip,
    private: true
  },
  {
    title: '',
    text: 'Once everything looks good, hit the save button to save your changes and move onto the next class. Go ahead and hit that button to get started.',
    selector: '.save-button',
    position: 'top',
    type: 'hover',
    isFixed: true,
    style: styles.toolTip,
    allowClicksThruHole: true
  }
]

class AssignmentsTutorial extends React.Component {
  render () {
    return (
      <Tutorial
        {...this.props}
        control={<Assignments />}
        description='For Skoller to work, we need to grab the assignments for each class. Look at this example...'
        header='Assignments'
        steps={steps}
        syllabus={<AssignmentSyllabus />}
      />
    )
  }
}

AssignmentsTutorial.propTypes = {

}

export default AssignmentsTutorial
