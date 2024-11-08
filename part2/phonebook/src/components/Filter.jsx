import React from 'react'

export const Filter = ({filteredName, handleFilter}) => {
    return (
        <section>
            <article>
                <label htmlFor="search">filter shown with </label>
                <input
                    placeholder='My Mom'
                    value={filteredName}
                    onChange={handleFilter}
                    id="search" />
            </article>
        </section>
    )
}
