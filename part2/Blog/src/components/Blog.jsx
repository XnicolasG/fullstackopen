import React from 'react'

export const Blog = ({ blogItem }) => {
    return (
        <li
            className='flex gap-2 hover:text-sky-500 cursor-pointer'
            key={blogItem.id}>
            <p>{blogItem.title} </p>
            <span> ♥️{blogItem.likes} </span>
        </li>
    )
}
