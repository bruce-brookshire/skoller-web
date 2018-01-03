import React from 'react'
import PropTypes from 'prop-types'
import Weight from '../components/ClassEditor/Weights'

const weightsMin = [
  {
    id: '',
    name: 'Star Reviews',
    weight: 10
  },
  {
    id: '',
    name: 'Exams',
    weight: 20
  },
  {
    id: '',
    name: 'Mid Term',
    weight: 20
  }
]

const weightsFull = [
  {
    id: '',
    name: 'Star Reviews',
    weight: 10
  },
  {
    id: '',
    name: 'Exams',
    weight: 20
  },
  {
    id: '',
    name: 'Mid Term',
    weight: 20
  },
  {
    id: '',
    name: 'Final',
    weight: 50
  }
]

class Weights extends React.Component {
  render () {
    /* Only here becuase weights tutroail changes the array of weights dependent
     on step. If tutorial changes. Remove this code and isTutorial prop! */
    const weights = this.props.useMin ? weightsMin : weightsFull
    return (
      <Weight weights={weights} cl={{is_points: false}} disabled={true} isTutorial={true}/>
    )
  }
}

Weights.propTypes = {
  useMin: PropTypes.bool
}

export default Weights
