import React from 'react'
import {inject, observer} from 'mobx-react'
import PropTypes from 'prop-types'
import Exit from '../../../../assets/sk-icons/navigation/Exit'
import SkLoader from '../../../../assets/sk-icons/SkLoader'
import actions from '../../../../actions'

@inject('rootStore') @observer
class WelcomeModal extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      file: null,
      preview: null,
      loading: false
    }
  }

  async onSubmit () {
    this.setState({loading: true})
    await actions.users.addAvatar(this.state.file, this.props.rootStore.userStore.user.id)
      .then(r => {
        this.props.onSubmit()
      })
      .catch(e => console.log(e))
  }

  renderContent () {
    return (
      <div className='jobs-welcome-modal'>
        <h2 style={{textAlign: 'center', margin: '0'}}>
          Welcome to Skoller Jobs!
        </h2>
        <p>Did you know that companies are more likely to check out your profile if it&apos;s complimented with a profile picture?</p>
        {this.state.preview
          ? <div className='jobs-welcome-modal-image-preview'>
            <div className='image-preview' style={{backgroundImage: `url(${this.state.preview})`}}>
              <div onClick={() => this.setState({file: null, preview: null})} className='clear-image'>
                <div className='exit'>
                  <Exit fill={'jobs'} height={'12px'} width={'12px'} />
                </div>
              </div>
            </div>
          </div>
          : <div onClick={() => this.fileUploader.click()}>
            <p className='add-photo'>Add a profile picture</p>
            <p className='jobs-welcome-modal-icon'><i className='far fa-user-circle' /></p>
            <input
              type="file"
              ref={fileUploader => { this.fileUploader = fileUploader }}
              style={{display: 'none'}}
              onChange={(e) => {
                this.setState({file: e.target.files[0], preview: URL.createObjectURL(e.target.files[0])})
              }}
            />
          </div>
        }
        <p><small>Picture must be 10mb or less</small></p>
        <p
          onClick={() => this.props.onSubmit()}
          className='do-later'
        >Do this later</p>
        <div className='jobs-welcome-modal-button'>
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

WelcomeModal.propTypes = {
  onSubmit: PropTypes.function,
  rootStore: PropTypes.object
}

export default WelcomeModal
