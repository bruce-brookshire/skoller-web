import React from 'react'
import CopyBox from '../../components/CopyBox'
import PropTypes from 'prop-types'

function CopyCell ({isPhone, text}) {
  if (isPhone) {
    // text = text
  }
  return (
    <CopyBox className={'si-copy-cell'} smallText={true} linkValue={text} />
  )
}

CopyCell.propTypes = {
  isPhone: PropTypes.bool,
  text: PropTypes.string
}

export default CopyCell
