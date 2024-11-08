import React from 'react'

export const List = ({nameList}) => {
  return (
    <ul>
        {
          nameList.map(person => (
            <li key={person.id} style={{ display: 'flex', gap: '8px' }}>
              <p >{person.name}</p>
              <p>{person.number}</p>
            </li>
          ))
        }
      </ul>
  )
}
