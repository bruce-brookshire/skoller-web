import {
  createAssignment,
  createStudentAssignment,
  createAssignmentByClassId,
  deleteAssignment,
  deleteStudentAssignment,
  deleteAssignmentPost,
  getAllStudentAssignments,
  getClassAssignments,
  updateAssignment,
  tagAssignment,
  getTaskAssignments,
  gradeAssignment,
  removeGradeFromAssignment,
  updateStudentAssignment,
  getStudentAssignmentById,
  toggleCompleteAssignmentById
} from './assignments'

import {
  getAllSubscription,
  getMySubscription,
  cancelSubscription,
  lastUpcomingPayment,
  billingHistory,
  allProducts,
  allPlans,
  createSubscription,
  cancellationReason
} from './stripe'
import { getAnalytics } from './analytics'
import {
  authenticateUser,
  loginStudentWithPhone,
  forgotPassword,
  getRoles,
  getUserById,
  getUserByToken,
  getUsers,
  registerUser,
  registerUserAdmin,
  resetPassword,
  resendVerification,
  updateAccount,
  verifyPhoneNumber,
  verifyStudentPhoneNumber,
  setUserTrialToLifeTime,
  cancelUserTrial
} from './auth'
import {
  deleteClassPost,
  getClassPosts,
  deleteClassComment,
  deleteClassReply
} from './chat'
import {
  createClass,
  dropClass,
  getClassById,
  getStudentClass,
  getClassByIdAdmin,
  getClassByLink,
  getStudentClassesById,
  enrollByLink,
  enrollInClass,
  searchClasses,
  getInReviewClasses,
  getChangeClasses,
  searchStudentClasses,
  searchSchoolStudentClasses,
  updateClass,
  lockClass,
  lockClassWeight,
  unlockClass,
  updateClassStatus,
  addNote,
  getClassesCsv
} from './classes'
import {
  createIssue,
  getHelpTypes,
  getRequestTypes,
  resolveChangeRequest,
  resolveChangeRequestMember,
  createStudentRequest,
  resolveStudentRequest
} from './classhelp'
import {
  getClassDocuments,
  uploadClassCsv,
  uploadClassDocument,
  deleteClassDocument
} from './documents'
import { getEmailTypes, getMinEmailTypes, updateEmailType } from './email-types'
import { getFieldsOfStudy, uploadFOSCsv } from './fieldsofstudy'
import {
  overrideSchool,
  getFourDoor,
  updateFourDoor,
  getFourDoorOverrides,
  deleteOverride
} from './fourdoor'
import { updateGradeScale } from './gradescales'
import { getStatuses, getStatusesHub } from './hub'
import { getAssignmentMods } from './mods'
import {
  sendNeedsSyllabusNotification,
  getNotificationLogs,
  sendCustomNotification,
  getAssignmentReminders,
  deleteAssignmentReminders,
  addReminderNotification,
  getAssignmentReminderTopics
} from './notifications'
import {
  getOrganizations,
  createOrganization,
  updateOrganization,
  deleteOrganization,
  addOrgLogo
} from './organizations'
import { getSchoolPeriods, createPeriod, updatePeriod } from './periods'
import {
  attachProfessorToClass,
  createProfessor,
  removeProfessorFromClass,
  searchProfessors,
  updateProfessor
} from './professors'
import { resolveReport, getIncompleteReports } from './reports'
import {
  createSchool,
  getAllSchools,
  getHubSchools,
  getHubSchoolsMinified,
  getSchoolById,
  getSchoolsByEmailDomain,
  updateSchool,
  searchSchools,
  getStates,
  uploadSchoolCsv,
  getSchoolsCsv,
  getMostCommonSchool,
  getEmailDomains,
  createEmailDomains,
  deleteEmailDomains
} from './schools'
import {
  getAutoUpdateInfo,
  updateAutoUpdateInfo,
  forecastAutoUpdateInfo,
  getMinVersionInfo,
  updateMinVer,
  getAdminSettings,
  setSyllabusOverloadSettings
} from './settings'
import {
  createCustomLink,
  getCustomLinkById,
  getCustomLinks
} from './signup-links'
import {
  getStudentClassById,
  getStudentClassAssignments,
  updateClassColor
} from './studentclasses'
import { getNextClass } from './syllabusworkers'
import {
  getStudentCsv,
  getEmailPreferences,
  updateEmailPreferences,
  deleteUserById,
  refreshUser,
  addAvatar
} from './users'
import {
  createWeight,
  deleteWeight,
  getClassWeights,
  getClassWeightsByClassId,
  updateWeight
} from './weights'
import {
  getStudentByLink,
  setStudentPrimarySchool,
  setStudentPrimaryPeriod,
  getStudentSignupOrganization,
  getUsersReferredByStudent,
  getStudentById,
  storeVenmoHandle,
  setStudentMajor,
  setStudentMajors,
  updateStudent
} from './students'
import {
  getJobsProfile,
  getActivityTypes,
  getDegreeTypes,
  getEthnicityTypes,
  getStatusTypes,
  getSearchTypes,
  editJobsProfile,
  createJobsProfile,
  uploadJobsDoc,
  addCareerActivity,
  addActivity,
  deleteActivity,
  editActivity,
  getJobsListings,
  getJobBySenderReference,
  sendJobAction
} from './jobs'
import insights from './Insights'

