import {createAssignment, deleteAssignment, getClassAssignments, updateAssignment} from './assignments'
import {authenticateUser, getUserByToken, registerUser, verifyPhoneNumber} from './auth'
import {createClass, dropClass, getProfessorClasses, getStudentClasses, enrollInClass, searchClasses} from './classes'
import {getClassDocuments, uploadClassDocument} from './documents'
import {createProfessor, searchProfessors} from './professors'
import {getActiveSchools} from './schools'
import {createWeight, deleteWeight, getClassWeights, updateWeight} from './weights'

const actions = {
  assignments: {
    createAssignment,
    deleteAssignment,
    getClassAssignments,
    updateAssignment
  },
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
  documents: {
    getClassDocuments,
    uploadClassDocument
  },
  professors: {
    createProfessor,
    searchProfessors
  },
  schools: {
    getActiveSchools
  },
  weights: {
    createWeight,
    deleteWeight,
    getClassWeights,
    updateWeight
  }
}

export default actions
