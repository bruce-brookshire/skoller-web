/*
* Mask phone number
*
* @param [String] oldPhoneNumber. The previous user input.
* @param [String] newPhoneNumber. The new user input.
* @return [String] formatedPhoneNumber. The masked phone number.
*/
export function maskPhoneNumber (oldPhoneNumber, newPhoneNumber) {
  const newNumber = newPhoneNumber.replace(/[^\d-]/g, '')
  if (newNumber.length > 12) return oldPhoneNumber
  let formatedPhoneNumber = newNumber
  if (newNumber.length > oldPhoneNumber.length) {
    switch (newNumber.length) {
      case 3:
        formatedPhoneNumber = newNumber + '-'
        break
      case 4:
        if (newNumber[3] !== '-') {
          formatedPhoneNumber = `${newNumber.slice(0, 3)}-${newNumber[3]}`
        }
        break
      case 7:
        formatedPhoneNumber = newNumber + '-'
        break
      case 8:
        if (newNumber[7] !== '-') {
          formatedPhoneNumber = `${newNumber.slice(0, 7)}-${newNumber[7]}`
        }
        break
      default:
        break
    }
  }
  return formatedPhoneNumber
}

export function maskTime(oldTime, newTime) {
  const time = newTime.replace(/[^\d:](am|pm)/g, '')
  if (time.length > 7) return oldTime
  let formattedTime = time.toLowerCase()
  if (formattedTime.length > oldTime.length) {
    switch (formattedTime.length) {
      case 1:
        if (formattedTime[0] != '0' && formattedTime[0] != '1') {
          formattedTime = '0' + formattedTime;
        }
        break
      case 2:
        if (formattedTime[0] == '1' && (formattedTime[1] != '0' && formattedTime[1] != '1' && formattedTime[1] != '2')){
          formattedTime = '0' + formattedTime;
        } else {
          formattedTime = formattedTime + ':'
          break
        }
      case 3:
        if (formattedTime[2] != ':') {
          formattedTime = `${formattedTime.slice(0, 2)}:${formattedTime[2]}`
        }
        break
      case 5:
        if(formattedTime[4] == 'a' || formattedTime[4] == 'p') {
          formattedTime = '0' + formattedTime;
        }
      default:
        break
    }
    if (formattedTime[3] == ':') {
      formattedTime = `${formattedTime.slice(0, 2)}:${formattedTime[2]}${formattedTime.slice(4, formattedTime.length)}`
    }
  }
  return formattedTime
}

/*
* Mask assignment date
*
* @param [String] oldDate. The previous user input.
* @param [String] newDate. The new user input.
* @return [String] formattedDate. The masked phone number.
*/
export function maskAssignmentDate (oldDate, newDate) {
  const date = newDate.replace(/[^\d/]/g, '')
  if (date.length > 5) return oldDate
  let formattedDate = date
  if (date.length > oldDate.length) {
    switch (date.length) {
      case 2:
        formattedDate = date + '/'
        break
      case 3:
        if (date[2] !== '/') {
          formattedDate = `${date.slice(0, 2)}/${date[2]}`
        }
        break
      default:
        break
    }
  }
  return formattedDate
}
