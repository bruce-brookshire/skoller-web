import moment from 'moment'

export function getAssignmentCountData (studentAssignmentsStore, cl = false, ids = [], grouping = 'w') {
  let data = []

  let assignments = cl ? studentAssignmentsStore.assignments.filter(a => a.class_id === cl.id) : studentAssignmentsStore.assignments.filter(a => ids.length > 0 ? ids.includes(a.class_id) : true)
  let firstAssignment = Math.min.apply(Math, assignments.map(a => parseInt(moment(a.due).format('X'))))
  let lastAssignment = Math.max.apply(Math, assignments.map(a => parseInt(moment(a.due).format('X'))))

  switch (grouping) {
    case 'w':
      let firstWeek = moment(firstAssignment, 'X').startOf('week')
      let lastWeek = moment(lastAssignment, 'X').startOf('week').add(7, 'days')

      let weeks = []
      while (firstWeek.isBefore(lastWeek)) {
        weeks.push({week: moment(firstWeek), assignments: []})
        firstWeek.add(7, 'days')
      }

      assignments.forEach(assignment => {
        weeks.forEach(w => {
          if (moment(assignment.due).isSame(moment(w.week), 'week')) {
            w.assignments.push(assignment)
          }
        })
      })

      weeks.forEach(w => {
        data.push({x: parseInt(moment(w.week).format('X')), y: w.assignments.length})
      })
      break

    case 'd':
      let firstDay = moment(firstAssignment, 'X').startOf('day')
      let lastDay = moment(lastAssignment, 'X').startOf('day')

      let days = []
      while (firstDay.isBefore(lastDay) || firstDay.isSame(lastDay, 'day')) {
        days.push({day: moment(firstDay), assignments: []})
        firstDay.add(1, 'days')
      }

      assignments.forEach(assignment => {
        days.forEach(d => {
          if (moment(assignment.due).isSame(moment(d.day), 'day')) {
            d.assignments.push(assignment)
          }
        })
      })

      days.forEach(d => {
        data.push({x: parseInt(moment(d.day).format('X')), y: d.assignments.length})
      })
      break

    case 'm':
      let firstMonth = moment(firstAssignment, 'X').startOf('month')
      let lastMonth = moment(lastAssignment, 'X').startOf('month')

      let months = []
      while (firstMonth.isBefore(lastMonth) || firstMonth.isSame(lastMonth, 'month')) {
        months.push({month: moment(firstMonth), assignments: []})
        firstMonth.add(1, 'months')
      }

      assignments.forEach(assignment => {
        months.forEach(m => {
          if (moment(assignment.due).isSame(moment(m.month), 'month')) {
            m.assignments.push(assignment)
          }
        })
      })

      months.forEach(m => {
        data.push({x: parseInt(moment(m.month).format('X')), y: m.assignments.length})
      })
      break
  }

  return data
}

export function getAssignmentWeightData (studentAssignmentsStore, cl = false, ids = [], grouping = 'w') {
  let assignments = cl ? studentAssignmentsStore.assignments.filter(a => a.class_id === cl.id) : studentAssignmentsStore.assignments.filter(a => ids.length > 0 ? ids.includes(a.class_id) : true)
  let data = []
  let firstAssignment = Math.min.apply(Math, assignments.map(a => parseInt(moment(a.due).format('X'))))
  let lastAssignment = Math.max.apply(Math, assignments.map(a => parseInt(moment(a.due).format('X'))))

  function getViewWeights (d, totalWeights) {
    let weights = 0
    d.assignments.forEach(a => {
      weights += a.weight
    })
    return (weights / totalWeights)
  }
  switch (grouping) {
    case 'w':
      let firstWeek = moment(firstAssignment, 'X').startOf('week')
      let lastWeek = moment(lastAssignment, 'X').startOf('week').add(7, 'days')

      let weeks = []
      while (firstWeek.isBefore(lastWeek)) {
        weeks.push({week: moment(firstWeek), assignments: []})
        firstWeek.add(7, 'days')
      }

      assignments.forEach(assignment => {
        weeks.forEach(w => {
          if (moment(assignment.due).isSame(moment(w.week), 'week')) {
            w.assignments.push(assignment)
          }
        })
      })

      let totalWeekWeights = 0
      assignments.forEach(a => {
        totalWeekWeights += a.weight
      })

      weeks.forEach(w => {
        data.push({
          x: parseInt(moment(w.week).format('X')),
          y: getViewWeights(w, totalWeekWeights)
        })
      })
      break

    case 'd':
      let firstDay = moment(firstAssignment, 'X').startOf('day')
      let lastDay = moment(lastAssignment, 'X').startOf('day')

      let days = []
      while (firstDay.isBefore(lastDay) || firstDay.isSame(lastDay, 'lastDay')) {
        days.push({day: moment(firstDay), assignments: []})
        firstDay.add(1, 'days')
      }

      assignments.forEach(assignment => {
        days.forEach(d => {
          if (moment(assignment.due).isSame(moment(d.day), 'day')) {
            d.assignments.push(assignment)
          }
        })
      })

      let totalDayWeights = 0
      assignments.forEach(a => {
        totalDayWeights += a.weight
      })

      days.forEach(d => {
        data.push({
          x: parseInt(moment(d.day).format('X')),
          y: getViewWeights(d, totalDayWeights)
        })
      })
      break

    case 'm':
      let firstMonth = moment(firstAssignment, 'X').startOf('month')
      let lastMonth = moment(lastAssignment, 'X').startOf('month')

      let months = []
      while (firstMonth.isBefore(lastMonth) || firstMonth.isSame(lastMonth, 'month')) {
        months.push({month: moment(firstMonth), assignments: []})
        firstMonth.add(1, 'month')
      }

      assignments.forEach(assignment => {
        months.forEach(m => {
          if (moment(assignment.due).isSame(moment(m.month), 'month')) {
            m.assignments.push(assignment)
          }
        })
      })

      let totalMonthWeights = 0
      assignments.forEach(a => {
        totalMonthWeights += a.weight
      })

      months.forEach(m => {
        data.push({
          x: parseInt(moment(m.month).format('X')),
          y: getViewWeights(m, totalMonthWeights)
        })
      })
      break
  }

  return data
}

export function getWeightDistribution (studentAssignmentsStore, cl = false, ids = [], grouping = 'w') {
  let assignments = cl ? studentAssignmentsStore.assignments.filter(a => a.class_id === cl.id) : studentAssignmentsStore.assignments.filter(a => ids.length > 0 ? ids.includes(a.class_id) : true)
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
