import React from 'react'
import PropTypes from 'prop-types'
import SkModal from '../../../components/SkModal/SkModal'
import moment from 'moment'

function ClassInfo (props) {
  const [show, setShow] = React.useState()
  const cl = props.cl

  const renderClassInfoModal = () => {
    return (
      show
        ? <SkModal title={'Class details'} closeModal={() => setShow(false)}>
          <div
            className='sk-class-detail-info'
          >
            <div className='sk-find-class-selected-class-title'>
              <h3>{cl.name}</h3>
            </div>
            <div className='sk-find-class-selected-class-row'>
              <p>{cl.professor ? ((cl.professor.name_first ? cl.professor.name_first : '') + ' ' + (cl.professor.name_last ? cl.professor.name_last : '')) : '--'}</p>
              <p>
                <i className="fas fa-user fa-xs" style={{marginRight: '2px'}} />{cl.enrollment.toString()}
              </p>
            </div>
            <div className='sk-find-class-selected-class-row'>
              <p>{cl.meet_days} {cl.meet_days === 'Online' ? '' : moment(cl.meet_start_time, 'HH:mm:ss').format('hh:mmA')}</p>
              <p>{cl.subject} {cl.code}.{cl.section}</p>
            </div>
          </div>
        </SkModal>
        : null
    )
  }
  return (
    <div>
      <i
        className='fas fa-info-circle'
        title='Class details'
        onClick={() => setShow(true)}
      />
      {renderClassInfoModal()}
    </div>
  )
}

ClassInfo.propTypes = {
  cl: PropTypes.object
}

export default ClassInfo
