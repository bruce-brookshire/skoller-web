import React from 'react'

const style = {
  textAlign: 'center',
  margin: '1rem 0',
  color: 'rgba(0,0,0,0.3)'
}

const JobsDisclaimer = () => (
  <div className='jobs-disclaimer'>
    <div style={style} className='jobs-disclaimer-desc'>
      Sponsored <small>do we really need a disclaimer</small>
    </div>
  </div>
)

export default JobsDisclaimer
