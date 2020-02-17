import React from 'react'
import {inject, observer} from 'mobx-react'
import PropTypes from 'prop-types'
import Exit from '../../../../assets/sk-icons/navigation/Exit'
import SkLoader from '../../../../assets/sk-icons/SkLoader'
import actions from '../../../../actions'

@inject('rootStore') @observer
class AvatarModal extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      file: null,
      preview: null,
      loading: false,
      clearCurrentAvatar: false
    }
  }

  async onSubmit () {
    this.setState({loading: true})
    await actions.users.addAvatar(this.state.file, this.props.rootStore.userStore.user.id, this.props.rootStore.userStore.user.student.id)
      .then(() => {
        this.props.onSubmit()
      })
      .catch(e => console.log(e))
  }

  deleteAvatar () {
    this.setState({loading: true})
    actions.users.addAvatar('', this.props.rootStore.userStore.user.id, this.props.rootStore.userStore.user.student.id)
      .then(r => {
        this.props.rootStore.studentJobsStore.refreshJobsProfile()
        this.setState({loading: false})
      })
      .catch(e => console.log(e))
  }

  renderContent () {
    return (
      <div className='jobs-avatar-modal'>
        <h2 style={{textAlign: 'center', margin: '0'}}>
          Profile Picture
        </h2>
        <p>Did you know that companies are more likely to check out your profile if it&apos;s complimented with a profile picture?</p>
        {(this.state.preview || this.props.rootStore.userStore.user.avatar) && !this.state.clearCurrentAvatar
          ? <div className='jobs-avatar-modal-image-preview'>
            <div className='image-preview' style={{backgroundImage: this.state.preview ? `url(${this.state.preview})` : `url(${this.props.rootStore.userStore.user.avatar})`}}>
              <div onClick={() => {
                this.setState({file: null, preview: null, clearCurrentAvatar: this.props.rootStore.userStore.user.avatar ? true : false})
                this.deleteAvatar()
              }} className='clear-image'>
                <div className='exit'>
                  <Exit fill={'jobs'} height={'12px'} width={'12px'} />
                </div>
              </div>
            </div>
          </div>
          : <div onClick={() => this.fileUploader.click()}>
            <p className='add-photo'>Add a profile picture</p>
            <p className='jobs-avatar-modal-icon'><i className='far fa-user-circle' /></p>
            <input
              type="file"
              ref={fileUploader => { this.fileUploader = fileUploader }}
              style={{display: 'none'}}
              onChange={(e) => {
                this.setState({file: e.target.files[0], preview: URL.createObjectURL(e.target.files[0]), clearCurrentAvatar: false})
              }}
            />
          </div>
        }
        <p><small>Picture must be 10mb or less</small></p>
        <p
          onClick={() => this.props.onSubmit()}
          className='do-later'
        >Do this later</p>
        <div className={'jobs-avatar-modal-button ' + (this.state.file ? '' : 'disabled')}>
          <p onClick={() => this.onSubmit()}>Save photo</p>
        </div>
      </div>
    )
  }

  render () {
    return (
      this.state.loading
        ? <SkLoader />
        : this.renderContent()
    )
  }
}

AvatarModal.propTypes = {
  onSubmit: PropTypes.func,
  rootStore: PropTypes.object
}

export default AvatarModal
