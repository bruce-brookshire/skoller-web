/* eslint-disable semi */
import { PropTypes } from 'mobx-react';
import React, { useState } from 'react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

function WeightFormV2 (props) {
  console.log(props, 'PROPS PROPS PROPS');
  const initializeFormData = (data) => {
    let formData = data || {};
    const { id, name, weight } = formData;
    return {
      id: id || null,
      name: name || '',
      weight: weight || '',
      created_on: 'Web'
    };
  };

  const [isPoints, setIsPoints] = useState(props.isPoints);
  const [loading, setLoading] = useState(false);
  const [totalPointsFormValue, setTotalPointsFormValue] = useState(null);
  const [editPoints, setEditPoints] = useState(false);
  const [openGradeModal, setOpenGradeModal] = useState(false);
  const [form, setForm] = useState(initializeFormData(props.weight));

  return (
    <div className="cn-form-section">
      <div className='cn-section-name-header txt-gray'>
       Category
      </div>
      <div className='cn-section-value-header txt-gray border-left'>
        Value
      </div>
      <hr className='txt-gray' />
      
    </div>
  );
}

WeightFormV2.propTypes = {
  weight: PropTypes.object,
  isPoints: PropTypes.bool
};
export default WeightFormV2;
