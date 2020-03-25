import React from 'react'
import {inject, observer} from 'mobx-react'
import PropTypes from 'prop-types'
import SkSelect from '../../components/SkSelect'

@inject('rootStore') @observer
class SpeculateTool extends React.Component {
  constructor (props) {
    super(props)

    let gradeScale = this.props.cl.grade_scale
    let choice = Object.keys(gradeScale).reduce((a, b) => gradeScale[a] > gradeScale[b] ? { grade: a, min: gradeScale[a] } : { grade: b, min: gradeScale[b] })

    this.state = {
      gradeScale: gradeScale,
      choice
    }
  }

  renderSelect (gs) {
    return (
      <div className='speculate-gs-option-select'><p>Adopt</p></div>
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
                  <tr key={gs1.indexOf(g)}>
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
                  <tr key={gs1.indexOf(g)}>
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
            className='sk-select-selection'
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

    let completedAssignmentsScore = assignments.filter(a => a.grade !== null).map(a => a.weight * a.grade).reduce((a, b) => a + b)
    let remainingWeight = assignments.filter(a => a.grade === null).map(a => a.weight).reduce((a, b) => a + b)

    let x = (min - completedAssignmentsScore) / remainingWeight

    return Math.round(x * 100) / 100
  }

  renderSpeculateTool () {
    return (
      <div>
        <p>What grade do you want to make?</p>
        <SkSelect
          optionsMap={() => this.renderGradeOptions()}
          selection={this.state.choice.grade}
        />
        <p>You need to average at least <b>{this.renderAverage()}%</b> on your remaining assignments this semester to achieve the grade <b>{this.state.choice.grade}</b></p>
      </div>
    )
  }

  render () {
    console.log(this.props.cl)
    return (
      this.props.cl.grade_scale === null
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
