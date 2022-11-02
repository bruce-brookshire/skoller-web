/* eslint-disable semi */
import { PropTypes } from 'mobx-react';
import React, { useState, useCallback, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';



export const WeightHeaderComponent = (props) => {
  return (
    <span
      onClick={() => props.weightModeCallback(!props.weightModeIsPercent)}
      style={{ cursor: 'pointer' }}
    >
      Weight
      <i
        className={`${
          props.weightModeIsPercent === true
            ? 'fa fa-percent cn-blue'
            : 'fa fa-hashtag cn-blue'
        }`}
        style={{ marginLeft: '3px' }}
      ></i>
    </span>
  );
};

WeightHeaderComponent.propTypes = {
  weightModeCallback: PropTypes.func,
  weightModeIsPercent: PropTypes.bool | PropTypes.undefined
}
function WeightFormV2 (props) {
  const weightsGridRef = useRef();
  const [rowData, setRowData] = useState([
    { assignmentCategory: 'Exam 1', weight: 35, action: null },
    { assignmentCategory: 'Exam 2', weight: 35, action: null }
  ]);
  const [inputRow, setInputRow] = useState({});
  const [weightModeIsPercent, setWeightModeIsPercent] = useState(true);
  const deleteRow = useCallback((params) => {
    weightsGridRef.current.api.applyTransaction({ remove: params })
  }, [rowData])

  const [defaultColDef] = useState({
    editable: true,
    suppressMovable: true,
    suppressSizeToFit: true,
    resizable: false,
    valueFormatter: (params) =>
      isEmptyPinnedCell(params)
        ? createPinnedCellPlaceholder(params)
        : undefined
  });
  const [columnDefs] = useState([
    {
      headerName: 'Assignment Name/Category',
      field: 'assignmentCategory',
      headerTooltip:
        'Enter the categories of assignments here. Do not enter individual assignments.',
      tooltipShowDelay: 500,
      width: 250,
      defaultMinWidth: 250
    },
    {
      headerName: 'Weight',
      field: 'weight',
      type: 'numericColumn',
      headerTooltip:
        'The weight of an assignment category determines the impact an assignment will have over your overall grade.',
      width: 100,
      defaultMinWidth: 100,
      valueParser: 'Number(newValue)',
      headerComponentParams: {
        weightModeIsPercent: weightModeIsPercent,
        weightModeCallback: updateWeightModeCallback
      },
      headerComponent: WeightHeaderComponent
    },
    {
      field: '',
      width: 50,
      editable: false,
      // Render a custom component selectively for the
      // action column. If it's the pinned row, don't render
      // the delete button/icon.\
      cellRendererParams: { deleteRowCallback: deleteRow },
      cellRendererSelector: (p) => {
        if (p.node.rowPinned === 'top') {
          return null;
        } else {
          return { component: DeleteActionComponent };
        }
      }
    }
  ]);

  function updateWeightModeCallback (updatedWeightModeIsPercent) {
    setWeightModeIsPercent(updatedWeightModeIsPercent);
    const newDefs = columnDefs.map((def) => {
      if (def.field === 'weight') {
        return {
          ...def,
          headerComponentParams: {
            weightModeIsPercent: updatedWeightModeIsPercent,
            weightModeCallback: updateWeightModeCallback
          }
        };
      }

      return def;
    });
    weightsGridRef.current.api.setColumnDefs(newDefs);
  }

  const getRowStyle = useCallback(
    ({ node }) =>
      node.rowPinned
        ? { fontWeight: 'lighter', fontStyle: 'italic', alignItems: 'center' }
        : {},
    []
  );

  const onCellEditingStopped = useCallback(
    (params) => {
      if (isPinnedRowDataCompleted(params)) {
        setRowData([inputRow, ...rowData]);
        setInputRow({});
        // Reset focus to the top pinned row/first col
        setInputFocus();
      }
    },
    [rowData, inputRow]
  );

  // useEffect(() => {
  //   props.onWeightsUpdatedCallback(rowData);
  // }, [rowData])

  const onGridReady = () => {
    setInputFocus();
    // setRowData([
    //   { assignmentCategory: 'Exam 1', weight: 35, action: null },
    //   { assignmentCategory: 'Exam 2', weight: 35, action: null }
    // ]);
  };

  const setInputFocus = () => {
    weightsGridRef.current.api.ensureIndexVisible(0);
    weightsGridRef.current.api.setFocusedCell(0, 'assignmentCategory', 'top');
  };

  function isEmptyPinnedCell (params) {
    return (
      params.node.rowPinned === 'top' &&
      params.colDef.editable !== false &&
      (params.value == null ||
        params.value === '' ||
        params.value === undefined)
    );
  }

  function createPinnedCellPlaceholder ({ colDef }) {
    if (colDef.field !== 'action') {
      return (
        colDef.headerName[0].toUpperCase() + colDef.headerName.slice(1) + '...'
      );
    }
  }

  function isPinnedRowDataCompleted (params) {
    if (params.rowPinned !== 'top') return;
    // Only check that the first two columns have data.
    // We don't care about the action row.
    return columnDefs.slice(0, 2).every((def) => inputRow[def.field]);
  }


  const onRemoveSelectedRow = (params) => {
    const deletedRow = params[0]
    setRowData(rowData.filter(row => row !== deletedRow))
  }

  const DeleteActionComponent = (params) => {
    // const onRemoveSelectedRow = useCallback(() => {
    //   const selectedRow = params.api.getSelectedRows();
    //   params.deleteRowCallback(selectedRow);
    // }, [])
    
    return (
      <div onClick={() => onRemoveSelectedRow(params.api.getSelectedRows())}>
        <i className="fa fa-trash cn-red" style={{ cursor: 'pointer' }}></i>
      </div>
    );
  };

  return (
    <div className="cn-form-section" style={{ marginTop: '10px' }}>
      <div style={{ height: 300, width: 400 }} className="ag-theme-alpine">
        <button onClick={() => console.log(rowData)}>press</button>
        <AgGridReact
          ref={weightsGridRef}
          defaultColDef={defaultColDef}
          columnDefs={columnDefs}
          rowData={rowData}
          getRowStyle={getRowStyle}
          pinnedTopRowData={[inputRow]}
          onGridReady={onGridReady}
          onCellEditingStopped={onCellEditingStopped}
          rowHeight={30}
          rowSelection={'single'}
        ></AgGridReact>
      </div>
    </div>
  );
}

WeightFormV2.propTypes = {
  weight: PropTypes.object,
  isPoints: PropTypes.bool,
  weights: PropTypes.array,
  onWeightsUpdatedCallback: PropTypes.func
};

export default WeightFormV2
