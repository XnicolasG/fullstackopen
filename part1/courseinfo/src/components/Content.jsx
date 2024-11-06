import React from 'react'

const Parts = ({ parts }) => {
    return (
        <span>{parts}</span>
    )
}
export const Content = ({parts}) => {
    const partNames = []
    parts.forEach(part => {
      const {name} = part
      console.log(name);
      partNames.push(name)
    });
    console.log(partNames);
    
    return (
        <div style={{display:'inline-flex', flexDirection:'column'}}>
            <Parts parts={partNames[0]} />
            <Parts parts={partNames[1]} />
            <Parts parts={partNames[2]} />
        </div>
    )
}
