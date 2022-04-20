import React from 'react'
import { observer, inject } from 'mobx-react'

@inject('rootStore') @observer
class LifeTimeUserModal extends React.Component {
  render () {
    return (
      <div className="popup-wrap poup-sm">
        <div className="popup-closetext">
          <div className="popup-msg">
            <img src="/src/assets/images/sammi/Smile.png" className="opup-icon" alt=""></img>
            <h2 style={{ margin: '0px',
              fontSize: '35px',
              textAlign: 'left',
              lineHeight: '1.0',
              fontWeight: 500}}
            >You have a premium account with no recurring charges. This has been setup by a Skoller administrator!</h2>
          </div>
          <div style={{
            display: 'flex',
            margin: 0,
            width: '100%',
            justifyContent: 'space-around',
            alignItems: 'center'
          }}>
            <button type="button" className="btn margin-top"
              onClick={() => { this.props.closeModal() }}
              style={{
                background: '#55B9E4',
                color: 'white',
                width: '100%',
                cursor: 'pointer'
              }}
            ><strong>Close</strong></button>
          </div>
        </div>
      </div>
    )
  }
}

export default LifeTimeUserModal
