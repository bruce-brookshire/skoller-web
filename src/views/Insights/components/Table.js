import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

@observer
class Table extends React.Component {
  renderHeader (d, i) {
    let colSpan = null
    let rowSpan = null
    if (d && d.props) {
      colSpan = d.props.colSpan ? d.props.colSpan : null
      rowSpan = d.props.rowSpan ? d.props.rowSpan : null
    }

    return (
      <th className={this.props.stickyHeader ? 'sticky' : null} key={i} colSpan={colSpan} rowSpan={rowSpan}>
        {d ? d.children ? d.children : d : null}
      </th>
    )
  }

  renderData (d, i) {
    let colSpan = null
    let rowSpan = null
    if (d && d.props) {
      colSpan = d.props.colSpan ? d.props.colSpan : null
      rowSpan = d.props.rowSpan ? d.props.rowSpan : null
    }

    return (
      <td key={i} colSpan={colSpan} rowSpan={rowSpan}>
        {d ? d.children ? d.children : d : null}
      </td>
    )
  }

  render () {
    let {headers, data} = this.props

    // this allows header prop to be a single array, or an array of arrays is there are multiple tr in a header
    if (!Array.isArray(headers[0])) {
      headers = [headers]
    }

    return (
      <table className={'si-table' + (this.props.className ? (' ' + this.props.className) : '')}>
        <thead className={this.props.stickyHeader ? 'sticky' : null}>
          {headers.map(d => {
            let i = headers.indexOf(d)
            return (
              <tr key={i}>
                {d.map(datum => {
                  let i = d.indexOf(datum)
                  return this.renderHeader(datum, i)
                })}
              </tr>
            )
          })}
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
  className: PropTypes.string,
  stickyHeader: PropTypes.bool
}

export default Table
