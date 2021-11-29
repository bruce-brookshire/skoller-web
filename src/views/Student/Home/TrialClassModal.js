import React, { useState } from 'react'
import AnimateHeight from 'react-animate-height'
import SkModal from '../../components/SkModal/SkModal'
import ReactResizeDetector from 'react-resize-detector'
import UploadOverloadDocuments from '../../components/ClassStatusModal/UploadOverloadDocuments'
import UploadAdditionalDocuments from '../../components/ClassStatusModal/UploadAdditionalDocuments'
import ClassStatusImage from '../../components/ClassStatusModal/ClassStatusImage'
import DropClassButton from '../../components/DropClassButton'
import SiDropClass from '../../Insights/StudentDetail/SiStudentClassDetail/SiDropClass'
import { mobileCheck } from '../../../utilities/display'
import UpgradeToPremiumBtn from './UpgradeToPremium'
import { toJS } from 'mobx'

function ProgressOption (props) {
  const renderIconClassName = () => {
    switch (props.status) {
      case 'complete':
        return 'fas fa-check'
      case 'active':
        return 'circle'
      case 'incomplete':
        return 'empty'
    }
  }

  return (
    <div className={'sk-progress-modal-po ' + props.status}>
      <div className='sk-progress-modal-po-icon'><i className={renderIconClassName()} /></div>
      <p>{props.name}</p>
    </div>
  )
}

export default function TrialClassModal (props) {
  const [uploadAdditionalDocumentsView, setUploadAdditionalDocumentsView] = useState(false)
  const [contentHeight, setContentHeight] = useState('auto')
  const options = ['Class', 'Syllabus', 'Review', 'Live']
  const activeOptionIndex = 2
  const handleResize = (w, h) => {
    setContentHeight(h)
  }
  const renderNextButton = () => {
    const buttonText = 'Use the DIY tool'
    return (
      <div>
        <p style={{margin: '0', textAlign: 'center'}}>Don&apos;t want to wait?</p>
        <div
          className={'onboard-next'}
          onClick={() => {}}
        >
          <p>
              Use the DIY tool
          </p>
        </div>
      </div>
    )
  }
  const renderControl = () => {
    if (uploadAdditionalDocumentsView) {
      return null
    } else {
      return (
        <div>
          {renderNextButton()}
        </div>
      )
    }
  }

  const renderSubControl = () => {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: !props.closeModal ? 'flex-end' : 'space-between',
        margin: '0.5rem 0 -0.5rem 0'
      }}>
        <p
          style={{margin: '6px 0 0 0', textAlign: 'center', cursor: 'pointer'}}
          onClick={() => {
            props.onSubmit()
          }}
        >
          <span style={{color: '#57B9E4'}}>Continue to Skoller</span>
        </p>

        {props.closeModal && !props.isInsights &&
          <div style={{textAlign: 'right'}}>
            <DropClassButton onDropClass={() => props.closeModal()} cl={{}} />
          </div>
        }

      </div>
    )
  }
  return (
    <div className='sk-progress-modal'>
      <SkModal
        className='sk-pm'
        closeModal={props.closeModal}
        style={{maxWidth: '700px'}}
      >
        <div className='sk-pm-nav' style={props.closeModal ? {} : {transform: 'translate(-16px, -42px)', paddingLeft: '16px'}}>
          <h3>{props.cl.name} {props.cl.code}</h3>
          {/* Progress status */}
          <div className='sk-pm-status'>
            {options.map((o, index) => {
              let status = 'incomplete'
              if (index < activeOptionIndex) {
                status = 'complete'
              } else if (index === activeOptionIndex) {
                status = 'active'
              }

              if (props.status.state === false) status = 'incomplete'
              if (props.status.state === true) status = 'complete'

              return <ProgressOption key={index} status={status} name={o} />
            })}
          </div>
        </div>
        <AnimateHeight
          duration={ 200 }
          height={contentHeight}
        >
          <ReactResizeDetector handleWidth handleHeight onResize={(w, h) => handleResize(w, h)}>
            <div className='sk-pm-content-container'>
              {/* Modal content */}
              <div className='sk-class-status-modal'>
                {/* Status Content */}
                <div>
                  <div className='sk-class-status-modal-container'>
                    <div className='sk-class-status-modal-row'>
                      {!uploadAdditionalDocumentsView && <div className='sk-class-status-modal-checklist-container'>
                        <ClassStatusImage status={1300} />
                        {/* {this.renderDownloadCompleteDownload()} */}
                      </div>}
                      <div className='sk-class-status-modal-action-container'>
                        <h1 style={{textAlign: 'center', marginBottom: '1rem'}}><span><b>We are swamped...</b></span></h1>
                        { uploadAdditionalDocumentsView
                          ? <div style={{marginBottom: '-2rem'}}>
                            <div className='link-style' style={{marginBottom: '8px'}} onClick={() => setUploadAdditionalDocumentsView(true)}>👈 Go back</div>
                            <UploadAdditionalDocuments
                              cl={{}}
                              onUpload={() => null}
                              onSubmit={() => props.closeModal()}
                            />
                          </div>
                          : <div className='sk-class-status-modal-action-detail'>
                            <h2>Move your syllabus to the front of the line by upgrading to premium!</h2>
                            <UpgradeToPremiumBtn onClick={props.onUpgradeToPremium}>Upgrade to Premium</UpgradeToPremiumBtn>
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                  {/* render next */}
                  {renderControl()}
                  {renderSubControl()}
                </div>
              </div>
            </div>
          </ReactResizeDetector>
        </AnimateHeight>
      </SkModal>
    </div>
  )
}
