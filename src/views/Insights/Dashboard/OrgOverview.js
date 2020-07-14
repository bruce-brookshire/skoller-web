import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import SkModal from '../../components/SkModal/SkModal'
import DragAndDrop from '../../components/DragAndDrop/DragAndDrop'
import { optionalPlural } from '../utils'

function UploadLogo (props) {
  const [showModal, setShowModal] = React.useState(false)
  return (
    <React.Fragment>
      <div onClick={() => setShowModal(true)} className='si-upload-logo-box'>
        <p>Upload a<br />logo</p>
      </div>
      {showModal && <SkModal title={'Upload a logo'} closeModal={() => setShowModal(false)}>
        <div className='si-upload-logo'>
          <DragAndDrop>Click or drop logo here</DragAndDrop>
          <div className='si-button'><p>Submit</p></div>
        </div>
      </SkModal>}
    </React.Fragment>
  )
}

UploadLogo.propTypes = {
  rootStore: PropTypes.object
}

@inject('rootStore') @observer
class OrgOverview extends React.Component {
  renderContent () {
    if (this.props.rootStore.insightsStore.userType === 'orgOwner') {
      return (
        <React.Fragment>
          <div className='si-oo-category'>
            <p>{this.props.rootStore.insightsStore.groups.length} Team{this.props.rootStore.insightsStore.groups.length === 1 ? '' : 's'}</p>
          </div>
          <div className='si-oo-category'>
            <p>{optionalPlural(this.props.rootStore.insightsStore.getStudentsAndInvitations(), '# Athlete@', 's')}</p>
          </div>
          <div className='si-oo-category'>
            <p>{optionalPlural(this.props.rootStore.insightsStore.groupOwners, '# Coach@', 'es')}</p>
          </div>
        </React.Fragment>
      )
    } else {
      let groups = this.props.rootStore.insightsStore.groups
      return <div style={{textAlign: 'center', margin: '1rem 0'}}>
        You are the owner of {groups.map(g => {
          let lastItem = groups.indexOf(g) === groups.length - 1
          return (
            <span key={g.id}>{lastItem && groups.length > 1 ? 'and ' : ''}{g.name}{lastItem ? '.' : groups.length > 1 ? ', ' : '.'}</span>
          )
        })}
      </div>
    }
  }

  renderAddLogo () {
    return (
      <UploadLogo rootStore={this.props.rootStore} />
    )
  }

  render () {
    return (
      <div className='si-org-overview'>
        <div className='si-oo-logo'>
          {this.props.rootStore.insightsStore.org.logo
            ? <div>logo</div>
            : this.renderAddLogo()
          }
        </div>
        <div className='si-oo-content'>
          <div className='si-oo-row'>
            <h1 style={{color: this.props.rootStore.insightsStore.org.color}}>{this.props.rootStore.insightsStore.org.name}</h1>
          </div>
          <div className='si-oo-row'>
            {this.renderContent()}
          </div>
        </div>
      </div>
    )
  }
}

OrgOverview.propTypes = {
  rootStore: PropTypes.object,
  history: PropTypes.object
}

export default OrgOverview
