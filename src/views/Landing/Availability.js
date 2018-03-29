import React from 'react'

class Availability extends React.Component {
  render () {
    const universityList = [
      'Auburn University',
      'University of Arkansas',
      'Texas A&M',
      'Clemson University',
      'University of South Carolina',
      'Ole Miss',
      'University of Kentucky',
      'University of Tennessee',
      'University of Alabama',
      'University of Oklahoma',
      'Belmont University',
      'Samford University',
      'Vanderbilt University',
      'Tennessee Tech University',
      ''
    ]

    return (
      <div className='section-availability'>
        <div className="content">
          <h2 className='section-header'>
            Now available at 14 schools and counting&hellip;
          </h2>
          <ul className="list">
            {universityList.map((u, idx) => {
              return <li key={u}>{u}</li>
            })}
          </ul>
          <p>Don&apos;t see your school? <a href="mailto:support@skoller.co?Subject=Add My School">Let us know you want Skoller</a></p>
        </div>
      </div>
    )
  }
}
export default Availability
