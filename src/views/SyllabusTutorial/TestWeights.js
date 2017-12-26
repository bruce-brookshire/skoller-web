import React from 'react'
import Weight from '../components/ClassEditor/Weights'

const weights = [
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

class Weights extends React.Component {
  render () {
    return (
      <Weight weights={weights} cl={{is_points: false}} disabled={true} />
    )
  }
}

export default Weights
