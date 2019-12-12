import React from 'react'
import PropTypes from 'prop-types'

class CompanyValues extends React.Component {
  render () {
    return (
      <svg
        width={this.props.width}
        height={this.props.height}
        viewBox="0 0 18 16"
        version="1.1"
      >
        <title>Company Values</title>
        <g id="Jobs" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="Jobs-Profile-Complete" transform="translate(-487.000000, -445.000000)" fill="#4A4A4A">
            <g id="Group-3" transform="translate(487.000000, 445.000000)">
              <path d="M18,4.04740041 L18,5.43319325 C17.6193551,6.85866646 16.7179765,7.92995253 15.7123015,8.95342082 C13.6175474,11.0853388 11.5543403,13.248632 9.48672167,15.4071434 C9.3321497,15.5685494 9.24524978,15.7956419 9.12230805,16 C8.87858875,15.7731592 8.80009582,15.7066337 8.72892778,15.6329776 C6.33360322,13.1514864 3.93669714,10.671757 1.54778186,8.18422568 C1.28858039,7.91434884 1.05867851,7.61133511 0.845174412,7.30261681 C-0.685396116,5.08848578 -0.0766805255,2.11078029 2.18238431,0.727084716 C4.47732449,-0.678422475 7.40420351,0.149160696 8.65834241,2.5586735 C8.75947593,2.7528808 8.85711348,2.94884981 8.99828422,3.22627683 C9.11564905,2.97418485 9.18898126,2.8079132 9.26947189,2.64516496 C10.1622769,0.838491756 11.9727751,-0.180026974 13.9224462,0.0263445011 C15.798369,0.224914128 17.3748866,1.64476665 17.8603275,3.57048096 C17.9008642,3.73104804 17.9532205,3.88851115 18,4.04740041" id="Fill-1"></path>
            </g>
          </g>  
        </g>
      </svg>
    )
  }
}

CompanyValues.defaultProps = {
  width: '18',
  height: '16'
}

CompanyValues.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string
}

export default CompanyValues
