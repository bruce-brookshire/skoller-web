import React from 'react'
import Card from '../../../components/Card'
import actions from '../../../actions'
import FourDoor from '../../components/FourDoor'
import Loading from '../../../components/Loading'

class FourDoorStatus extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      fourDoor: {}
    }
  }

  componentWillMount () {
    this.setState({loading: true})
    actions.fourdoor.getFourDoor().then((fourDoor) => {
      this.setState({fourDoor, loading: false})
    }).catch(() => this.setState({loading: false}))
  }

  onFourDoorChange (form) {
    actions.fourdoor.updateFourDoor(form).then((fourDoor) => {
      this.setState({fourDoor})
    }).catch(() => false)
  }

  renderFourDoorContent () {
    const {fourDoor} = this.state
    return (
      <FourDoor
        currentValues={fourDoor}
        onChange={this.onFourDoorChange.bind(this)}
      />
    )
  }

  render () {
    const {loading} = this.state
    return (
      <Card
        title='Four Door Status'
        content={loading ? <Loading /> : this.renderFourDoorContent()}
      />
    )
  }
}

export default FourDoorStatus
