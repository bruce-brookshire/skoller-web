import React from 'react'
import Card from '../../../components/Card'
import actions from '../../../actions'
import Loading from '../../../components/Loading'
import Modal from '../../../components/Modal'
import MinVerUpdateDashboard from './MinVerUpdateDashboard'

class MinVersionSettings extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      minAppVersionData: [],
      openVersionUpdateModal: false
    }
  }

  componentWillMount () {
    this.initializeComponent()
  }

  initializeComponent () {
    this.setState({loading: true})
    actions.settings.getMinVersionInfo().then((minAppVersionData) => {
      this.setState({minAppVersionData, loading: false})
    }).catch(() => this.setState({loading: false}))
  }

  findMinVerSetting (key) {
    return this.state.minAppVersionData.find(x => x.name === key).value
  }

  onMinVerUpdate () {
    this.setState({openVersionUpdateModal: false})
    this.initializeComponent()
  }

  renderMinVersionSettingsContent () {
    return (
      <div>
        <p>iOS Version: {this.findMinVerSetting('min_ios_version')}</p>
        <p>Android Version: {this.findMinVerSetting('min_android_version')}</p>
      </div>
    )
  }

  renderMinVersionSettingsTitle () {
    return (
      <div className='cn-icon-flex'>
        Minimum App Version
        <i className='fa fa-pencil cn-blue cursor margin-left' onClick={() => this.setState({openVersionUpdateModal: true})} />
      </div>
    )
  }

  /*
  * Render the version update modal.
  */
  renderVersionUpdateModal () {
    return (
      <Modal
        open={this.state.openVersionUpdateModal}
        onClose={() => this.setState({openVersionUpdateModal: false})}
      >
        <MinVerUpdateDashboard
          data={this.state.minAppVersionData}
          onSubmit={this.onMinVerUpdate.bind(this)}
        />
      </Modal>
    )
  }

  render () {
    const {loading} = this.state
    return (
      <div>
        <Card
          title={this.renderMinVersionSettingsTitle()}
          content={loading ? <Loading /> : this.renderMinVersionSettingsContent()}
        />
        {this.renderVersionUpdateModal()}
      </div>
    )
  }
}

export default MinVersionSettings
