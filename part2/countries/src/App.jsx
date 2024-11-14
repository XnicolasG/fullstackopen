import { useEffect, useState } from 'react'
import axios from 'axios'
import countries from './services/countries'

function App() {
  const [list, setList] = useState([])
  const [country, setCountry] = useState('')
  const { getData } = countries
  console.log(list)

  useEffect(() => {

    getData()
      .then(resp => {
        setList(resp)
      })
  }, [])

  const handleInputChange = e => {
    setCountry((e.target.value).trim())
  }
  const countryList = list?.map(c => c.name.common).filter(name => name.toLowerCase().includes(country.toLowerCase()))

  // details of the country based on search results of countryList
  const countryDetails = countryList.length === 1
    ? list.find(c => c.name.common === countryList[0])
    : null;
  console.log(countryDetails);


  return (
    <main className='main'>
      <section style={{ display: 'flex', gap: '8px' }}>
        <label htmlFor="search">Find countries</label>
        <input value={country} onChange={handleInputChange} />
      </section>
      <section>
        {
          countryList.length > 10
            ?
            (<p className={`${country.length <= 0 ? 'hidden' : 'message'}`} >Too many matches, specify another filter</p>)
            : countryList.length === 1
              ?
              (<div>
                <h2>
                  {countryList[0]}
                </h2>
                <ul>
                  <p>Capital: {countryDetails.capital[0]}</p>
                  <p>Area: {countryDetails.area}</p>
                  <h3>Languages:</h3>
                  <ul>
                    {
                      Object.values(countryDetails.languages).map(lang => (
                        <li key={lang}>
                          {lang}
                        </li>
                      ))
                    }
                  </ul>
                  <figure><img src={Object.values(countryDetails.flags)[0]} alt={countryDetails.name.common} /></figure>
                </ul>
              </div>)
              :
              (<ul>
                {countryList.map(country => (
                  <li key={country}>
                    {country}
                  </li>))}
              </ul>)}
      </section>
    </main >
  )
}

export default App
