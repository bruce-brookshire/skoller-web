import React from 'react'

class Footer extends React.Component {
  render () {
    return (
        <div className='row footer'>
            <div className='col-xs-6 muted-text'>
                Copyright © Skoller, LLC 2017. All Rights reserved
            </div>
            <div className='col-xs-6 right-text'>
                Need Help? <a className='non-styled-link' href="mailto:support@skoller.co">Contact Us.</a>
            </div>
        </div>

    )
  }
}

export default Footer