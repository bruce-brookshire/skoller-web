import React from 'react'
export default function UpgradeToPremiumBtn (props) {
  return (
    <button style={{
      borderRadius: '3px',
      backgroundColor: '#57B9E4',
      outline: 'none',
      border: 'none',
      color: '#fff',
      cursor: 'pointer',
      fontWeight: 700,
      margin: '5px 0',
      padding: '10px 25px',
      filter: 'drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.5))'
    }}
    onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}
