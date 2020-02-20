import moment from 'moment'

export function getAssignmentCountData (studentAssignmentsStore, cl = false) {
  let data = []
  let assignments = cl ? studentAssignmentsStore.assignments.filter(a => a.class_id === cl.id) : studentAssignmentsStore.assignments
  let firstAssignment = Math.min.apply(Math, assignments.map(a => parseInt(moment(a.due).format('X'))))
  let lastAssignment = Math.max.apply(Math, assignments.map(a => parseInt(moment(a.due).format('X'))))
  let firstWeek = moment(firstAssignment, 'X').startOf('week')
  let lastWeek = moment(lastAssignment, 'X').startOf('week').add(7, 'days')

  let weeks = []
  while (firstWeek.isBefore(lastWeek)) {
    weeks.push({week: moment(firstWeek), assignments: []})
    firstWeek.add(7, 'days')
  }

  if (cl) {
    assignments.forEach(assignment => {
      weeks.forEach(w => {
        if (moment(assignment.due).isSame(moment(w.week), 'week') && (assignment.class_id === cl.id)) {
          w.assignments.push(assignment)
        }
      })
    })
  } else {
    assignments.forEach(assignment => {
      weeks.forEach(w => {
        if (moment(assignment.due).isSame(moment(w.week), 'week')) {
          w.assignments.push(assignment)
        }
      })
    })
  }

  weeks.forEach(w => {
    data.push({x: parseInt(moment(w.week).format('X')), y: w.assignments.length})
  })

  return data
}

export function getAssignmentWeightData (studentAssignmentsStore, cl = false) {
  let assignments = cl ? studentAssignmentsStore.assignments.filter(a => a.class_id === cl.id) : studentAssignmentsStore.assignments
  let data = []
  let firstAssignment = Math.min.apply(Math, assignments.map(a => parseInt(moment(a.due).format('X'))))
  let lastAssignment = Math.max.apply(Math, assignments.map(a => parseInt(moment(a.due).format('X'))))
  let firstWeek = moment(firstAssignment, 'X').startOf('week')
  let lastWeek = moment(lastAssignment, 'X').startOf('week').add(7, 'days')

  let weeks = []
  while (firstWeek.isBefore(lastWeek)) {
    weeks.push({week: moment(firstWeek), assignments: []})
    firstWeek.add(7, 'days')
  }

  if (cl) {
    assignments.forEach(assignment => {
      weeks.forEach(w => {
        if (moment(assignment.due).isSame(moment(w.week), 'week') && (assignment.class_id === cl.id)) {
          w.assignments.push(assignment)
        }
      })
    })
  } else {
    assignments.forEach(assignment => {
      weeks.forEach(w => {
        if (moment(assignment.due).isSame(moment(w.week), 'week')) {
          w.assignments.push(assignment)
        }
      })
    })
  }

  let totalWeights = 0
  assignments.forEach(a => {
    totalWeights += a.weight
  })

  function getWeekWeights (week) {
    let weights = 0
    week.assignments.forEach(a => {
      weights += a.weight
    })
    return (weights / totalWeights)
  }

  weeks.forEach(w => {
    data.push({
      x: parseInt(moment(w.week).format('X')),
      y: getWeekWeights(w)
    })
  })

  return data
}

export function getWeightDistribution (studentAssignmentsStore, cl = false) {
  let assignments = cl ? studentAssignmentsStore.assignments.filter(a => a.class_id === cl.id) : studentAssignmentsStore.assignments
  let low = 0
  let medium = 0
  let high = 0
  assignments.forEach(assignment => {
    if (assignment.weight < 0.05) {
      low += 1
    } else if (assignment.weight < 0.15) {
      medium += 1
    } else {
      high += 1
    }
  })

  let count = low + medium + high

  return {
    data: [
      { x: 'High', y: high },
      { x: 'Medium', y: medium },
      { x: 'Low', y: low }
    ],
    count
  }
}
