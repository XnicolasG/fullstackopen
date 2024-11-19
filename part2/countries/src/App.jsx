import { useEffect, useState } from 'react'
import { Details } from './components/Details'
import { Filter } from './components/Filter'
import countries from './services/countries'
import weather from './services/weather'

function App() {
  const [list, setList] = useState([])
  const [country, setCountry] = useState('')
  const [chooseCountry, setChooseCountry] = useState('')
  const [activeWeather, setActiveWeather] = useState(false)
  const { getData } = countries
  console.log(country)
  
  
  useEffect(() => {
    getData()
      .then(resp => {
        setList(resp)
      })
    }, [])

  const handleInputChange = e => {
    setCountry((e.target.value).trimStart())
  }
  const handleShow = e => {
    e.preventDefault()
    setChooseCountry(e.target.value);
  }
  console.log(chooseCountry);
  
  const countryList = chooseCountry.length > 0
  ? list.filter(country => country.name.common === chooseCountry)
 : list.map(c => c.name.common).filter(name => name.toLowerCase().includes(country.toLowerCase()))

  // details of the country based on results of countryList
  const countryDetails = chooseCountry.length > 0
  ? countryList.find(c => c.name.common === chooseCountry)
  : list.find(c => c.name.common === countryList[0])
  
  console.log('countryDetails',countryDetails, countryList.length);

  return (
    <main className='main'>
      <Filter chooseCountry={chooseCountry} setChooseCountry={setChooseCountry} country={country} handleInputChange={handleInputChange} />
      <section>
        {
          countryList.length > 10
            ?
            (<p className={`${country.length <= 0 ? 'hidden' : 'message'}`} >Too many matches, specify another filter</p>)
            : countryList.length === 1
              ?
              (
              <Details 
              capital={countryDetails.capital[0]} 
              area={countryDetails.area} 
              languages={Object.values(countryDetails.languages)} 
              flag={Object.values(countryDetails.flags)[0]} 
              name={countryDetails.name.common} />
              )
              :
              (
              <ul>
                {countryList.map(country => (
                  <li style={{display:'flex', alignItems:'center', gap:'6px'}} key={country}>
                    <p>
                    {country}
                    </p>
                    <button
                    onClick={handleShow}
                    value={country}
                    >show</button>
                  </li>))}
              </ul>
            )}
      </section>
    </main >
  )
}

export default App
