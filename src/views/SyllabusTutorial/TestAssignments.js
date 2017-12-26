import React from 'react'
import Assignment from '../components/ClassEditor/Assignments'
const weights = [
  {
    id: 1,
    name: 'Exams'
  },
  {
    id: 2,
    name: 'Homework'
  },
  {
    id: 3,
    name: 'Projects'
  }
]

const assignments = [
  {
    id: 1,
    name: 'Exam 1',
    weight_id: weights[0].id,
    due: '2018-01-20'
  },
  {
    id: 2,
    name: 'Homework 1',
    weight_id: weights[1].id,
    due: '2018-01-10'
  },
  {
    id: 3,
    name: 'Project 1',
    weight_id: weights[2].id,
    due: '2018-01-15'
  }
]

class Assignments extends React.Component {
  render () {
    return (
      <Assignment
        assignments={assignments}
        cl= {{}}
        disabled={true}
        weights={weights}
      />
    )
  }
}

export default Assignments
