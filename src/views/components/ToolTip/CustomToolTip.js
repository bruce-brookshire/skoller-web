import React from 'react';
import PropTypes from 'prop-types';

const ReactToolTip =  ({ 
  title, 
  studentCount,
  ttype,
  enrollment_link,
  children, 
  position, 
  containerClass, 
  theme }) => {
    return (
      <div className={`tooltipC ${containerClass}`}>
        {children}
        { ttype == 'classes' ? (
            <div className={`tooltiptextC ${theme === "dark" ? `darkC` :`light`} tooltipC-${position}`} >
            {title}
            <div>{studentCount + ' classmates are on skoller'}</div>
            <div>Invite classmate using this link</div>
            <div><a>{ enrollment_link } </a></div>
            <span className="arrowC"></span>
          </div>
        ) : (
            <div className={`tooltiptextC ${theme === "dark" ? `darkC` :`light`} tooltipC-${position}`} >
            Grade Impact High
            <div>15 % or more</div>
            <div>Exam 1 is worth 17.5% of your overall grade in the class.</div>
           
            <span className="arrowC"></span>
          </div>
        )}

          
      </div>
    );
}

export default ReactToolTip;

ReactToolTip.defaultProps = {
  title: 'sample',
  studentCount:0,
  enrollment_link:'',
  ttype:'classes',
  children: React.createElement('div'),
  position: 'bottom',
  containerClass: '',
  theme: 'light'
}

ReactToolTip.propTypes = {
  title: PropTypes.string,
  studentCount:PropTypes.string,
  enrollment_link:PropTypes.string,
  children: PropTypes.element,
  ttype: PropTypes.string,
  position: PropTypes.string,
  containerClass: PropTypes.string,
  theme: PropTypes.string
}