const actions = {
  analytics: {
    getAnalytics
  },
  students: {
    getStudentByLink,
    setStudentPrimarySchool,
    setStudentPrimaryPeriod,
    getStudentSignupOrganization,
    getUsersReferredByStudent,
    getStudentById,
    storeVenmoHandle,
    setStudentMajor,
    setStudentMajors,
    updateStudent
  },
  assignments: {
    createAssignment,
    createStudentAssignment,
    createAssignmentByClassId,
    deleteAssignment,
    deleteStudentAssignment,
    deleteAssignmentPost,
    getClassAssignments,
    updateAssignment,
    tagAssignment,
    getTaskAssignments,
    gradeAssignment,
    removeGradeFromAssignment,
    getAllStudentAssignments,
    updateStudentAssignment,
    getStudentAssignmentById,
    toggleCompleteAssignmentById
  },
  stripe: {
    getAllSubscription,
    getMySubscription,
    cancelSubscription,
    lastUpcomingPayment,
    billingHistory,
    allProducts,
    allPlans,
    createSubscription,
    cancellationReason
  },
  auth: {
    authenticateUser,
    loginStudentWithPhone,
    getRoles,
    getUserById,
    setUserTrialToLifeTime,
    cancelUserTrial,
    getUserByToken,
    getUsers,
    forgotPassword,
    registerUser,
    registerUserAdmin,
    resetPassword,
    resendVerification,
    verifyPhoneNumber,
    verifyStudentPhoneNumber,
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
    getStudentClass,
    getClassByIdAdmin,
    getClassByLink,
    getStudentClassesById,
    lockClass,
    lockClassWeight,
    getInReviewClasses,
    getChangeClasses,
    searchClasses,
    searchStudentClasses,
    searchSchoolStudentClasses,
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
    resolveChangeRequestMember,
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
    deleteOrganization,
    addOrgLogo
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
    getSchoolsByEmailDomain,
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
    updateMinVer,
    getAdminSettings,
    setSyllabusOverloadSettings
  },
  signupLinks: {
    createCustomLink,
    getCustomLinkById,
    getCustomLinks
  },
  studentClasses: {
    getStudentClassById,
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
    deleteUserById,
    refreshUser,
    addAvatar
  },
  weights: {
    createWeight,
    deleteWeight,
    getClassWeights,
    getClassWeightsByClassId,
    updateWeight
  },
  jobs: {
    getJobsProfile,
    getActivityTypes,
    getDegreeTypes,
    getEthnicityTypes,
    getStatusTypes,
    getSearchTypes,
    editJobsProfile,
    createJobsProfile,
    uploadJobsDoc,
    addCareerActivity,
    addActivity,
    deleteActivity,
    editActivity,
    getJobsListings,
    getJobBySenderReference,
    sendJobAction
  },
  insights
}

export default actions
