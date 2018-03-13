import React from 'react'

class PeopleTalking extends React.Component {

  render () {
    const peopleList = [
      {
        img: 'src/assets/images/landing_page/beacon_bw.png',
        url: 'http://www.utdailybeacon.com/news/app-helps-organize-classroom-chaos/article_c0af8158-1e53-11e8-8a80-5328805bcb91.html'
      },
      {
        img: 'src/assets/images/landing_page/hustler_bw.png',
        url: 'http://vanderbilthustler.com/featured/new-app-aims-to-crowdsource-the-classroom.html'
      }
    ]
    return (
      <div className='section-people-talking'>
        <div className="content">
          <h2 className='section-header'>
            What People are Saying About Us
          </h2>
          <ul className="list">
            {peopleList.map((u, idx) => {
              return <li key={idx}><a href={u.url}><img className='people-talking-img' src={u.img} /></a></li>
            })}
          </ul>
        </div>
      </div>
    )
  }
}
export default PeopleTalking