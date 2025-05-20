import React, { useState } from 'react'

export const Blog = ({ blogItem, handleLikes, handleDelete }) => {
    const [visible, setVisible] = useState(false)

    return (
        <li
            className='flex flex-col gap-2 hover:text-sky-500 cursor-pointer'
            key={blogItem.id}>
            <h4 data-testid='blog_title'>{blogItem?.title}</h4>
            <p data-testid='blog_author'>Author: {blogItem.author ? blogItem.author : 'Annonimus'}</p>
            <button data-testid='blog_showbutton' className='w-34 hover:text-white transition-all duration-150' onClick={() => setVisible(!visible)} >
                {!visible ? 'Show details' : 'Hide details'}
            </button>

            {
                visible &&
                <article>
                    <p data-testid='blog_url'>Url: {blogItem?.url} </p>
                    <p data-testid='blog_likes'>
                        Likes: {blogItem.likes}
                        <button
                            data-testid='blog_likebutton'
                            className='mx-2'
                            onClick={handleLikes}
                        >♥️</button>
                    </p>
                </article>
            }
            <button onClick={handleDelete} >Delete</button>
        </li>
    )
}
