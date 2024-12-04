import React from 'react'

export const AddForm = ({
    handleAdd,
    handleNameChange,
    newName,
    handleNumberChange,
    newNumber
}) => {
    return (
        <form
            onSubmit={handleAdd}
        >
            <div>
                name: <input
                    onChange={handleNameChange}
                    value={newName}
                    required
                />
            </div>
            <div>
                number: <input
                    onChange={handleNumberChange}
                    value={newNumber}
                    placeholder='example: 12-345678'
                    required
                />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}
