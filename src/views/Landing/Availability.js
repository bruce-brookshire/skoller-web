import React from 'react'

class Availability extends React.Component {

  render () {
    const universityList = [
      'Auburn University',
      'University of Arkansas',
      'Texas A&M',
      'University of Georgia',
      'University of South Carolina',
      'Ole Miss',
      'University of Kentucky',
      'University of Tennessee',
      'University of Alabama',
      'University of Oklahoma'
    ]

    return (
      <div className='section-availability'>
        <h2 className='section-header'>
          Now available at 10 schools and counting&hellip;
        </h2>
        <div className='row'>
          <ul className="list">
            {universityList.map((u, idx) => {
              return <li key={idx}>{u}</li>
            })}
          </ul>
        </div>
        <p>Don't see your school? <a href="mailto:support@skoller.co?Subject=Add My School">Let us know you want Skoller</a></p>
      </div>
    )
  }
}
export default Availability
