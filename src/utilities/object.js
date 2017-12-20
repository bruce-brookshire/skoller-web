/*
* Check to see if key is the first key in the object. Useful for form error.
*
* @param [Object] obj. Object to check
* @param [String] key. Key to checkError
* @return [Bool]. If the key is the first key in the object.
*/
export function checkIfFirstKey (obj, key) {
  const keys = Object.keys(obj)
  return keys.length > 0 && keys[0] === key
}
