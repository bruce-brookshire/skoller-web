import React from 'react'
import FlexTable from '../../components/FlexTable'
import UploadHistory from '../../components/UploadHistory'

const headers = [
  {
    field: 'classes',
    display: ''
  },
  {
    field: 'syllabus',
    display: 'Main Syllabus'
  },
  {
    field: 'additionaDocs',
    display: 'Additional Docs'
  }
]



const classes = [
  {
    id: 0,
    courseNumber: 'CLA 3323',
    name: 'Intro to Classes',
    professor: 'Dursley',
    days: 'MWF',
    beginTime: '11:00am',
    classLength: 'Full semester',
    status: 'COMPLETED',
    syllabus: 'intro2classes.docx',
    additionalDocs: ['assignments.docx']
  },
  {
    id: 1,
    courseNumber: 'ECO 1280',
    name: 'Microeconomics',
    professor: 'Dursley',
    days: 'MWF',
    beginTime: '11:00am',
    classLength: 'Full semester',
    status: 'IN_PROGRESS',
    syllabus: 'intro2micro.docx',
    additionalDocs: ['assignments.docx']
  },
  {
    id: 2,
    courseNumber: 'AST 3000',
    name: 'Astronomy',
    professor: 'Dursley',
    days: 'MWF',
    beginTime: '11:00am',
    classLength: 'Full semester',
    status: 'NEEDS_SYLLABUS',
    syllabus: 'intro2astronomy.docx',
    additionalDocs: ['assignments.docx']
  }
]

class SubmitSyllabi extends React.Component {

  /*
  * Row data to be passed to the grid
  *
  * @return [Array]. Array of formatted row data.
  */
  getRows () {
    return classes.map((item, index) =>
      this.mapRow(item, index)
    )
  }

  /*
  * Formats row data to be passed to the grid for display
  *
  * @param [Object] item. Row data to be formatted.
  * @param [Number] index. Index of row data.
  * @return [Object] row. Object of formatted row data for display in grid.
  */
  mapRow (item, index) {
    const {id, name, syllabus, additionalDocs} = item

    const row = {
      id: id || '',
      name: <div>
          <span>{name || '-'}</span>
          <div>
            <input type='checkbox' />
            <span className='checkbox-label'>{`This class doesn't have a syllabus`}</span>
          </div>
        </div>,
      syllabus: <UploadHistory
        files={[syllabus]}
        info=''
        title='Drop syllabus here.'
      />,
      additionaDocs: <UploadHistory
        files={additionalDocs}
        info=''
        title='Drop additional docs here.'
      />
    }

    return row
  }

  render () {
    return (
      <div className='cn-submit-syllabi-container'>
        <FlexTable
          className='cn-add-class-grid'
          headers={headers}
          rows={this.getRows()}
          disabled={true}
        />
      </div>
    )
  }
}

export default SubmitSyllabi
