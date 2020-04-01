import React from 'react'
import {inject, observer} from 'mobx-react'
import PropTypes from 'prop-types'
import SkSelect from '../../components/SkSelect'
import actions from '../../../actions'

@inject('rootStore') @observer
class SpeculateTool extends React.Component {
  constructor (props) {
    super(props)

    let gradeScale = this.props.cl.grade_scale
    let choice = []

    if (gradeScale) choice = Object.keys(gradeScale).reduce((a, b) => gradeScale[a] > gradeScale[b] ? { grade: a, min: gradeScale[a] } : { grade: b, min: gradeScale[b] })

    this.state = {
      gradeScale,
      choice
    }
  }

  adoptGradeScale (gs) {
    let gradeScale = {}
    gs.forEach(g => {
      gradeScale[g.grade] = g.minimum
    })

    let form = {
      id: this.props.cl.id,
      grade_scale: gradeScale
    }
    console.log(form)
    actions.classes.updateClass(form)
      .then(r => {
        console.log(r)
        let gradeScale = r.grade_scale
        let choice = Object.keys(gradeScale).reduce((a, b) => gradeScale[a] > gradeScale[b] ? { grade: a, min: gradeScale[a] } : { grade: b, min: gradeScale[b] })
        this.setState({
          gradeScale,
          choice
        })
      })
      .catch(e => console.log(e))
  }

  renderSelect (gs) {
    return (
      <div className='speculate-gs-option-select' onClick={() => this.adoptGradeScale(gs)}><p>Adopt</p></div>
    )
  }

  renderNoGradeScale () {
    let gs1 = [
      {grade: 'A', minimum: 90},
      {grade: 'B', minimum: 80},
      {grade: 'C', minimum: 70},
      {grade: 'D', minimum: 60}
    ]
    let gs2 = [
      {grade: 'A+', minimum: 93},
      {grade: 'A', minimum: 90},
      {grade: 'B+', minimum: 87},
      {grade: 'B', minimum: 83},
      {grade: 'B-', minimum: 80},
      {grade: 'C+', minimum: 77},
      {grade: 'C', minimum: 73},
      {grade: 'C-', minimum: 70},
      {grade: 'D', minimum: 60}
    ]
    let gs3 = [
      {grade: 'A+', minimum: 93},
      {grade: 'A', minimum: 90},
      {grade: 'B+', minimum: 87},
      {grade: 'B', minimum: 83},
      {grade: 'B-', minimum: 80},
      {grade: 'C+', minimum: 77},
      {grade: 'C', minimum: 73},
      {grade: 'C-', minimum: 70},
      {grade: 'D+', minimum: 67},
      {grade: 'D', minimum: 63},
      {grade: 'D-', minimum: 60}
    ]
    return (
      <div className='speculate-no-gs'>
        <div className='insights-title'>
          Add a grade scale to this class so you can speculate your grade!
        </div>
        <p style={{textAlign: 'center'}}>Here are some common grade scales:</p>
        <div className='speculate-gs-select'>
          <div className='speculate-gs-option'>
            <table>
              {gs1.map(g => {
                return (
                  <tr key={gs1.indexOf(g)}>
                    <td>{g.grade}</td>
                    <td>{g.minimum}</td>
                  </tr>
                )
              })}
            </table>
            {this.renderSelect(gs1)}
          </div>
          <div className='speculate-gs-option'>
            <table>
              {gs2.map(g => {
                return (
                  <tr key={gs2.indexOf(g)}>
                    <td>{g.grade}</td>
                    <td>{g.minimum}</td>
                  </tr>
                )
              })}
            </table>
            {this.renderSelect(gs2)}
          </div>
          <div className='speculate-gs-option'>
            <table>
              {gs3.map(g => {
                return (
                  <tr key={gs3.indexOf(g)}>
                    <td>{g.grade}</td>
                    <td>{g.minimum}</td>
                  </tr>
                )
              })}
            </table>
            {this.renderSelect(gs3)}
          </div>
        </div>
      </div>
    )
  }

  renderGradeOptions () {
    let {gradeScale} = this.state
    return (
      Object.keys(gradeScale).reverse().map(g => {
        return (
          <div
            key={Object.keys(gradeScale).indexOf(g)}
            className='sk-select-option'
            onClick={() => this.setState({choice: {grade: g, min: gradeScale[g]}})}
          >
            {g}
          </div>
        )
      })
    )
  }

  renderAverage () {
    let min = this.state.choice.min
    let assignments = this.props.cl.assignments

    let completedAssignmentsScore = assignments.filter(a => a.grade !== null).map(a => a.weight * a.grade).reduce((a, b) => a + b, 0)
    let remainingWeight = assignments.filter(a => a.grade === null).map(a => a.weight).reduce((a, b) => a + b, 0)

    let x = (min - completedAssignmentsScore) / remainingWeight

    return Math.round(x * 100) / 100
  }

  renderSpeculateTool () {
    return (
      <div className='speculate'>
        <p>What grade do you want to make in this class?</p>
        <div className='speculate-select'>
          <SkSelect
            optionsMap={() => this.renderGradeOptions()}
            selection={this.state.choice.grade}
          />
        </div>
        <p>You need to average at least <b>{this.renderAverage()}%</b> on your remaining assignments this semester to achieve the grade <b>{this.state.choice.grade}.</b></p>
      </div>
    )
  }

  render () {
    return (
      !this.state.gradeScale
        ? this.renderNoGradeScale()
        : this.renderSpeculateTool()
    )
  }
}

SpeculateTool.propTypes = {
  cl: PropTypes.object,
  rootStore: PropTypes.object
}

export default SpeculateTool
