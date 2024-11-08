import React from 'react'
import { Part } from './Part'
import { Header } from './Header'

export const Content = ({ content }) => {
    
    
    return (
        <section>
            {
                content.map((cont) =>{ 
                    console.log(cont.parts);                    
                    return(
                    <article key={cont.id}>
                    <Header title={cont.name}  />
                    <Part content={cont.parts} />
                    </article>
                )})
            }
        </section>
    )
}
