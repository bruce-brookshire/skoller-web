import React from 'react'
import LandingNav from '../components/LandingNav'
import {inject, observer} from 'mobx-react'
import LandingFooter from '../components/LandingFooter'
import CallToAction from '../LearnMore/CallToAction'

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
                <img className='teammate-image' src='src/assets/images/our_team/carson.png'></img>
                <p className='teammate-name'>Carson Ward</p>
                <p className='teammate-title'>Founder & CEO</p>
                <p className='teammate-description'> Carson is the conductor. He oversees product innovation, business partnerships, and growth strategies.</p>
                <div className='teammate-links'>
                  <a href='http://google.com'><i className="fa fa-linkedin-square"></i></a> <a href='http://google.com'><i className="fa fa-envelope"></i></a>
                </div>
              </div>
            </div>
            <div className='teammate-cell'>
              <div className='teammate'>
                <img className='teammate-image' src='src/assets/images/our_team/logan.png'></img>
                <p className='teammate-name'>Logan Matthews</p>
                <p className='teammate-title'>Founder & COO</p>
                <p className='teammate-description'> Logan is the recruiter. He oversees external relations, business partnerships, and marketing.</p>
                <div className='teammate-links'>
                  <a href='http://google.com'><i className="fa fa-linkedin-square"></i></a> <a href='http://google.com'><i className="fa fa-envelope"></i></a>
                </div>
              </div>
            </div>
            <div className='teammate-cell'>
              <div className='teammate'>
                <img className='teammate-image' src='src/assets/images/our_team/jon.png'></img>
                <p className='teammate-name'>Jonathan Rankin</p>
                <p className='teammate-title'>Founder & Creative Director</p>
                <p className='teammate-description'> Jon is the designer. He oversees user experience. He also builds data scraping and machine learning robots.</p>
                <div className='teammate-links'>
                  <a href='http://google.com'><i className="fa fa-linkedin-square"></i></a> <a href='http://google.com'><i className="fa fa-envelope"></i></a>
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
                  <a href='http://google.com'><i className="fa fa-linkedin-square"></i></a> <a href='http://google.com'><i className="fa fa-envelope"></i></a>
                </div>
              </div>
            </div>
            <div className='teammate-cell'>
              <div className='teammate'>
                <img className='teammate-image' src='src/assets/images/our_team/tyler.png'></img>
                <p className='teammate-name'>Tyler Dewitt</p>
                <p className='teammate-title'>Lead Software Engineer</p>
                <p className='teammate-description'> Tyler built the foundation. He developed our custom API while maintaining our web platforms.</p>
                <div className='teammate-links'>
                  <a href='http://google.com'><i className="fa fa-linkedin-square"></i></a> <a href='http://google.com'><i className="fa fa-envelope"></i></a>
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
                  <a href='http://google.com'><i className="fa fa-linkedin-square"></i></a> <a href='http://google.com'><i className="fa fa-envelope"></i></a>
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
                <p className='teammate-title'>at 14 schools</p>
                <p className='teammate-description'> Our ambassadors are some of the most well-connected people at their schools.</p>
                <div className='teammate-links'>
                  <a href='http://google.com'><small>Check them out on our Instagram! </small><i className="fa fa-instagram"></i></a>
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
                  <a href='http://google.com'><i className="fa fa-linkedin-square"></i></a> <a href='http://google.com'><i className="fa fa-globe"></i></a>
                </div>
              </div>
            </div>
            <div className='teammate-cell'>
              <div className='teammate'>
                <img className='teammate-image-partner' src='src/assets/images/our_team/datateam.png'></img>
                <p className='teammate-name'>MV Outsourcing</p>
                <p className='teammate-title'>Inda-based data entry</p>
                <p className='teammate-description'> Our team trained 18 data entry resources from MV Outsourcing to input syllabus information.</p>
                <div className='teammate-links'>
                  <a href='http://google.com'><i className="fa fa-linkedin-square"></i></a> <a href='http://google.com'><i className="fa fa-globe"></i></a>
                </div>
              </div>
            </div>
          </div>
          <h2 className='center-text'>And only the best advisors.</h2>
          <div className='teammates'>
            <div className='teammate-cell'>
              <div className='teammate'>
                <img className='teammate-image' src='src/assets/images/our_team/bill.png'></img>
                <p className='teammate-name'>Bill Brennan</p>
                <p className='teammate-title'>Serial Entrepreneur</p>
                <p className='teammate-description'> Carson is the conductor. He oversees product innovation, business partnerships, and growth strategies.</p>
                <div className='teammate-links'>
                  <a href='http://google.com'><i className="fa fa-linkedin-square"></i></a>
                </div>
              </div>
            </div>
            <div className='teammate-cell'>
              <div className='teammate'>
                <img className='teammate-image' src='src/assets/images/our_team/chris.png'></img>
                <p className='teammate-name'>Chris Sloan</p>
                <p className='teammate-title'>Attorney and Entrepreneurial Expert</p>
                <p className='teammate-description'> Carson is the conductor. He oversees product innovation, business partnerships, and growth strategies.</p>
                <div className='teammate-links'>
                  <a href='http://google.com'><i className="fa fa-linkedin-square"></i></a>
                </div>
              </div>
            </div>
            <div className='teammate-cell'>
              <div className='teammate'>
                <img className='teammate-image' src='src/assets/images/our_team/future.png'></img>
                <p className='teammate-name'>Future</p>
                <p className='teammate-title'>Serial Entrepreneur</p>
                <p className='teammate-description'> Future is the conductor. He oversees product innovation, business partnerships, and growth strategies.</p>
                <div className='teammate-links'>
                  <a href='http://google.com'><i className="fa fa-linkedin-square"></i></a>
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