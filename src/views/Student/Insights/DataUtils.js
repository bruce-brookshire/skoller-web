import { toJS } from 'mobx'
import moment from 'moment'

export function getAssignmentCountData (a, cl = false, ids = [], grouping = 'w') {
  let data = []

  let assignments = cl ? a.filter(a => a.class_id === cl.id) : a.filter(a => ids.length > 0 ? ids.includes(a.class_id) : true)
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

export function getAssignmentCountDataHomeGraph (a, cl = false, ids = [], grouping = 'w') {
  let data = []

  let assignments = cl ? a.filter(a => a.class_id === cl.id) : a.filter(a => ids.length > 0 ? ids.includes(a.class_id) : true)
  let firstAssignment = Math.min.apply(Math, assignments.map(a => parseInt(moment(a.due).format('X'))))
  let lastAssignment = Math.max.apply(Math, assignments.map(a => parseInt(moment(a.due).format('X'))))

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
    data.push({x: parseInt(moment(w.week).format('X')), y: w.assignments.length, allAssignment: w.assignments})
  })

  return data
}

export function getAssignmentCountDataByClass (studentAssignmentsStore, cl = false, ids = [], grouping = 'w') {
  let data = {d: [], ids: []}
  let classData = {}

  let assignments = cl ? studentAssignmentsStore.assignments.filter(a => a.class_id === cl.id) : studentAssignmentsStore.assignments.filter(a => ids.length > 0 ? ids.includes(a.class_id) : true)
  let firstAssignment = Math.min.apply(Math, assignments.map(a => parseInt(moment(a.due).format('X'))))
  let lastAssignment = Math.max.apply(Math, assignments.map(a => parseInt(moment(a.due).format('X'))))

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

  ids.forEach(id => {
    classData[id] = {data: []}
    weeks.forEach(w => {
      let datum = {x: parseInt(moment(w.week).format('X')), y: null}
      let assignmentCount = 0
      let classAssignments = w.assignments.filter(a => a.class_id === id)
      classAssignments.forEach(a => {
        if (w.assignments.includes(a)) {
          assignmentCount += 1
        }
      })
      datum.y = assignmentCount
      classData[id].data.push(datum)
    })
  })

  weeks.forEach(w => {
    data.d.push({x: parseInt(moment(w.week).format('X')), y: w.assignments.length})
  })

  return {data: data.d, classData}
}

