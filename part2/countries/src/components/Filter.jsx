import React from 'react'

export const Filter = ({country,handleInputChange}) => {
  return (
    <section style={{ display: 'flex', gap: '8px' }}>
        <label htmlFor="search">Find countries</label>
        <input value={country} onChange={handleInputChange} />
      </section>
  )
}
