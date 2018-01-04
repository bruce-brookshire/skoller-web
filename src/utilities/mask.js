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
