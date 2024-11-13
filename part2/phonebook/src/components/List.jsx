import React from 'react'
import { Button } from './Button';
import phonebook from '../services/phonebook'

export const List = ({ handleDelete,nameList }) => {
  
  console.log('List', nameList);
  return (
    <ul>
      {
        nameList.length < 1
          ? <p>Loading ...</p>
          : nameList.map(person => (
            <li key={person.id} style={{ display: 'flex', gap: '8px' }}>
              <p >{person.name}</p>
              <p>{person.number}</p>
              <Button deleteData={() => handleDelete({name:person.name,id:person.id})} />
            </li>
          ))
      }
    </ul>
  )
}
