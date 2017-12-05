import {authenticateUser, getUserByToken, registerUser, verifyPhoneNumber} from './auth'
import {createClass, dropClass, getProfessorClasses, getStudentClasses, enrollInClass, searchClasses} from './classes'
import {createProfessor, searchProfessors} from './professors'
import {getActiveSchools} from './schools'

const actions = {
  auth: {
    authenticateUser,
    getUserByToken,
    registerUser,
    verifyPhoneNumber
  },
  classes: {
    createClass,
    dropClass,
    enrollInClass,
    getProfessorClasses,
    getStudentClasses,
    searchClasses
  },
  professors: {
    createProfessor,
    searchProfessors
  },
  schools: {
    getActiveSchools
  }
}

export default actions
