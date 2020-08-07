import React from 'react'
import PropTypes from 'prop-types'
import SkModal from '../../components/SkModal/SkModal'
import DragAndDrop from '../../components/DragAndDrop/DragAndDrop'
import actions from '../../../actions'
import Exit from '../../../assets/sk-icons/navigation/Exit'

const Avatar = (props) => {
  const [getAvi, setGetAvi] = React.useState(false)
  const [showModal, setShowModal] = React.useState(false)
  const [file, setFile] = React.useState(null)
  const [preview, setPreview] = React.useState(null)
  const [usePreview, setUsePreview] = React.useState(null)

  // one day javascript will include null propagation and we won't have to
  // use stupid conditionals like this or risk the whole app breaking
  React.useEffect(() => {
    if (props.user) {
      if (props.user.student) {
        if (props.user.student.user) {
          if (props.user.student.user.pic_path) setGetAvi(true)
        }
      }
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
    actions.users.addAvatar(file, props.user.student.user.id, props.user.student.id)
      .then(() => {
        props.onSubmit && props.onSubmit()
        setShowModal(false)
        setUsePreview(true)
      })
  }

  return (
    <div style={(props.large && !props.user.isInvitation) ? {cursor: 'pointer'} : null} className='si-avatar' onClick={() => (props.large && !props.user.isInvitation) ? setShowModal(true) : null}>
      {getAvi
        ? <div className={'avatar ' + (props.large ? 'large' : '')} style={{backgroundImage: usePreview ? `url("${preview}")` : `url("${props.user.student.user.pic_path}")`}} />
        : <div className={'avatar ' + (props.large ? 'large' : '')}><span>{props.invitation ? props.invitation.name_first[0] + props.invitation.name_last[0] : null}{props.user ? props.user.student.name_first[0] + props.user.student.name_last[0] : null}</span></div>
      }
      {showModal && <SkModal title={'Upload an avatar'} closeModal={() => setShowModal(false)}>
        <div className='si-upload-logo'>
          {preview && renderPreview()}
          {!preview && <DragAndDrop handleDrop={handleDrop} >Click or drop image here</DragAndDrop>}
          {preview && <div className='si-button'><p onClick={() => submit()}>Submit</p></div>}
        </div>
      </SkModal>}
    </div>
  )
}

Avatar.propTypes = {
  user: PropTypes.object,
  large: PropTypes.bool,
  invitation: PropTypes.object,
  onSubmit: PropTypes.func,
  loading: PropTypes.bool
}

export default Avatar
