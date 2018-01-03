export function maskPhoneNumber (oldPhoneNumber, newPhoneNumber) {
    let formatedPhoneNumber = newPhoneNumber
	if (newPhoneNumber.length > oldPhoneNumber.length) {
		switch (newPhoneNumber.length) {
			case 3:
				formatedPhoneNumber = newPhoneNumber + "-";
				break
			case 7: 
				formatedPhoneNumber = newPhoneNumber + "-";
				break
			default:
				break
		}
    }
    return formatedPhoneNumber
}