import React from 'react'
import Card from '../../../components/Card'
import actions from '../../../actions'
import Modal from '../../../components/Modal'
import AutoUpdateDashboard from './AutoUpdateDashboard'
import Loading from '../../../components/Loading'

class AutoUpdateSettings extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      autoUpdateData: [],
      openAutoUpdateModal: false
    }
  }

  componentWillMount () {
    this.initializeComponent()
  }

  initializeComponent () {
    this.setState({loading: true})
    actions.settings.getAutoUpdateInfo().then((autoUpdateData) => {
      this.setState({autoUpdateData, loading: false})
    }).catch(() => false)
  }

  findAutoUpdateSetting (key) {
    return this.state.autoUpdateData.settings.find(x => x.name === key).value
  }

  onUpdateSettings () {
    this.setState({openAutoUpdateModal: false})
    this.initializeComponent()
  }

  /*
  * Render the auto update modal.
  */
  renderAutoUpdateModal () {
    return (
      <Modal
        open={this.state.openAutoUpdateModal}
        onClose={() => this.setState({openAutoUpdateModal: false})}
      >
        <AutoUpdateDashboard
          data={this.state.autoUpdateData}
          onSubmit={this.onUpdateSettings.bind(this)}
        />
      </Modal>
    )
  }

  renderAutoUpdateSettingsContent () {
    return (
      <div>
        <p>Enrollment is {this.findAutoUpdateSetting('auto_upd_enroll_thresh')} or more</p>
        <p>{Math.round(this.findAutoUpdateSetting('auto_upd_response_thresh') * 100)}% or more responded to the update</p>
        <p>{Math.round(this.findAutoUpdateSetting('auto_upd_approval_thresh') * 100)}% or more responses were copies</p>
        <a className="cn-blue" onClick={() => this.setState({openAutoUpdateModal: true})}>See details</a>
      </div>
    )
  }

  render () {
    const {loading} = this.state
    return (
      <div>
        <Card
          title='Auto Updates'
          content={loading ? <Loading /> : this.renderAutoUpdateSettingsContent()}
        />
        {this.renderAutoUpdateModal()}
      </div>
    )
  }
}

export default AutoUpdateSettings
