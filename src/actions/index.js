import {createAssignment, deleteAssignment, getClassAssignments, updateAssignment} from './assignments'
import {authenticateUser, createAccount, forgotPassword, getRoles,
  getUserById, getUserByToken, getUsers, registerUser, resetPassword,
  resendVerification, updateAccount, verifyPhoneNumber} from './auth'
import {createClass, deleteClass, dropClass, getClassById, getLocks, getProfessorClasses,
  getStudentClasses, getStudentClassesById, enrollInClass, searchClasses, searchStudentClasses,
  updateClass, lockClass, unlockClass, approveClass, updateClassStatus} from './classes'
import {createIssue, getHelpTypes, resolveIssue, getRequestTypes, resolveChangeRequest, createStudentRequest,
        resolveStudentRequest} from './classhelp'
import {getClassDocuments, uploadClassCsv, uploadClassDocument, deleteClassDocument,
  uploadFOSCsv} from './documents'
import {updateGradeScale} from './gradescales'
import {getStatuses, getStatusesHub} from './hub'
import {getSchoolPeriods, createPeriod, updatePeriod} from './periods'
import {attachProfessorToClass, createProfessor, removeProfessorFromClass,
  searchProfessors, updateProfessor} from './professors'
import {createSchool, getActiveSchools, getFieldsOfStudy, getHubSchools,
  getHubSchoolsMinified, getSchoolById, updateSchool} from './schools'
import {showSnackbar} from './snackbar'
import {getNextClass} from './syllabusworkers'
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
    approveClass,
    deleteClass,
    createClass,
    dropClass,
    enrollInClass,
    getClassById,
    getLocks,
    getProfessorClasses,
    getStudentClasses,
    getStudentClassesById,
    lockClass,
    searchClasses,
    searchStudentClasses,
    unlockClass,
    updateClass,
    updateClassStatus
  },
  classhelp: {
    createIssue,
    getHelpTypes,
    resolveIssue,
    getRequestTypes,
    resolveChangeRequest,
    createStudentRequest,
    resolveStudentRequest
  },
  documents: {
    getClassDocuments,
    deleteClassDocument,
    uploadClassCsv,
    uploadClassDocument,
    uploadFOSCsv
  },
  gradescales: {
    updateGradeScale
  },
  hub: {
    getStatuses,
    getStatusesHub
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
    getFieldsOfStudy,
    getHubSchools,
    getHubSchoolsMinified,
    getSchoolById,
    updateSchool
  },
  snackbar: {
    showSnackbar
  },
  syllabusworkers: {
    getNextClass
  },
  weights: {
    createWeight,
    deleteWeight,
    getClassWeights,
    updateWeight
  }
}

export default actions
