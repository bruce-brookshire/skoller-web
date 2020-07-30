import React from 'react'
import PropTypes from 'prop-types'
import SkModal from '../../../components/SkModal/SkModal'
import CopyBox from '../../../components/CopyBox'

function ShareClass (props) {
  const [showShareModal, setShowShareModal] = React.useState(false)

  const renderClassShareCell = () => {
    let cl = props.cl
    return (
      showShareModal &&
        <SkModal title={`Share ${cl.name}⚡️️`} closeModal={() => setShowShareModal(false)}>
          <p>Copy this link for {cl.name} and share it with your classmates.</p>
          <CopyBox linkValue={cl.enrollment_link} />
        </SkModal>
    )
  }

  return (
    <div>
      <i
        className='fas fa-users'
        title='Share class'
        onClick={() => setShowShareModal(true)}
      />
      {renderClassShareCell()}
    </div>
  )
}

ShareClass.propTypes = {
  cl: PropTypes.object
}

export default ShareClass
