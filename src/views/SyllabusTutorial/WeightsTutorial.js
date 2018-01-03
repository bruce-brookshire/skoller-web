import React from 'react'
import Tutorial from './Tutorial'
import Weights from './TestWeights'
import WeightSyllabus from './WeightSyllabus'

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
    text: 'First, look through the syllabus for the section with the assignment weights.',
    selector: '#weights-table',
    position: 'top',
    type: 'hover',
    isFixed: true,
    style: styles.toolTip,
    scrollToRef: 'syllabus',
    scrollToElementId: 'weights-table'
  },
  {
    title: '',
    text: 'Then select whether the class is based on percentages or points. This class is based on percentages, so we will leave it there.',
    selector: '#class-editor-weight-converter',
    position: 'top',
    type: 'hover',
    isFixed: true,
    style: styles.toolTip,
    scrollToRef: 'controlPanel',
    scrollToElementId: 'class-editor-weight-converter',
    scrollExtraHeight: 1000
  },
  {
    title: '',
    text: 'Now you can start entering assignment categories and their respective weights. Feel free to copy paste from the syllabus-it\'ll be faster and more accurate.',
    selector: '#class-editor-weight-form',
    position: 'top',
    type: 'hover',
    isFixed: true,
    style: styles.toolTip,
    scrollToRef: 'controlPanel',
    scrollToElementId: 'class-editor-weight-form'
  },
  {
    title: '',
    text: 'The weights will pop up in this box. If you mess up, you can delete or edit categories by clicking on them.',
    selector: '#class-editor-weights-table',
    position: 'top',
    type: 'hover',
    isFixed: true,
    style: styles.toolTip,
    scrollToRef: 'controlPanel',
    scrollToElementId: 'class-editor-weights-table',
    scrollExtraHeight: -1000
  },
  {
    title: '',
    text: 'Before moving on, make sure the numbers add up.',
    selector: '#class-editor-weights-total',
    position: 'top',
    type: 'hover',
    isFixed: true,
    style: styles.toolTip,
    scrollToRef: 'controlPanel',
    scrollToElementId: 'class-editor-weights-total'
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

class WeightsTutorial extends React.Component {
  constructor (props) {
    super(props)
    this.state = {step: 0}
  }

  /* Only here becuase weights tutroail changes the array of weights dependent
   on step. If tutorial changes. Remove this code and isTutorial prop! */
  updateStep (step) {
    this.setState({step})
  }

  render () {
    return (
      <Tutorial
        {...this.props}
        control={<Weights useMin={this.state.step < 7} />}
        description='For Skoller to work, we need to grab the assignment weights for each class. Look at this example...'
        header='Weights'
        steps={steps}
        syllabus={<WeightSyllabus />}
        updateStep={this.updateStep.bind(this)}
      />
    )
  }
}

export default WeightsTutorial
