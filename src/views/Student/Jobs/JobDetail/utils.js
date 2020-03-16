import React from 'react'
import NumberFormat from 'react-number-format'

export function renderWorkHours (job) {
  if (job.work_hours !== 'Not Specified') {
    return (
      <p>{job.work_hours}</p>
    )
  } else {
    return null
  }
}

export function renderSalary (job) {
  if (job.salary_minimum && job.salary_maximum) {
    return (
      <p>
        | <NumberFormat value={job.salary_minimum} displayType={'text'} thousandSeparator={true} prefix={'$'} /> - <NumberFormat value={job.salary_maximum} displayType={'text'} thousandSeparator={true} prefix={'$'} />
      </p>
    )
  } else {
    return null
  }
}

export function renderLocation (job) {
  if (job.locality !== 'Not Specified' && job.region !== 'Not Specified') {
    return (
      <p>{job.locality}, {job.region}</p>
    )
  } else if (job.region !== 'Not Specified') {
    return (
      <p>{job.region}</p>
    )
  } else {
    return null
  }
}
