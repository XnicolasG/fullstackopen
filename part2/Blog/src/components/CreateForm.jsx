import React, { useState } from 'react'

export const CreateForm = ({ handleAdd }) => {
    const [values, setValues] = useState(
        {
            title: '',
            author: '',
            url: ''
        }
    )
    // console.warn(create );
    
    const handleChange = (e, field) => {
        const { value } = e.target
        setValues({
            ...values,
            [field]: value
        })
    }


    return (
        <form
        onSubmit={(e) => handleAdd(e, values, setValues)}
            className='flex flex-col gap-2 m-4'
        >
            {
                Object.keys(values).map((field) =>
                    <div 
                    key={field}
                    className='flex gap-2'>
                        <p className='w-14'>{field}</p>
                        <input
                            className="login__input"
                            value={values[field]}
                            onChange={(e) => handleChange(e,field)}
                            required
                        />
                    </div>
                )
            }
            <button className=' w-26'>create</button>
        </form>
    )
}