export function modifiedGetAssignmentWeightData (a, cl = false, ids = [], grouping = 'w', primaryPeriod) {
//   console.log('frommodified', {primaryPeriod: toJS(primaryPeriod)})
  let assignments = cl ? a.filter(a => a.class_id === cl.id) : a.filter(a => ids.length > 0 ? ids.includes(a.class_id) : true)
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
    //   let firstWeek = moment(firstAssignment, 'X').startOf('week')
    //   let lastWeek = moment(lastAssignment, 'X').startOf('week').add(7, 'days')
    //   console.log('below is from modified get')
    //   console.log({firstAssignment, lastAssignment})
    //   console.log({firstWeek, lastWeek})
      const firstWeek = moment(primaryPeriod.start_date).startOf('week')
      const lastWeek = moment(primaryPeriod.end_date).startOf('week').add(7, 'days')
      //   let firstWeek = new Date(startDate).getTime()
      //   let lastWeek = new Date(endDate).getTime()

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

export function getAssignmentWeightData (a, cl = false, ids = [], grouping = 'w') {
  let assignments = cl ? a.filter(a => a.class_id === cl.id) : a.filter(a => ids.length > 0 ? ids.includes(a.class_id) : true)
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

export function getWeightDistribution (a, cl = false, ids = [], grouping = 'w') {
  let assignments = cl ? a.filter(a => a.class_id === cl.id) : a.filter(a => ids.length > 0 ? ids.includes(a.class_id) : true)
  let zero = 0
  let low = 0
  let medium = 0
  let high = 0
  assignments.forEach(assignment => {
    if (assignment.weight === 0) {
      zero += 1
    } else if (assignment.weight < 0.05) {
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
      { x: 'Low', y: low },
      { x: 'Zero', y: zero }
    ],
    count
  }
}

function percentRank (array, n) {
  var L = 0
  var S = 0
  var N = array.length

  for (var i = 0; i < array.length; i++) {
    if (array[i] < n) {
      L += 1
    } else if (array[i] === n) {
      S += 1
    } else {

    }
  }

  var pct = (L + (0.5 * S)) / N

  return pct
}

export function getKeyInsights (studentAssignmentsStore, ids = []) {
  let assignments = studentAssignmentsStore.assignments.filter(a => ids.length > 0 ? ids.includes(a.class_id) : true)

  let firstAssignment = Math.min.apply(Math, assignments.map(a => parseInt(moment(a.due).format('X'))))
  let lastAssignment = Math.max.apply(Math, assignments.map(a => parseInt(moment(a.due).format('X'))))

  let firstWeek = moment(firstAssignment, 'X').startOf('week')
  let lastWeek = moment(lastAssignment, 'X').startOf('week').add(7, 'days')

  let allWeeks = []
  while (firstWeek.isBefore(lastWeek)) {
    allWeeks.push(moment(firstWeek).format('MM/DD/YYYY'))
    firstWeek.add(7, 'days')
  }

  let weeks = {}
  assignments.forEach(a => {
    let w = moment(a.due).startOf('week').format('MM/DD/YYYY')
    if (weeks[w]) {
      weeks[w].assignments.push(a)
    } else {
      weeks[w] = {
        assignments: [a]
      }
    }
  })

  allWeeks.forEach(week => {
    if (!weeks[week]) {
      weeks[week] = {assignments: []}
    }
  })

  let weeksArray = Object.keys(weeks)
  let allWeights = 0
  weeksArray.forEach(w => {
    weeks[w].getWeek = () => {
      return w
    }
    weeks[w].totalWeight = 0
    weeks[w].totalAssignments = weeks[w].assignments.length
    weeks[w].assignments.forEach(a => {
      weeks[w].totalWeight += a.weight
    })

    allWeights += weeks[w].totalWeight
  })

  let weeklyWeightArray = weeksArray.map(w => weeks[w].totalWeight)
  let easiestWeeks = allWeeks.map(w => {
    if (percentRank(weeklyWeightArray, weeks[w].totalWeight) <= 0.25 || weeks[w].totalWeight <= 0.01) {
      weeks[w].overallWeight = weeks[w].totalWeight / allWeights
      return weeks[w]
    }
  }).filter(w => w !== undefined)

  let hardestWeekWeight = Math.max.apply(Math, weeksArray.map(w => weeks[w].totalWeight))
  let hardestWeekTotalWeight = Math.max.apply(Math, weeksArray.map(w => weeks[w].totalWeight)) / allWeights
  let hardestWeeks = weeksArray.filter((w) => weeks[w].totalWeight === hardestWeekWeight).map(w => weeks[w])
  let busiestWeekCount = Math.max.apply(Math, weeksArray.map(w => weeks[w].totalAssignments))
  let busiestWeeks = weeksArray.filter((w) => weeks[w].assignments.length === busiestWeekCount).map(w => weeks[w])

  let keyInsights = {
    hardestWeeks,
    hardestWeekTotalWeight,
    easiestWeeks
  }

  if (busiestWeeks !== hardestWeeks) {
    keyInsights.busiestWeek = busiestWeeks
  }

  return keyInsights
}

export function getAssignmentWeightDataByClass (studentAssignmentsStore, cl = false, ids = [], grouping = 'w') {
  let assignments = cl ? studentAssignmentsStore.assignments.filter(a => a.class_id === cl.id) : studentAssignmentsStore.assignments.filter(a => ids.length > 0 ? ids.includes(a.class_id) : true)
  let data = {d: [], ids: []}
  let classData = {}
  let firstAssignment = Math.min.apply(Math, assignments.map(a => parseInt(moment(a.due).format('X'))))
  let lastAssignment = Math.max.apply(Math, assignments.map(a => parseInt(moment(a.due).format('X'))))

  let firstWeek = moment(firstAssignment, 'X').startOf('week')
  let lastWeek = moment(lastAssignment, 'X').startOf('week').add(7, 'days')

  let weeks = []
  while (firstWeek.isBefore(lastWeek)) {
    weeks.push({week: moment(firstWeek), assignments: [], weight: 0})
    firstWeek.add(7, 'days')
  }

  assignments.forEach(a => {
    if (classData[a.class_id]) {
      classData[a.class_id].assignments.push(a)
    } else {
      classData[a.class_id] = {assignments: [a]}
    }
  })

  let totalWeights = 0
  assignments.forEach(a => {
    totalWeights += a.weight
    weeks.forEach(w => {
      if (moment(a.due).isSame(moment(w.week), 'week')) {
        w.assignments.push(a)
        w.weight += a.weight
      }
    })
  })

  ids.forEach(id => {
    classData[id] = {data: []}
    weeks.forEach(w => {
      let datum = {x: parseInt(moment(w.week).format('X')), y: null}
      let assignmentWeights = 0
      let classAssignments = w.assignments.filter(a => a.class_id === id)
      classAssignments.forEach(a => {
        if (w.assignments.includes(a)) {
          assignmentWeights += a.weight
        }
      })
      datum.y = assignmentWeights / totalWeights
      classData[id].data.push(datum)
    })
  })

  weeks.forEach(w => {
    data.d.push({x: parseInt(moment(w.week).format('X')), y: w.weight / totalWeights})
  })

  return {data: data.d, classData}

  // weeks.forEach(w => {
  //   data.push({
  //     x: parseInt(moment(w.week).format('X')),
  //     y: getViewWeights(w, totalWeekWeights)
  //   })
  // })

  // return data
}

// styles

export function convertHexToRGBWithOpacity (hexVal, a = 0.5) {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexVal)
  let rgb = result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null

  // Convert all to the rgb equivalent of opacity
  let r = (1 - a) * 255 + a * rgb.r
  let g = (1 - a) * 255 + a * rgb.g
  let b = (1 - a) * 255 + a * rgb.b

  return 'rgba(' + [r, g, b].join(',') + ',1)'
}
