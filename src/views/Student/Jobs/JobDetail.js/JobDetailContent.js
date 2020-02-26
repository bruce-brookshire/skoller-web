import React from 'react'
import PropTypes from 'prop-types'
import NumberFormat from 'react-number-format'

class JobDetailContent extends React.Component {
  getJobById () {
    // INSERT API STUFF HERE
    return {
      // JobG8 Identifier
      'job_gate_sender_reference': 1, // #JobG8 ID
      // Job details
      'job_source': 'Google', // # Company offering job
      'position': 'Data Analyst', // # What are you getting hired to do
      'salary_minimum': 80000, // # Min salary
      'salary_maximum': 100000, // # Max salary
      'salary_currency': 'USD', // # What do they get paid in
      'salary_period': 'year', // # What time period is the salary based over? salary / (salary_period, i.e. "year") <- here
      'salary_additional': 'none', // # Bonuses, etc
      'region': 'Texas', // # State
      'locality': 'Austin', // # City
      'country': 'USA', // # USA (i think always)
      'work_hours': 'Full time', // # Full time, part time, etc
      'employment_type': 'Permanent', // # Contract, Temp, permanent, etc.
      'start_date': 'August 1, 2020', // # No clue what format this will be
      'description_html': `<Description><![CDATA[<br/><b>Ameristar Meats</b><br><br><b>Meat Grinder</b><br/><br/>US-WA-Spokane-AMM<br/><br/><b>Job ID:</b> 2<br/><b>Type:</b> F T REG<br/><b># of Openings:</b> 2<br/><b>Category:</b> Production<br/>Ameristar Meats<br/><br/><b>Overview</b><br/><br/><p> Ameristar Meats is seeking a new team member to join our Z-Grind Team as an Meat Grinder. Ameristar Meats treats our customers as the boss and our Associates as our most important resource. Our growth provides Associates opportunities to drive their career. </p><p> </p><p> Who we are: </p><p> Ameristar Meats is a leading provider of fine meat products. We offer customers innovative programs for emerging dining trends. Ameristar Meats produces quality brands like Cattle Company Angus, Mist Isle Farms, Blue Mesa Natural Angus & Blackstone 1890. </p><p> This is a full time job and with that we offer a full benefits package, medical, dental, vision, 401k with a company match, Term Life Insurance and employee EAP program. <strong>Benefits are 100% paid by the company </strong> </p><p> <strong> Great working hours!!.... Monday - Friday with every weekend off! </strong> </p><p> </p><br/><br/><b>Responsibilities</b><br/><br/><ul><li> Grinding 60 pound blocks of meat </li><li> Pulling and grinding trim </li><li> Operate both manual and motorized jacks </li><li> Fat test analysis and signing product out </li><li> Supporting other areas and job tasks as needed; always staying busy, check with floor supervisors on available task </li></ul><br/><br/><b>Qualifications</b><br/><br/><p> </p><ul><li> Lifting product/boxes of 10-65lbs each </li><li> Able to stand for long periods of time per day </li><li> Ability to set up and break down machinery </li><li> Observe all company policies and standards </li><li> Good Communication Skills </li><li> Keep work area clean </li><li> Works in a manner that ensures your own safety and the safety of others </li><li> Maintain productivity at all times </li><li> Good math skills </li><li> Ability to pass drug test </li></ul><p> <em>EOE Race/Color/Religion/Sex/Sexual Orientation/Gender Identity/National Origin/Protected Veteran/Disability Status</em> </p> <img src="https://www.jobg8.com/TESTTRACKING.aspx?pv3lUb6ebfTRyzsIxhDhHgg" width="0" height="0" />]]></Description>`, // # HTML description of the job
      'classifications': ['Real Estate', 'Accounting', 'Data Analysis'], // # An array of job classification names related to the job. i.e. ["Real Estate", "Accounting"]
      // # Resources
      'job_source_url': 'google.co', // # URL of company offering job
      'application_url': 'google.com/user/thing', // # Application URL. This will be created such that it autofills the users information
      'description_url': 'jobg8.com/jobiejobie', // # JobG8 posting page
      'logo_url': 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png', // # Logo for the ADVERTISER (not necessarily the company hiring)
      'advertiser_name': 'Google Ads', // # Name of the advertiser
      'advertiser_type': 'Evil Corporation', // # Type of the advertiser
      // # Private details
      'job_type': 'TRAFFIC', // # What kind of action for this job gets us paid? (APPLICATION, ATS, or TRAFFIC)
      'sell_price': '', // # How much do we get paid for this link? (this will likely not be on route)
      'revenue_type': 'CPC' // # How we get paid (Per application ("CPA") or per click ("CPC"))
    }
  }
  render () {
    let job = this.getJobById(this.props.jobId)
    return (
      <div className='job-detail'>
        <div className='job-detail-header'>
          <h1>{job.position}</h1>
          <h2>{job.job_source}</h2>
        </div>
        <p>{job.locality}, {job.region}</p>
        <p>
          {job.work_hours}
        </p>
        <p>
          <NumberFormat value={job.salary_minimum} displayType={'text'} thousandSeparator={true} prefix={'$'} /> - <NumberFormat value={job.salary_maximum} displayType={'text'} thousandSeparator={true} prefix={'$'} />
        </p>
        <p>Salary type: {job.salary_period}</p>
        <div className='job-detail-description' dangerouslySetInnerHTML={{__html: job.description_html}}></div>
        <div className='job-detail-apply'><p>APPLY NOW</p></div>
      </div>
    )
  }
}

JobDetailContent.propTypes = {
  jobId: PropTypes.number
}

export default JobDetailContent
