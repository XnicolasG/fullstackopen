import React from 'react'

export const Blog = ({ blogItem,handleLikes,handleDelete }) => {

    
    return (
        <li
            className='flex flex-col gap-2 hover:text-sky-500 cursor-pointer'
            key={blogItem.id}>
            <p>Url: {blogItem?.url} </p>
            <p> 
                Likes: {blogItem.likes} 
                <button 
                className='mx-2'
                onClick={handleLikes}
                >♥️</button>
                 </p>
            <p>Author: {blogItem.author ? blogItem.author : 'Annonimus' }</p>
            <button onClick={handleDelete} >Delete</button>
        </li>
    )
}
