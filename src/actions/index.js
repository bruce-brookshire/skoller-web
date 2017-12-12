import {createAssignment, deleteAssignment, getClassAssignments, updateAssignment} from './assignments'
import {authenticateUser, getUserByToken, registerUser, verifyPhoneNumber} from './auth'
import {createClass, dropClass, getProfessorClasses, getStudentClasses, enrollInClass, searchClasses, updateClass} from './classes'
import {getClassDocuments, uploadClassDocument} from './documents'
import {getSchoolPeriods, createPeriod, updatePeriod} from './periods'
import {createProfessor, searchProfessors} from './professors'
import {createSchool, getActiveSchools, getHubSchools, updateSchool} from './schools'
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
    searchClasses,
    updateClass
  },
  documents: {
    getClassDocuments,
    uploadClassDocument
  },
  periods: {
    createPeriod,
    getSchoolPeriods,
    updatePeriod
  },
  professors: {
    createProfessor,
    searchProfessors
  },
  schools: {
    createSchool,
    getActiveSchools,
    getHubSchools,
    updateSchool
  },
  weights: {
    createWeight,
    deleteWeight,
    getClassWeights,
    updateWeight
  }
}

export default actions
