import React from 'react'

export default function TH (props) {
  return (
    <th scope="col" >
      <span>{props.title}</span>
      <button
        onClick={props.onClick}
        style={{
          cursor: 'pointer',
          background: 'none',
          outline: 'none',
          border: 'none'
        }}
      >
        <i className={props.icon} style={{color: 'white'}}/>
      </button>
    </th>
  )
}
