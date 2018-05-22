import {createAssignment, deleteAssignment, getClassAssignments, updateAssignment} from './assignments'
import {getAnalytics} from './analytics'
import {authenticateUser, createAccount, forgotPassword, getRoles,
  getUserById, getUserByToken, getUsers, registerUser, resetPassword,
  resendVerification, updateAccount, verifyPhoneNumber} from './auth'
import {deleteClassPost, getClassPosts, deleteClassComment, deleteClassReply} from './chat'
import {createClass, dropClass, getClassById, getClassByIdAdmin, getClassByLink, getStudentClassesById,
  enrollByLink, enrollInClass, searchClasses, searchStudentClasses, updateClass, lockClass,
  unlockClass, updateClassStatus} from './classes'
import {createIssue, getHelpTypes, resolveIssue, getRequestTypes, resolveChangeRequest, createStudentRequest,
  resolveStudentRequest} from './classhelp'
import {getClassDocuments, uploadClassCsv, uploadClassDocument} from './documents'
import {getFieldsOfStudy, uploadFOSCsv} from './fieldsofstudy'
import {updateGradeScale} from './gradescales'
import {getStatuses, getStatusesHub} from './hub'
import {sendNeedsSyllabusNotification, getNotificationLogs, sendCustomNotification,
  getAssignmentReminders, deleteAssignmentReminders, addReminderNotification, getAssignmentReminderTopics} from './notifications'
import {getSchoolPeriods, createPeriod} from './periods'
import {attachProfessorToClass, createProfessor, removeProfessorFromClass,
  searchProfessors, updateProfessor} from './professors'
import {createSchool, getAllSchools, getHubSchools,
  getHubSchoolsMinified, getSchoolById, updateSchool, searchSchools, getStates} from './schools'
import {getAutoUpdateInfo, updateAutoUpdateInfo, forecastAutoUpdateInfo, getMinVersionInfo, updateMinVer} from './settings'
import {getNextClass} from './syllabusworkers'
import {createWeight, deleteWeight, getClassWeights, updateWeight} from './weights'

const actions = {
  analytics: {
    getAnalytics
  },
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
  chat: {
    deleteClassComment,
    deleteClassPost,
    deleteClassReply,
    getClassPosts
  },
  classes: {
    createClass,
    dropClass,
    enrollByLink,
    enrollInClass,
    getClassById,
    getClassByIdAdmin,
    getClassByLink,
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
    uploadClassCsv,
    uploadClassDocument
  },
  fieldsofstudy: {
    getFieldsOfStudy,
    uploadFOSCsv
  },
  gradescales: {
    updateGradeScale
  },
  hub: {
    getStatuses,
    getStatusesHub
  },
  notifications: {
    sendNeedsSyllabusNotification,
    getNotificationLogs,
    sendCustomNotification,
    getAssignmentReminders,
    deleteAssignmentReminders,
    addReminderNotification,
    getAssignmentReminderTopics
  },
  periods: {
    createPeriod,
    getSchoolPeriods
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
    getAllSchools,
    getHubSchools,
    getHubSchoolsMinified,
    getSchoolById,
    searchSchools,
    updateSchool,
    getStates
  },
  settings: {
    getAutoUpdateInfo,
    updateAutoUpdateInfo,
    forecastAutoUpdateInfo,
    getMinVersionInfo,
    updateMinVer
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
