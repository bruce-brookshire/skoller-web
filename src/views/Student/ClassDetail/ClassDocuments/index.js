import React from 'react'
import PropTypes from 'prop-types'
import SkModal from '../../../components/SkModal/SkModal'
import UploadAdditionalDocuments from '../../../components/ClassStatusModal/UploadAdditionalDocuments'

function ClassDocuments (props) {
  const [show, setShow] = React.useState(false)

  const renderDocumentsModal = () => {
    return (
      show
        ? <SkModal
          title={props.cl.name}
          closeModal={() => setShow(false)}
        >
          <div style={{marginBottom: '1rem'}} />
          <UploadAdditionalDocuments
            cl={props.cl}
            onSubmit={() => setShow(false)}
          />
        </SkModal>
        : null
    )
  }

  return (
    <div>
      <i
        className='fas fa-file'
        title='View class documents'
        onClick={() => setShow(true)}
      />
      {renderDocumentsModal()}
    </div>
  )
}

ClassDocuments.propTypes = {
  cl: PropTypes.object
}

export default ClassDocuments
