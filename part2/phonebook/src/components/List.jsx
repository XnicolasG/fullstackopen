import React from 'react'

export const List = ({nameList}) => {
  console.log('List', nameList);
  return (
    <ul>
        {
          nameList.length < 1 
          ? <p>Loading ...</p>
          :nameList.map(person => (
            <li key={person.id} style={{ display: 'flex', gap: '8px' }}>
              <p >{person.name}</p>
              <p>{person.number}</p>
            </li>
          ))
        }
      </ul>
  )
}
