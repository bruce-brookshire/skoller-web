import React from 'react'


class Process extends React.Component {
    render () {
      return (
        <div className=''>
            <div className='row'>
                <h3>Here's how it works</h3>
            </div>
            <div className='row'>
                <div>
                    <img src='src/assets/images/landing_page/step_one.png'/>
                    <h6>
                        1. Create and account
                    </h6>
                    <p>
                        Create an account using your school email and select your classes.
                    </p>

                </div>
                <div>
                    <img src='src/assets/images/landing_page/step_two.png'/>
                    <h6>
                        2. Upload your syllabi
                    </h6>
                    <p>
                        Drop a syllabus for each of your classes on our website.
                    </p>
                </div>
                <div>
                    <img src='src/assets/images/landing_page/step_three.png'/>
                    <h6>
                        3. Relax
                    </h6>
                    <p>
                        Forgetthe stress while the important information on your syllabus is extracted seamlessly.
                    </p>
                </div>         
            </div>
            <div className='row'>
                <p>
                    When the syllabus process is finished, just open the app and find everything already in place.
                </p>
            </div>
            
        </div>
      )
    }
}

export default Process