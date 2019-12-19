import React from 'react'
import Card from '../../../components/Card'
import actions from '../../../actions'
import SkLoader from '../../../assets/sk-icons/SkLoader'
import PropTypes from 'prop-types'

class SyllabusOverload extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      loading: true,
      status: null
    }

    this.getSettings()
  }

  getSettings () {
    actions.settings.getAdminSettings()
      .then(r => {
        this.setState({loading: false, status: r.value})
      })
      .catch(r => {
        console.log(r)
      })
  }

  changeStatus (bool) {
    this.setState({loading: true})
    actions.settings.setSyllabusOverloadSettings(bool)
      .then(r => {
        this.setState({status: r.value === 'true', loading: false})
      })
  }

  renderContent () {
    return (
      <div>
        <form style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <label>On</label>
            <input type='radio' value='on' checked={this.state.status} onChange={() => this.changeStatus(true)} />
          </div>
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <label>Off</label>
            <input type='radio' value='off' checked={!this.state.status} onChange={() => this.changeStatus(false)} />
          </div>
        </form>
      </div>
    )
  }

  render () {
    const {loading} = this.state
    return (
      <Card
        title='Syllabus Overload'
        content={loading ? <p>loading...</p> : this.renderContent()}
      />
    )
  }
}

SyllabusOverload.propTypes = {
  rootStore: PropTypes.bool
}

export default SyllabusOverload
