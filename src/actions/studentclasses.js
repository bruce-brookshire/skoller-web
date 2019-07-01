import { get, post, put, del } from '../utilities/api'
import stores from '../stores'
const { userStore } = stores


/*
* Get student class by id
*
* @param [Number] classId. The id of the class to get.
*/
export function getStudentClassById (classId, student) {
  return get(`/api/v1/students/${student.id}/classes/${classId}`, '', 'Error fetching class. Try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Get student's assignments for class
*
* @param [Object] cl. Class
* @param [Object] student. Current Student
*/
export function getStudentClassAssignments (classId, student) {
  return get(`/api/v1/students/${student.id}/classes/${classId}/`, '', 'Error fetching assignments. Try again.')
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
export function createStudentAssignment (cl, student, form) {
  return post(`/api/v1/students/${student.id}/classes/${cl.id}/assignments`, form, 'Error creating assignment. Try again.')
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
export function updateStudentAssignment (cl, form) {
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
export function deleteStudentAssignment (form) {
  return del(`/api/v1/class/assignments/${form.id}`, 'Error deleting assignment. Try again.')
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Delete an assignment post
*/
export function deleteStudentAssignmentPost (assignmentId, postId) {
  return del(`/api/v1/assignments/${assignmentId}/posts/${postId}`, 'Error deleting assignment post. Try again.')
    .catch(error => {
      return Promise.reject(error)
    })
}

/*
* Update Class Color
*
*/
export function updateClassColor (cl, color) {
  const { user: { student } } = userStore
  return put(`/api/v1/student/${student.id}/classes/${cl.id}/`, { color: color }, 'Color not updated, try again.')
    .then(data => {
      return data
    })
    .catch(error => {
      return Promise.reject(error)
    })
}
