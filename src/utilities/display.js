import React from 'react'
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

export function roundToTwo (val) {
  return +(Math.round(val + "e+2")  + "e-2");
}

/*
* Highlight matching text.
*
* @param [String] text. The text to highlight with the search text.
*/
export function matchText (text, searchText) {
  const re = new RegExp(`${searchText}(.*$)`, 'i')
  const output = re.exec(text)

  if (output && output.index >= 0 && text && text.length > 0 && text !== 'TBA') {
    let first = text.substring(0, output.index)
    let middle = text.substring(output.index, searchText.length + output.index)
    let last = text.substring(searchText.length + output.index, text.length)

    return (
      <div>
        <span>{first}</span>
        <span className='cn-blue'>{middle}</span>
        <span>{last}</span>
      </div>
    )
  }

  return text
}
