import React from 'react'
import HoverImage from '../../components/Image/HoverImage'

class WhoTalking extends React.Component {

  render () {
    const peopleList = [
      {
        id: 1,
        img: 'src/assets/images/landing_page/beacon_bw.png',
        hoverImg: 'src/assets/images/landing_page/beacon_color.png',
        url: 'http://www.utdailybeacon.com/news/app-helps-organize-classroom-chaos/article_c0af8158-1e53-11e8-8a80-5328805bcb91.html'
      },
      {
        id: 2,
        img: 'src/assets/images/landing_page/hustler_bw.png',
        hoverImg: 'src/assets/images/landing_page/hustler_color.png',
        url: 'http://vanderbilthustler.com/featured/new-app-aims-to-crowdsource-the-classroom.html'
      },
      {
        id: 3,
        img: 'src/assets/images/landing_page/belmont_bw.png',
        hoverImg: 'src/assets/images/landing_page/belmont_color.png',
        url: 'http://news.belmont.edu/alumni-create-app-to-crowdsource-the-classroom/'
      }
    ]

    return (
      <div className='section-people-talking'>
        <span className='people-talking-header'>IN THE PRESS</span>
        <div className="content">
          <ul className="list">
            {peopleList.map((u, idx) => {
              return <li key={u.id}><a href={u.url}><HoverImage className='people-talking-img' img={u.img} hoverImg={u.hoverImg}/></a></li>
            })}
          </ul>
        </div>
      </div>
    )
  }
}
export default WhoTalking
