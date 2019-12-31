import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import DragAndDrop from '../../../components/DragAndDrop/DragAndDrop'
import actions from '../../../../actions'
import SkLoader from '../../../../assets/sk-icons/SkLoader';

@inject('rootStore') @observer
class DocumentsForm extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      resume: null,
      transcript: null,
      loading: false,
      error: null
    }
  }

  async onSubmit () {
    // upload resume
    this.setState({loading: true})
    console.log(this.state)
    if (this.state.transcript) {
      let transcript = this.state.transcript[0]
      console.log(transcript)
      await actions.jobs.uploadJobsDoc(this.props.rootStore.studentJobsStore.profile.id, transcript, false)
        .then((r) => {
          console.log(r)
        })
        .catch(e => {
          console.log(e)
          this.setState({loading: false})
        })
    }
    if (this.state.resume) {
      let resume = this.state.resume[0]
      console.log(resume)
      await actions.jobs.uploadJobsDoc(this.props.rootStore.studentJobsStore.profile.id, resume, true)
        .then((r) => {
          console.log(r)
        })
        .catch(e => {
          console.log(e)
          this.setState({loading: false})
        })
    }
    this.props.onSubmit()
  }

  processFile (f, isResume = true) {
    let file = f[0]
    let fileExtension
    if (file.name.lastIndexOf('.') > 0) {
      fileExtension = file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length)
    }
    if (fileExtension.toLowerCase() !== 'pdf') {
      this.setState({error: 'File must be in PDF format.'})
    } else {
      if (isResume) {
        this.setState({resume: f, error: null})
      } else {
        this.setState({transcript: f, error: null})
      }
    }
  }

  renderContent () {
    return (
      <div className='jobs-form-container' style={{maxWidth: '380px'}}>
        {!this.props.rootStore.studentJobsStore.profile.resume_url && !this.props.rootStore.studentJobsStore.profile.transcript_url
          ? <p>We don&apos;t have any of your documents yet. Upload them here!</p>
          : <p>Upload your documents here!</p>
        }
        <div className='jobs-form-row margin-bottom'>
          <p className='jobs-form-label'>Upload your résumé 📄👩🏻‍💼👨🏾‍💼</p>
          <div className='jobs-form-drag-and-drop'>
            <DragAndDrop
              handleDrop={(file) => { this.processFile(file) }}
              disabled={this.state.resume !== null}
              accept={'application/pdf'}
            >
              {this.state.resume
                ? <div className='jobs-form-drag-and-drop-file'>
                  <i
                    className='far fa-times-circle'
                    onClick={(e) => {
                      e.stopPropagation()
                      this.setState({resume: null})
                    }}
                  />
                  <p>{this.state.resume[0].name}</p>
                </div>
                : <p>Drag and drop a PDF of your résumé here</p>
              }
            </DragAndDrop>
          </div>
        </div>
        <div className='jobs-form-row'>
          <p className='jobs-form-label'>Upload your transcript</p>
          <div className='jobs-form-drag-and-drop'>
            <DragAndDrop
              handleDrop={(file) => { this.processFile(file, false) }}
              disabled={this.state.transcript !== null}
              accept={'application/pdf'}
            >
              {this.state.transcript
                ? <div className='jobs-form-drag-and-drop-file'>
                  <i
                    className='far fa-times-circle'
                    onClick={(e) => {
                      e.stopPropagation()
                      this.setState({transcript: null})
                    }}
                  />
                  <p>{this.state.transcript[0].name}</p>
                </div>
                : <p>Drag and drop a PDF of your transcript here</p>
              }
            </DragAndDrop>
          </div>
        </div>
        <div className='jobs-form-row'>
          <div className={'jobs-form-save'}>
            <p
              onClick={() =>
                this.onSubmit()
              }
            >
              Done
            </p>
          </div>
        </div>
        <error>{this.state.error}</error>
      </div>
    )
  }

  render () {
    return this.state.loading
      ? <SkLoader />
      : this.renderContent()
  }
}

DocumentsForm.propTypes = {
  rootStore: PropTypes.object,
  onSubmit: PropTypes.function
}

export default DocumentsForm
