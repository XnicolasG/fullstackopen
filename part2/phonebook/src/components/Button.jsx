import React from 'react'

export const Button = ({ deleteData}) => {
  return (
    <button
    onClick={deleteData}
    >
        Delete
    </button>
  )
}
