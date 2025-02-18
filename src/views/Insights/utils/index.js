import moment from 'moment'

export function toTitleCase (string) {
  if (!string) return null
  var sentence = string.toLowerCase().split(' ')
  for (var i = 0; i < sentence.length; i++) {
    sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1)
  }
  sentence = sentence.join(' ')
  return sentence
}

export function getAssignmentCountInNextNDays (assignments, n) {
  if (!assignments) return 0
  let assignmentCount = 0
  let lastDay = moment().add(n, 'days')

  assignments.forEach(a => {
    let due = moment(a.due).startOf('day')
    let now = moment().startOf('day')
    if (due.isAfter(now)) {
      if (due.isBefore(lastDay) || due.isSame(now, 'day')) {
        assignmentCount += 1
      }
    }
  })

  return assignmentCount
}

export function getAssignmentWeightsInNextNDays (assignments, n = 7) {
  if (!assignments) return 0
  let assignmentsWeight = 0
  let lastDay = moment().add(n, 'days')

  let totalWeight = assignments.reduce((i, a) => i + a.weight, 0)

  assignments.forEach(a => {
    let due = moment(a.due).startOf('day')
    let now = moment().startOf('day')
    if (due.isAfter(now)) {
      if (due.isBefore(lastDay) || due.isSame(now, 'day')) {
        assignmentsWeight += a.weight
      }
    }
  })

  let weights = Math.round((assignmentsWeight / totalWeight) * 1000) / 10
  if (isNaN(weights)) {
    weights = 0
  }
  return weights
}

const percentile = (arr, val) => {
  arr = arr.filter(v => v > 0)
  return (100 * arr.reduce((acc, v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0), 0)) / arr.length
}

export function getIntensityScore (assignments, nDays, startDay = moment()) {
  let today = moment(startDay)

  let firstAssignment = Math.min.apply(Math, assignments.map(a => parseInt(moment(a.due).format('X'))))
  let lastAssignment = Math.max.apply(Math, assignments.map(a => parseInt(moment(a.due).format('X'))))

  let allDays = []
  let day = moment(firstAssignment, 'X')
  while (day.isBefore(moment(lastAssignment, 'X')) || day.isSame(moment(lastAssignment, 'X'))) {
    let dayAssignments = assignments.filter(a => {
      return day.isSame(moment(a.due))
    })

    let dayEntry = {
      day: day.format('X'),
      assignmentCount: dayAssignments.length,
      cumulativeWeights: dayAssignments.reduce((i, a) => i + a.weight, 0)
    }

    allDays.push(dayEntry)

    day = moment(day).add(24, 'hours')
  }

  let assignmentCountPercentile, cumulativeWeightPercentile
  let allPossiblePeriods = []
  allDays.forEach(d => {
    let period = []
    for (let i = 0; i < (nDays + 1); i++) {
      let day = allDays[allDays.indexOf(d) + i]
      if (day) {
        period.push(day)
      } else {
        period.push({
          day: null,
          assignmentCount: 0,
          cumulativeWeights: 0
        })
      }
    }

    let periodAssignmentCount = period.reduce((i, d) => i + d.assignmentCount, 0)
    let periodCumWeights = period.reduce((i, d) => i + d.cumulativeWeights, 0)

    allPossiblePeriods.push({periodAssignmentCount, periodCumWeights})
  })

  let allPossiblePeriodsCumulativeWeights = allPossiblePeriods.map(w => w.periodCumWeights)
  let allPossiblePeriodsAssignmentCount = allPossiblePeriods.map(w => w.periodAssignmentCount)

  let periodAssignments = assignments.filter(a => {
    let diff = moment(a.due).diff(today, 'days')
    return diff < nDays && diff > 0
  })

  assignmentCountPercentile = percentile(allPossiblePeriodsAssignmentCount, periodAssignments.length)
  cumulativeWeightPercentile = percentile(allPossiblePeriodsCumulativeWeights, periodAssignments.reduce((i, a) => i + a.weight, 0))

  /*
  The intensity score is the percentile rank of the cumulative weights plus the percentile rank
  of the total assignment count for the 7-day (or 30 day) period starting today against all possible
  7-day (or 30 day) periods, divided by two (so that the highest possible score is 1). The square root
  is then taken, and the result is multiplied by 10 to put it on a 1 to 10 scale. The square root
  serves the psychological purpose of elevating lower-ranked weeks, so weeks with no assignments
  seem especially easy and weeks around the median will score in the range of 6-8.
  */

  let intensityScore = Math.round((((assignmentCountPercentile / 100 + cumulativeWeightPercentile / 100) / 2) ** 0.5) * 100) / 10

  if (isNaN(intensityScore)) {
    intensityScore = 0
  }
  return intensityScore
}

export function optionalPlural (array, string, replaceWith) {
  let n = 0
  if (Array.isArray(array)) {
    n = array.length
  } else {
    n = array
  }

  const sRegExp = /@/g
  const nRegExp = /#/g
  const xsRegExp = /%/g
  let replacement
  let inverseReplacement
  if (!replaceWith) {
    replacement = n === 1 ? '' : 's'
    inverseReplacement = n === 1 ? 's' : ''
  } else {
    replacement = n === 1 ? '' : replaceWith
    inverseReplacement = n === 1 ? 's' : ''
  }

  return string.replace(sRegExp, replacement).replace(nRegExp, n).replace(xsRegExp, inverseReplacement)
}

export async function asyncForEach (array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}
