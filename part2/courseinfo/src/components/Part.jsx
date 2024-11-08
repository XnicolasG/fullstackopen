import React from 'react'

export const Part = ({ content }) => {
    const total = content.reduce((sum, acc) => sum + acc.exercises, 0)
    return (
        <ul  style={{ listStyle: 'none' }}>
            {
                content.map((cont) => (
                    <li key={cont.id} style={{ display: 'flex', gap: '6px' }}>
                        <p>{cont.name}</p>
                        <p>{cont.exercises}</p>
                    </li>
                ))
            }
            <li>
                <strong>
                    {`Total of ${total} execrises`}
                </strong>
            </li>
        </ul>
    )
}
