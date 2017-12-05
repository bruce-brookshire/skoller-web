/*
* Map the professors name to the professor.
*
* @param [Object] professor. Professor object.
* @param [String] name. Name of professor.
*/
export function mapProfessor (professor) {
  let name = professor.name_first ? `${professor.name_first}` : ''
  if (professor.name_last) {
    name = name ? `${name} ${professor.name_last}` : `${professor.name_last}`
  }
  return name
}
