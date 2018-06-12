import {createAssignment, deleteAssignment, deleteAssignmentPost, getClassAssignments, updateAssignment} from './assignments'
import {getAnalytics} from './analytics'
import {authenticateUser, createAccount, forgotPassword, getRoles,
  getUserById, getUserByToken, getUsers, registerUser, registerUserAdmin, resetPassword,
  resendVerification, updateAccount, verifyPhoneNumber} from './auth'
import {deleteClassPost, getClassPosts, deleteClassComment, deleteClassReply} from './chat'
import {createClass, dropClass, getClassById, getClassByIdAdmin, getClassByLink, getStudentClassesById,
  enrollByLink, enrollInClass, searchClasses, searchStudentClasses, updateClass, lockClass,
  unlockClass, updateClassStatus} from './classes'
import {createIssue, getHelpTypes, resolveIssue, getRequestTypes, resolveChangeRequest, createStudentRequest,
  resolveStudentRequest} from './classhelp'
import {getClassDocuments, uploadClassCsv, uploadClassDocument, deleteClassDocument} from './documents'
import {getFieldsOfStudy, uploadFOSCsv} from './fieldsofstudy'
import {updateGradeScale} from './gradescales'
import {getStatuses, getStatusesHub} from './hub'
import {getAssignmentMods} from './mods'
import {sendNeedsSyllabusNotification, getNotificationLogs, sendCustomNotification,
  getAssignmentReminders, deleteAssignmentReminders, addReminderNotification, getAssignmentReminderTopics} from './notifications'
import {getSchoolPeriods, createPeriod} from './periods'
import {attachProfessorToClass, createProfessor, removeProfessorFromClass,
  searchProfessors, updateProfessor} from './professors'
import {resolveReport, getIncompleteReports} from './reports'
import {createSchool, getAllSchools, getHubSchools,
  getHubSchoolsMinified, getSchoolById, updateSchool, searchSchools, getStates} from './schools'
import {getAutoUpdateInfo, updateAutoUpdateInfo, forecastAutoUpdateInfo, getMinVersionInfo, updateMinVer} from './settings'
import {createCustomLink, getCustomLinkById, getCustomLinks} from './signup-links'
import {getNextClass} from './syllabusworkers'
import {createWeight, deleteWeight, getClassWeights, updateWeight} from './weights'

const actions = {
  analytics: {
    getAnalytics
  },
  assignments: {
    createAssignment,
    deleteAssignment,
    deleteAssignmentPost,
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
    registerUserAdmin,
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
    deleteClassDocument,
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
  mods: {
    getAssignmentMods
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
  reports: {
    getIncompleteReports,
    resolveReport
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
  signupLinks: {
    createCustomLink,
    getCustomLinkById,
    getCustomLinks
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
