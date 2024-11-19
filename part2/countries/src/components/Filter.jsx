import React from 'react'

export const Filter = ({ chooseCountry,setChooseCountry, country, handleInputChange }) => {
  const goBack = e => {
    e.preventDefault()
    setChooseCountry('')
  }
  return (
    <section style={{ display: 'flex', alignItems:'center', gap: '8px' }}>
      <label htmlFor="search">Find countries</label>
      <input value={country} onChange={handleInputChange} />
      <button
      className={`${chooseCountry.length > 0 ? 'message': 'hidden'}`}
      onClick={goBack}
      >x
      </button>
    </section>
  )
}
