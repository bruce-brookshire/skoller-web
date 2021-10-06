import React from 'react';
import PropTypes from 'prop-types';

const ReactToolTip =  ({ 
  title, 
  studentCount,
  ttype,
  grade,
  enrollment_link,
  children, 
  position, 
  containerClass, 
  theme }) => {
    return (
      <div className={`tooltipC`}>
      {/* <div className="class-tootip-wrap"> */}
        {children}
        { ttype == 'classes' ? (
            <div className={`tooltiptextC ${theme === "dark" ? `darkC` :`light`} tooltipC-${position}`} >
            {/* {title}
            <div>{studentCount + ' classmates are on skoller'}</div>
            <div>Invite classmate using this link</div>
            <div><a>{ enrollment_link } </a></div>
            <span className="arrowC"></span> */}

          <div className="class-tootip-wrap">
          
          <h3 class="my-5 fs-18 text-center d-block">{title}</h3>
          <p class="fs-12 my-5">{studentCount + ' classmates are on skoller'}</p>
          <p class="fs-12 mt-10 mb-0 text-muted">Invite classmate using this link</p>
          <p class="mt-0 mb-0"><a href="#" class="fs-13 text-primary p-5 linktip break-all">{ enrollment_link }</a></p>
        </div>
            
          </div>
          
        ) : (
            <div className={`tooltiptextC ${theme === "dark" ? `darkC` :`light`} tooltipC-left`} >
              <div class="assi-tootip-wrap">
                <h3 class="my-5 fs-18 text-center d-block">Grade Impact: High</h3>
                <p class="fs-13 mt-0 mb-0 text-muted">{grade}% of more</p>
                <p class="fs-13 my-5">{title} is worth {grade}%  of your overall grade in the class.</p>
              </div>
          </div>
        )}

          
      </div>
    );
}

export default ReactToolTip;

ReactToolTip.defaultProps = {
  title: 'sample',
  studentCount:0,
  grade:0,
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
  grade: PropTypes.string,
  position: PropTypes.string,
  containerClass: PropTypes.string,
  theme: PropTypes.string
}