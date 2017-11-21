import React from 'react'

class AssignmentSyllabus extends React.Component {
  render () {
    return (
      <div>
        <h1 style={{borderBottom: '1px solid black'}}>English 1010 Syllabus</h1>
        <p>In this english class, you will read a bunch of books written in the english language. These books range from Shakespeare to Harry Potter.</p>
        <p>For every book you read, you will write a book report and turn that in to me, Dr. Goldwater. On top of that, you will have an in-class exam for each book as well.</p>
        <p>You will also have a midterm and a final that will be comprehensive.</p>
        <p>Assignment Schedule: </p>
        <table className='full-width' id='assignments-table'>
          <tbody>
            <tr><td>Book review 1</td><td style={{textAlign: 'right'}}>8/25</td></tr>
            <tr><td>Book review 2</td><td style={{textAlign: 'right'}}>9/1</td></tr>
            <tr><td>Midterm</td><td style={{textAlign: 'right'}}>9/15</td></tr>
            <tr><td>Book review 3</td><td style={{textAlign: 'right'}}>9/23</td></tr>
          </tbody>
        </table>
        <p>Looking forward to seeing you in class,</p>
        <p>Dr. John Goldwater</p>

      </div>
    )
  }
}

export default AssignmentSyllabus
