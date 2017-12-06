import React from 'react'
import Slant from '../../components/Slant'

class Availability extends React.Component {
  render () {
    return (
        <div className='even-section blue-section-text'>
            <h2 className='center-text'>Now available at 10 schools and counting...</h2>
            <div className='row section-header'>
                <div className='col-xs-12 col-sm-3 paragraph-spacing center-text'>
                    <p>
                        Auburn University
                    </p>
                    <p>
                        University of Arkansas
                    </p>
                </div>
                <div className='col-xs-12 col-sm-3 paragraph-spacing center-text'>
                    <p>
                        {'Texas A&M'}
                    </p>
                    <p>
                        University of Georgia
                    </p>
                    <p>
                        University of South Carolina
                    </p>
                </div>
                <div className='col-xs-12 col-sm-3 paragraph-spacing center-text'>
                    <p>
                        Ole Miss
                    </p>
                    <p>
                        University of Kentucky
                    </p>
                    <p>
                        University of Tennessee
                    </p>
                </div>
                <div className='col-xs-12 col-sm-3 paragraph-spacing center-text'>
                    <p>
                        University of Alabama
                    </p>
                    <p>
                        University of Oklahoma
                    </p>
                </div>
            </div>
            <p className='center-text'>{'Don\'t see your school?'} <a className="link-on-blue" href="">Let us know you want Skoller</a></p>
        </div>
    )
  }
}
export default Availability