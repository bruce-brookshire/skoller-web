import React from 'react'
import {observer} from 'mobx-react'
import {Link} from 'react-router'

class NavBar extends React.Component {
  render () {
    return (
      <div className='cn-navbar'>
        <div className='left'>
          <img className='logo' src='src/assets/images/blue-logo-full.png'></img>
        </div>
        <div className='user-info right'>
          <div className='left'>
            <p>Jonathan Rankin</p>
            <span>Belmont University</span>
          </div>
          <div className='right'>
            <img className='profile-img' src='https://www.biography.com/.image/c_fill%2Ccs_srgb%2Cg_face%2Ch_300%2Cq_80%2Cw_300/MTE5NDg0MDU0NTIzODQwMDE1/steven-jobs-9354805-2-402.jpg'/>
          </div>
        </div>
      </div>
    )
  }
}

export default NavBar
