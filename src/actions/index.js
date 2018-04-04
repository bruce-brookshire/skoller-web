import {createAssignment, deleteAssignment, getClassAssignments, updateAssignment} from './assignments'
import {getAnalytics} from './analytics'
import {authenticateUser, createAccount, forgotPassword, getRoles,
  getUserById, getUserByToken, getUsers, registerUser, resetPassword,
  resendVerification, updateAccount, verifyPhoneNumber} from './auth'
import {createClassPost, deleteClassPost, getClassPost, getClassPosts, likePost, unlikePost,
  updateClassPost, createClassComment, deleteClassComment, likeComment, unlikeComment, updateClassComment,
  createClassReply, deleteClassReply, likeReply, unlikeReply, updateClassReply} from './chat'
import {createClass, deleteClass, dropClass, getClassById, getLocks, getProfessorClasses,
  getStudentClasses, getStudentClassesById, enrollInClass, searchClasses, searchStudentClasses,
  updateClass, lockClass, unlockClass, approveClass, denyClass, updateClassStatus} from './classes'
import {createIssue, getHelpTypes, resolveIssue, getRequestTypes, resolveChangeRequest, createStudentRequest,
  resolveStudentRequest} from './classhelp'
import {getClassDocuments, uploadClassCsv, uploadClassDocument, deleteClassDocument,
  uploadFOSCsv} from './documents'
import {updateGradeScale} from './gradescales'
import {getStatuses, getStatusesHub} from './hub'
import {sendNeedsSyllabusNotification, getNotificationLogs, sendCustomNotification,
  getAssignmentReminders, deleteAssignmentReminders, addReminderNotification, getAssignmentReminderTopics} from './notifications'
import {getSchoolPeriods, createPeriod, updatePeriod} from './periods'
import {attachProfessorToClass, createProfessor, removeProfessorFromClass,
  searchProfessors, updateProfessor} from './professors'
import {createSchool, getAllSchools, getActiveSchools, getFieldsOfStudy, getHubSchools,
  getHubSchoolsMinified, getSchoolById, updateSchool} from './schools'
import {getAutoUpdateInfo, updateAutoUpdateInfo, forecastAutoUpdateInfo, getMinVersionInfo, updateMinVer} from './settings'
import {showSnackbar} from './snackbar'
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
    createClassPost,
    createClassComment,
    createClassReply,
    deleteClassComment,
    deleteClassPost,
    deleteClassReply,
    getClassPost,
    getClassPosts,
    likeComment,
    likePost,
    likeReply,
    unlikeComment,
    unlikeReply,
    unlikePost,
    updateClassComment,
    updateClassPost,
    updateClassReply
  },
  classes: {
    approveClass,
    deleteClass,
    denyClass,
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
    getAllSchools,
    getActiveSchools,
    getFieldsOfStudy,
    getHubSchools,
    getHubSchoolsMinified,
    getSchoolById,
    updateSchool
  },
  settings: {
    getAutoUpdateInfo,
    updateAutoUpdateInfo,
    forecastAutoUpdateInfo,
    getMinVersionInfo,
    updateMinVer
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
