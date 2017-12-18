import {createAssignment, deleteAssignment, getClassAssignments, updateAssignment} from './assignments'
import {authenticateUser, createAccount, getRoles, getUserById, getUserByToken, getUsers, registerUser, updateAccount, verifyPhoneNumber} from './auth'
import {createClass, dropClass, getProfessorClasses, getStudentClasses, enrollInClass, searchClasses, updateClass, lockClass, unlockClass} from './classes'
import {getClassDocuments, uploadClassDocument} from './documents'
import {updateGradeScale} from './gradescales'
import {getSchoolPeriods, createPeriod, updatePeriod} from './periods'
import {createProfessor, searchProfessors} from './professors'
import {createSchool, getActiveSchools, getHubSchools, getSchoolById, updateSchool} from './schools'
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
    createAccount,
    getRoles,
    getUserById,
    getUserByToken,
    getUsers,
    registerUser,
    verifyPhoneNumber,
    updateAccount
  },
  classes: {
    createClass,
    dropClass,
    enrollInClass,
    getProfessorClasses,
    getStudentClasses,
    lockClass,
    searchClasses,
    unlockClass,
    updateClass
  },
  documents: {
    getClassDocuments,
    uploadClassDocument
  },
  gradescales: {
    updateGradeScale
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
    getSchoolById,
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
