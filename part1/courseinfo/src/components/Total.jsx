import React from 'react'

export const Total = ({ parts }) => {
    const partExercises = []
    parts.forEach(part => {
        const { exercises } = part
        console.log(exercises);
        partExercises.push(exercises)
    });
    console.log(partExercises);
    return (
        <div style={{ marginInline: '8px', display: 'inline-flex', flexDirection:'column' }}>
            {
                partExercises.map(exercise => 
                    <span key={exercise}>
                        {exercise}
                    </span>
                )
            }
        </div>
    )
}
