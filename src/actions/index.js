import {createAssignment, deleteAssignment, deleteAssignmentPost, getClassAssignments, updateAssignment, getTaskAssignments} from './assignments'
import {getAnalytics} from './analytics'
import {authenticateUser, forgotPassword, getRoles,
  getUserById, getUserByToken, getUsers, registerUser, registerUserAdmin, resetPassword,
  resendVerification, updateAccount, verifyPhoneNumber} from './auth'
import {deleteClassPost, getClassPosts, deleteClassComment, deleteClassReply} from './chat'
import {createClass, dropClass, getClassById, getClassByIdAdmin, getClassByLink, getStudentClassesById,
  enrollByLink, enrollInClass, searchClasses, searchStudentClasses, updateClass, lockClass,
  unlockClass, updateClassStatus, addNote, getClassesCsv} from './classes'
import {createIssue, getHelpTypes, getRequestTypes, resolveChangeRequest, createStudentRequest,
  resolveStudentRequest} from './classhelp'
import {getClassDocuments, uploadClassCsv, uploadClassDocument, deleteClassDocument} from './documents'
import {getEmailTypes, getMinEmailTypes, updateEmailType} from './email-types'
import {getFieldsOfStudy, uploadFOSCsv} from './fieldsofstudy'
import {overrideSchool, getFourDoor, updateFourDoor, getFourDoorOverrides, deleteOverride} from './fourdoor'
import {updateGradeScale} from './gradescales'
import {getStatuses, getStatusesHub} from './hub'
import {getAssignmentMods} from './mods'
import {sendNeedsSyllabusNotification, getNotificationLogs, sendCustomNotification,
  getAssignmentReminders, deleteAssignmentReminders, addReminderNotification, getAssignmentReminderTopics} from './notifications'
import {getOrganizations, createOrganization, updateOrganization, deleteOrganization} from './organizations'
import {getSchoolPeriods, createPeriod, updatePeriod} from './periods'
import {attachProfessorToClass, createProfessor, removeProfessorFromClass,
  searchProfessors, updateProfessor} from './professors'
import {resolveReport, getIncompleteReports} from './reports'
import {createSchool, getAllSchools, getHubSchools,
  getHubSchoolsMinified, getSchoolById, updateSchool, searchSchools, getStates, uploadSchoolCsv, getSchoolsCsv, getMostCommonSchool, getEmailDomains, createEmailDomains, deleteEmailDomains} from './schools'
import {getAutoUpdateInfo, updateAutoUpdateInfo, forecastAutoUpdateInfo, getMinVersionInfo, updateMinVer} from './settings'
import {createCustomLink, getCustomLinkById, getCustomLinks} from './signup-links'
import { getStudentClassAssignments, updateClassColor } from './studentclasses'
import {getNextClass} from './syllabusworkers'
import {getStudentCsv, getEmailPreferences, updateEmailPreferences, deleteUserById} from './users'
import {createWeight, deleteWeight, getClassWeights, updateWeight} from './weights'
import {getStudentByLink} from './students'

const actions = {
  analytics: {
    getAnalytics
  },
  students: {
    getStudentByLink
  },
  assignments: {
    createAssignment,
    deleteAssignment,
    deleteAssignmentPost,
    getClassAssignments,
    updateAssignment,
    getTaskAssignments
  },
  auth: {
    authenticateUser,
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
    addNote,
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
    updateClassStatus,
    getClassesCsv
  },
  classhelp: {
    createIssue,
    getHelpTypes,
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
  emailTypes: {
    getEmailTypes,
    updateEmailType,
    getMinEmailTypes
  },
  fieldsofstudy: {
    getFieldsOfStudy,
    uploadFOSCsv
  },
  fourdoor: {
    overrideSchool,
    getFourDoor,
    updateFourDoor,
    getFourDoorOverrides,
    deleteOverride
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
  organizations: {
    getOrganizations,
    createOrganization,
    updateOrganization,
    deleteOrganization
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
    getStates,
    uploadSchoolCsv,
    getSchoolsCsv,
    getMostCommonSchool,
    getEmailDomains,
    createEmailDomains,
    deleteEmailDomains
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
  studentClasses: {
    getStudentClassAssignments,
    updateClassColor
  },
  syllabusworkers: {
    getNextClass
  },
  users: {
    getStudentCsv,
    getEmailPreferences,
    updateEmailPreferences,
    deleteUserById
  },
  weights: {
    createWeight,
    deleteWeight,
    getClassWeights,
    updateWeight
  }
}

export default actions
