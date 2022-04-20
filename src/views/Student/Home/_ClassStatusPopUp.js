import React, { useEffect, useState } from 'react'
import PremiumClassModal from './PremiumClassModal'
import TrialClassModal from './TrialClassModal'

export default function ClassStatusPopUp (props) {
  const [classModal, setClassModal] = useState(true)

  useEffect(() => {
    let status = window.localStorage.getItem('classModal')
    if (status === 'false') {
      setClassModal(false)
    }
  }, [classModal])

  const handleClose = () => {
    window.localStorage.setItem('classModal', false)
    setClassModal(false)
  }

  if (!classModal) return null
  return props.subscribed
    ? <PremiumClassModal closeModal={handleClose} status={{state: false}} />
    : <TrialClassModal closeModal={handleClose} status={{state: false}}/>
}
