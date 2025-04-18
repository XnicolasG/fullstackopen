import React from 'react'

export const Message = ({ message }) => {
   
return (
    <section>
        {
            message.error 
            ? <p className='text-red-500'>{message.error}</p>
            : message.success
            ? <p className='text-emerald-500'>{message.success}</p>
            : <></>
        }
    </section>
)
}
