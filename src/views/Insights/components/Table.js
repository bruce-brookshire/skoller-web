import React from 'react'
import PropTypes from 'prop-types'

class Table extends React.Component {
  renderHeader (h, i) {
    return (
      <th key={i} colSpan={h.colSpan ? h.colSpan : null}>
        {h.children ? h.children : h}
      </th>
    )
  }

  renderData (d, i) {
    let colSpan = null
    if (d.props) {
      colSpan = d.props.colSpan ? d.props.colSpan : null
    }

    return (
      <td key={i} colSpan={colSpan}>
        {d}
      </td>
    )
  }

  render () {
    const {headers, data} = this.props
    return (
      <table className={'si-table' + (this.props.className ? (' ' + this.props.className) : '')}>
        <thead>
          <tr>
            {headers.map(h => {
              let i = this.props.headers.indexOf(h)
              return this.renderHeader(h, i)
            })}
          </tr>
        </thead>
        <tbody>
          {data.map(d => {
            let i = data.indexOf(d)
            return (
              <tr key={i}>
                {d.map(datum => {
                  let i = d.indexOf(datum)
                  return this.renderData(datum, i)
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
}

Table.propTypes = {
  headers: PropTypes.array,
  data: PropTypes.array,
  className: PropTypes.string
}

export default Table
