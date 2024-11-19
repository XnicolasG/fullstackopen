import React from 'react'
import { WeatherDetail } from './WeatherDetail'

export const Details = ({ capital, area, languages, flag, name }) => {
    return (
        <section>
            <h2>
                {name}
            </h2>
            <ul>
                <p>Capital: {capital}</p>
                <p>Area: {area}</p>
                <h3>Languages:</h3>
                <ul>
                    {
                        languages.map(lang => (
                            <li key={lang}>
                                {lang}
                            </li>
                        ))
                    }
                </ul>
                <div>
                    <img src={flag} alt={name} />
                </div>
            </ul>
            <WeatherDetail city={capital} />
        </section>
    )
}
