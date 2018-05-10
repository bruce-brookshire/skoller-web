import React from 'react'
import LandingNav from '../components/LandingNav'
import {inject, observer} from 'mobx-react'
import LandingFooter from '../components/LandingFooter'

@inject('rootStore') @observer
class OurTeam extends React.Component {
  render () {
    return (
      <div className='cn-our-team-container'>
        <LandingNav rootStore={this.props.rootStore} />
        <div className='cn-our-team-content'>
          <h2 className='center-text'>We have an amazing team.</h2>
          <div className='teammates'>
            <div className='teammate-cell'>
              <div className='teammate'>
                <img className='teammate-image' src='src/assets/images/our_team/carsonblack.png'></img>
                <p className='teammate-name'>Carson Ward</p>
                <p className='teammate-title'>Founder &amp; CEO</p>
                <p className='teammate-description'> Carson is the conductor. He oversees product innovation, business partnerships, and growth strategies.</p>
                <div className='teammate-links'>
                  <a href='https://www.linkedin.com/in/carsonward2/'><i className="fa fa-linkedin-square"></i></a> <a href='mailto:carson@skoller.co'><i className="fa fa-envelope"></i></a>
                </div>
              </div>
            </div>
            <div className='teammate-cell'>
              <div className='teammate'>
                <img className='teammate-image' src='src/assets/images/our_team/logan.png'></img>
                <p className='teammate-name'>Logan Matthews</p>
                <p className='teammate-title'>Founder &amp; COO</p>
                <p className='teammate-description'> Logan is the recruiter. He oversees external relations, business partnerships, and marketing.</p>
                <div className='teammate-links'>
                  <a href='https://www.linkedin.com/in/loganmatthews/'><i className="fa fa-linkedin-square"></i></a> <a href='mailto:logan@skoller.com'><i className="fa fa-envelope"></i></a>
                </div>
              </div>
            </div>
            <div className='teammate-cell'>
              <div className='teammate'>
                <img className='teammate-image' src='src/assets/images/our_team/jon.png'></img>
                <p className='teammate-name'>Jonathan Rankin</p>
                <p className='teammate-title'>Founder &amp; Creative Director</p>
                <p className='teammate-description'> Jon is the designer. He oversees user experience. He also builds data scraping and machine learning robots.</p>
                <div className='teammate-links'>
                  <a href='https://www.linkedin.com/in/jonathanrankin/'><i className="fa fa-linkedin-square"></i></a> <a href='mailto:jonathan@skoller.co'><i className="fa fa-envelope"></i></a>
                </div>
              </div>
            </div>
            <div className='teammate-cell'>
              <div className='teammate'>
                <img className='teammate-image' src='src/assets/images/our_team/bruce.png'></img>
                <p className='teammate-name'>Bruce Brookshire</p>
                <p className='teammate-title'>CTO</p>
                <p className='teammate-description'> Bruce built the app. He oversees development projects and is the lead engineer for mobile.</p>
                <div className='teammate-links'>
                  <a href='https://www.linkedin.com/in/brucebrookshire/'><i className="fa fa-linkedin-square"></i></a> <a href='mailto:bruce@skoller.co'><i className="fa fa-envelope"></i></a>
                </div>
              </div>
            </div>
            <div className='teammate-cell'>
              <div className='teammate'>
                <img className='teammate-image' src='src/assets/images/our_team/tyler.png'></img>
                <p className='teammate-name'>Tyler Witt</p>
                <p className='teammate-title'>Lead Software Engineer</p>
                <p className='teammate-description'> Tyler built the foundation. He developed our custom API while maintaining our web platforms.</p>
                <div className='teammate-links'>
                  <a href='https://www.linkedin.com/in/wittt/'><i className="fa fa-linkedin-square"></i></a> <a href='mailto:tyler@fortyau.com'><i className="fa fa-envelope"></i></a>
                </div>
              </div>
            </div>
            <div className='teammate-cell'>
              <div className='teammate'>
                <img className='teammate-image' src='src/assets/images/our_team/trevor.png'></img>
                <p className='teammate-name'>Trevor McConnell</p>
                <p className='teammate-title'>Director of Marketing</p>
                <p className='teammate-description'> Trevor is the marketing executor. She is responsible for managing ambassadors and social media.</p>
                <div className='teammate-links'>
                  <a href='https://www.linkedin.com/in/trevorleighmcconnell/'><i className="fa fa-linkedin-square"></i></a> <a href='mailto:trevor@skoller.co'><i className="fa fa-envelope"></i></a>
                </div>
              </div>
            </div>
          </div>
          <h2 className='center-text'>With some pretty incredible partners.</h2>
          <div className='teammates'>
            <div className='teammate-cell'>
              <div className='teammate'>
                <img className='teammate-image' src='src/assets/images/our_team/ambassadors.jpg'></img>
                <p className='teammate-name'>27 Campus Ambassadors</p>
                <p className='teammate-title'>at 9 schools</p>
                <p className='teammate-description'> Our ambassadors are some of the most well-connected people at their schools.</p>
                <div className='teammate-links'>
                  <a href='https://www.instagram.com/skolleratme/'><small>Check them out on our Instagram! </small><i className="fa fa-instagram"></i></a>
                </div>
              </div>
            </div>
            <div className='teammate-cell'>
              <div className='teammate'>
                <img className='teammate-image-partner' src='src/assets/images/our_team/fortyau.png'></img>
                <p className='teammate-name'>FortyAU</p>
                <p className='teammate-title'>Nashville-based engineers</p>
                <p className='teammate-description'> Since 2016, Skoller has teamed up with FortyAU for over 1,000 hours of work on special development projects.</p>
                <div className='teammate-links'>
                  <a href='https://www.linkedin.com/company/fortyau/'><i className="fa fa-linkedin-square"></i></a> <a href='http://fortyau.com'><i className="fa fa-globe"></i></a>
                </div>
              </div>
            </div>
            <div className='teammate-cell'>
              <div className='teammate'>
                <img className='teammate-image-partner' src='src/assets/images/our_team/taskgenie.png'></img>
                <p className='teammate-name'>Task Genie</p>
                <p className='teammate-title'>India-based data entry</p>
                <p className='teammate-description'> Our team trained 18 data entry resources from Task Genie to input syllabus information.</p>
                <div className='teammate-links'>
                  <a href='http://www.task-genie.com/'><i className="fa fa-globe"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='cn-our-team-content-advisor'>
          <h2 className='center-text'>And only the best advisors.</h2>
          <div className='teammates'>
            <div className='teammate-cell-advisor'>
              <div className='teammate'>
                <img className='teammate-image' src='src/assets/images/our_team/bill.png'></img>
                <p className='teammate-name'>Bill Brennan</p>
                <p className='teammate-title'>Serial Entrepreneur<br></br>Nashville, TN</p>
                <div className='teammate-links'>
                  <a href='https://www.linkedin.com/in/bill-brennan-1417431/'><i className="fa fa-linkedin-square"></i></a>
                </div>
              </div>
            </div>
            <div className='teammate-cell-advisor'>
              <div className='teammate'>
                <img className='teammate-image' src='src/assets/images/our_team/chris.png'></img>
                <p className='teammate-name'>Chris Sloan</p>
                <p className='teammate-title'>Attorney &amp; Emerging Tech Specialist<br></br>Nashville, TN</p>
                <div className='teammate-links'>
                  <a href='https://www.linkedin.com/in/chrissloanesq/'><i className="fa fa-linkedin-square"></i></a> <a href='https://www.bakerdonelson.com/chris-sloan'><i className="fa fa-globe"></i></a>
                </div>
              </div>
            </div>
            <div className='teammate-cell-advisor'>
              <div className='teammate'>
                <img className='teammate-image' src='src/assets/images/our_team/dorrian.png'></img>
                <p className='teammate-name'>Dorrian Porter</p>
                <p className='teammate-title'>CEO, Vestaboard<br></br>San Francisco Bay Area</p>
                <div className='teammate-links'>
                  <a href='https://www.linkedin.com/in/dorrianporter/'><i className="fa fa-linkedin-square"></i></a> <a href='https://www.vestaboard.com/'><i className="fa fa-globe"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <LandingFooter />
      </div>
    )
  }
}

export default OurTeam
