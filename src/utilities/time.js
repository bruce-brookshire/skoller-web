import moment from 'moment-timezone'

export function mapTimeToDisplay (timeString) {
  const time = timeString.split(':')
  const h = parseInt(time[0])
  const hours = (addZero(h) % 12) || 12
  const min = addZero(parseInt(time[1]))
  const meridiem = getMeridiem(h)

  if (!isNaN(min)) {
    return `${hours}:${min}${meridiem.toLowerCase()}`
  } else {
    return ''
  }
}

/*
* Convert utc date time to local date
*
* @param [Date] dateTime. Date time. YYYY-MM-DDTHH:MM:ss
* @param [String] tzAbbr. Abbreviation of timezone, i.e. PST
* @param [String] YYYY-MM-DD
*/
export function convertUTCDatetimeToDateString (dateTime, tz) {
  const d = moment.tz(dateTime, tz).format('YYYY-MM-DD')
  return d
}

/*
* Convert utc date time to local datetime
*
* @param [Date] dateTime. Date time. YYYY-MM-DDTHH:MM:ss
* @param [String] tzAbbr. Abbreviation of timezone, i.e. PST
* @param [String] YYYY-MM-DD
*/
export function convertUTCDatetimeToDateTimeString (dateTime, tz) {
  const d = moment.tz(dateTime, tz).parseZone().format('ddd, MMM Do YYYY [at] h:mm a')
  return d
}

/*
* Convert utc time to local time
*
* @param [Date] dateTime. Date time. HH:MM:ss.SSSSSS
* @param [String] tzAbbr. Abbreviation of timezone, i.e. PST
*/
export function convertUTCTimeToTimeString (dateTime, tz) {
  const d = moment.tz(dateTime, 'HH:mm:ss.SSSSSS', tz).parseZone().format('HH:mm')
  return d
}

/*
* Convert local date to utc time.
*
* @param [String] dateString. The datestring to convert. YYYY-MM-DD
* @param [String] tzAbbr. Abbreviation of timezone, i.e. PST
* @return [Date]. Date time. YYYY-MM-DDTHH:MM:ss
*/
export function convertLocalDateToUTC (dateString, tz) {
  const d = moment.tz(dateString, tz).format()
  return d
}

export function formatDate (dateString) {
  return moment(dateString, 'YYYY-MM-DD').format('MMMM Do YYYY')
}

export function wrapTimeHour (date, hour) {
  let offsetHour = hour + (date.getTimezoneOffset() / 60)
  if (offsetHour >= 24) {
    offsetHour -= 24
  }
  if (offsetHour < 10) {
    offsetHour = '0' + offsetHour
  }
  return offsetHour
}

/*
* Add a zero to the beginnig of an integer if its less than 10.
*
* @param [Number] i. Number to add zero to.
* @return [String]. Formatted number.
*/
export function addZero (i) {
  i = parseInt(i)
  if (i < 10) { i = '0' + i }
  return i
}

/*
* Utility function for getting time of day.
*
* @param [int] hour. Hour between 1 and 23.
* @return [string]. am or pm.
*/
export function getMeridiem (hour) {
  return hour >= 12 ? 'pm' : 'am'
}
