import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import SkModal from '../../components/SkModal/SkModal'
import DragAndDrop from '../../components/DragAndDrop/DragAndDrop'
import { optionalPlural } from '../utils'
import Exit from '../../../assets/sk-icons/navigation/Exit'
import actions from '../../../actions'

function UploadLogo (props) {
  const [showModal, setShowModal] = React.useState(false)
  const [file, setFile] = React.useState(null)
  const [preview, setPreview] = React.useState(null)

  const org = props.rootStore.insightsStore.org

  React.useEffect(() => {
    if (org.logo_url) {
      setPreview(org.logo_url)
    }
  }, [])

  const handleDrop = (files) => {
    setFile(files[0])
    setPreview(URL.createObjectURL(files[0]))
  }

  const renderPreview = () => {
    return (
      <div className='jobs-avatar-modal-image-preview'>
        <div className='image-preview' style={{backgroundImage: preview ? `url(${preview})` : `url(${null})`}}>
          <div onClick={() => {
            setFile(null)
            setPreview(null)
          }} className='clear-image'>
            <div className='exit'>
              <Exit fill={'jobs'} height={'12px'} width={'12px'} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  const submit = () => {
    actions.organizations.addOrgLogo(file, props.rootStore.insightsStore.org.id)
      .then(() => {
        props.onSubmit()
        setShowModal(false)
      })
  }

  return (
    <React.Fragment>
      <div
        onClick={() => setShowModal(true)}
        className={'si-upload-logo-box' + (org.logo_url ? ' has-image' : '')}
        style={{
          backgroundImage: org.logo_url ? `url(${org.logo_url})` : null,
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      >
        {!org.logo_url && <p>Upload a<br />logo</p>}
      </div>
      {showModal && <SkModal title={'Upload a logo'} closeModal={() => setShowModal(false)}>
        <div className='si-upload-logo'>
          {preview && renderPreview()}
          {!preview && <DragAndDrop handleDrop={handleDrop} >Click or drop logo here</DragAndDrop>}
          {preview && <div className='si-button'><p onClick={() => submit()}>Submit</p></div>}
        </div>
      </SkModal>}
    </React.Fragment>
  )
}

UploadLogo.propTypes = {
  rootStore: PropTypes.object,
  onSubmit: PropTypes.func
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
      <UploadLogo onSubmit={() => this.props.rootStore.insightsStore.updateData(['org'])} rootStore={this.props.rootStore} />
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
