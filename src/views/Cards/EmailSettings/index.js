import React from 'react'
import Card from '../../../components/Card'
import actions from '../../../actions'
import Loading from '../../../components/Loading'
import EmailType from './EmailType'

class EmailSettings extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      emailTypes: []
    }
  }

  componentWillMount () {
    this.getEmailSwitches()
  }

  getEmailSwitches () {
    this.setState({loading: true})
    actions.emailTypes.getEmailTypes().then((emailTypes) => {
      this.setState({loading: false, emailTypes})
    }).catch(() => this.setState({loading: false}))
  }

  renderEmailSwitchItems () {
    const {emailTypes} = this.state

    return emailTypes.map(type => {
      return (
        <div key={type.id} className='margin-bottom'>
          <EmailType
            emailType={type}
            onUpdate={this.getEmailSwitches.bind(this)}
          />
        </div>
      )
    })
  }

  render () {
    const {loading} = this.state
    return (
      <Card
        title='Auto-Messaging'
        content={loading ? <Loading /> : <div>{this.renderEmailSwitchItems()}</div>}
      />
    )
  }
}

export default EmailSettings
