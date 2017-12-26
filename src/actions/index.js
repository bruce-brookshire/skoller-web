import {createAssignment, deleteAssignment, getClassAssignments, updateAssignment} from './assignments'
import {authenticateUser, createAccount, forgotPassword, getRoles,
  getUserById, getUserByToken, getUsers, registerUser, resetPassword,
  resendVerification, updateAccount, verifyPhoneNumber} from './auth'
import {createClass, dropClass, getClassById, getProfessorClasses,
  getStudentClasses, enrollInClass, searchClasses, searchStudentClasses,
  updateClass, lockClass, unlockClass} from './classes'
import {createIssue, getHelpTypes} from './classhelp'
import {getClassDocuments, uploadClassDocument} from './documents'
import {updateGradeScale} from './gradescales'
import {getStatuses} from './hub'
import {getSchoolPeriods, createPeriod, updatePeriod} from './periods'
import {attachProfessorToClass, createProfessor, removeProfessorFromClass,
  searchProfessors, updateProfessor} from './professors'
import {createSchool, getActiveSchools, getHubSchools, getHubSchoolsMinified,
  getSchoolById, updateSchool} from './schools'
import {getAssignmentClass, getReviewClass, getWeightClass} from './syllabusworkers'
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
    forgotPassword,
    registerUser,
    resetPassword,
    resendVerification,
    verifyPhoneNumber,
    updateAccount
  },
  classes: {
    createClass,
    dropClass,
    enrollInClass,
    getClassById,
    getProfessorClasses,
    getStudentClasses,
    lockClass,
    searchClasses,
    searchStudentClasses,
    unlockClass,
    updateClass
  },
  classhelp: {
    createIssue,
    getHelpTypes
  },
  documents: {
    getClassDocuments,
    uploadClassDocument
  },
  gradescales: {
    updateGradeScale
  },
  hub: {
    getStatuses
  },
  periods: {
    createPeriod,
    getSchoolPeriods,
    updatePeriod
  },
  professors: {
    attachProfessorToClass,
    createProfessor,
    removeProfessorFromClass,
    searchProfessors,
    updateProfessor
  },
  schools: {
    createSchool,
    getActiveSchools,
    getHubSchools,
    getHubSchoolsMinified,
    getSchoolById,
    updateSchool
  },
  syllabusworkers: {
    getAssignmentClass,
    getReviewClass,
    getWeightClass
  },
  weights: {
    createWeight,
    deleteWeight,
    getClassWeights,
    updateWeight
  }
}

export default actions
