function round (number) {
  return Math.round(number * 10) / 10
}

function getCandidateCardCompletion (profile) {
  let score = 0
  if (profile.gpa) {
    score += 1
  }
  if (profile.skills) {
    score += 1
  }
  if (profile.experience_activities.length > 0) {
    score += 1
  }
  if (profile.achievement_activities.length > 0) {
    score += 1
  }
  return (score / 4)
}

function getWorkPreferencesCompletion (profile) {
  let score = 0
  if (profile.career_interests) {
    score += 1
  }
  if (profile.regions) {
    score += 1
  }
  if (profile.startup_interest !== null) {
    score += 1
  }
  return (score / 3)
}

function getProfilePicCompletion (user) {
  let score = 0
  if (user.avatar) {
    score += 1
  }
  return (score)
}

function getBasicInfoCompletion (profile) {
  let score = 0
  if (profile.state_code) {
    score += 1
  }
  if (profile.work_auth) {
    score += 1
  }
  if (profile.sponsorship_required !== null) {
    score += 1
  }
  return (score / 3)
}

function getPersonalityCompletion (profile) {
  if (profile.personality) {
    return 1
  } else {
    return 0
  }
}

function getMoreInfoCompletion (profile) {
  let score = 0
  if (profile.club_activities.length > 0) {
    score += 1
  }
  if (profile.played_sports !== null) {
    score += 1
  }
  if (profile.act_score) {
    score += 1
  }
  if (profile.sat_score) {
    score += 1
  }
  return (score / 4)
}

function getCompanyValuesCompletion (profile) {
  if (profile.company_values) {
    return 1
  } else {
    return 0
  }
}

export function getEqualOpportunityEmploymentCompletion (profile) {
  let score = 0
  if (profile.ethnicity_type) {
    score += 1
  }
  if (profile.disability !== null) {
    score += 1
  }
  if (profile.fin_aid !== null) {
    score += 1
  }
  if (profile.first_gen_college !== null) {
    score += 1
  }
  if (profile.gender !== null) {
    score += 1
  }
  if (profile.pell_grant !== null) {
    score += 1
  }
  if (profile.veteran !== null) {
    score += 1
  }
  return (score / 7)
}

function getSocialLinksCompletion (profile) {
  if (profile.social_links) {
    return 1
  } else {
    return 0
  }
}

function getVolunteerCompletion (profile) {
  let score = 0
  if (profile.volunteer_activities.length > 0) {
    score += 1
  }
  return (score / 1)
}

export function calculateTotalProfileScore (profile, user) {
  console.log(profile)
  let score = 20
  score += getCandidateCardCompletion(profile) * 15
  score += getWorkPreferencesCompletion(profile) * 10
  score += getProfilePicCompletion(user) * 10
  score += getBasicInfoCompletion(profile) * 10
  score += getPersonalityCompletion(profile) * 10
  score += getMoreInfoCompletion(profile) * 5
  score += getCompanyValuesCompletion(profile) * 5
  score += getEqualOpportunityEmploymentCompletion(profile) * 5
  score += getSocialLinksCompletion(profile) * 5
  score += getVolunteerCompletion(profile) * 5

  return round(score)
}

export function calculateCoreProfileCompleteness (profile) {
  let score = 0
  if (profile.gpa) {
    score += 1
  }
  if (profile.degree_type) {
    score += 1
  }
  if (profile.regions) {
    score += 1
  }
  if (profile.resume_url) {
    score += 1
  }
  if (profile.sponsorship_required !== null) {
    score += 1
  }
  if (profile.state_code) {
    score += 1
  }
  if (profile.work_auth) {
    score += 1
  }
  return round((score / 7) * 100)
}

export function calculatePersonalityProfileCompleteness (profile) {
  let score = 0
  if (profile.personality) {
    score += 1
  }
  if (profile.company_values) {
    score += 1
  }
  return round((score / 2) * 100)
}

export function calculateExperienceProfileCompleteness (profile) {
  let score = 0
  return score
}

export function calculateExtrasProfileCompleteness (profile) {
  let score = 0
  if (profile.skills) {
    score += 1
  }
  if (profile.achievement_activities.length > 0) {
    score += 1
  }
  return round((score / 2) * 100)
}
