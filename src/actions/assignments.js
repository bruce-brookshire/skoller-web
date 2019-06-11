import {get, post, put, del} from '../utilities/api'

/*
* Get assignments for class
*
* @param [Object] cl. Class
*/
export function getClassAssignments (cl) {
  return get(`/api/v1/classes/${cl.id}/assignments`, '', 'Error fetching assignments. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Create a new assignment
*
* @params [Object] form. Assignment form.
*/
export function createAssignment (cl, form) {
  return post(`/api/v1/classes/${cl.id}/assignments`, form, 'Error creating assignment. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Create a new assignment by Class ID
*
* @params [Object] form. Assignment form.
*/
export function createAssignmentByClassId (classId, form) {
  return post(`/api/v1/classes/${classId}/assignments`, form, 'Error creating assignment. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Add a grade to an assignment
*
* @params [Object] grade. Assignment grade.
*/
export function gradeAssignment (assignmentId, grade) {
  return post(`/api/v1/assignments/${assignmentId}/grades`, {grade: grade}, 'Error grading assignment. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Remove a grade from an assignment
*
* @params [Object] grade. Assignment grade.
*/
export function removeGradeFromAssignment (assignmentId) {
  return post(`/api/v1/assignments/${assignmentId}/grades`, { grade: null }, 'Error removing grade assignment. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Update an assignment
*
* @params [Object] form. Assignment form.
*/
export function updateAssignment (cl, form) {
  return put(`/api/v1/class/assignments/${form.id}`, form, 'Error updating assignment. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Delete an assignment
*/
export function deleteAssignment (form) {
  return del(`/api/v1/class/assignments/${form.id}`, 'Error deleting assignment. Try again.')
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Delete an assignment post
*/
export function deleteAssignmentPost (assignmentId, postId) {
  return del(`/api/v1/assignments/${assignmentId}/posts/${postId}`, 'Error deleting assignment post. Try again.')
    .catch(error => {
      return Promise.reject(error)
    })
}
