
export const NoteForm = ({
    handleAdd,
    newNote,
    handleNoteChange
}) => {
  return (
    <form onSubmit={handleAdd} >
      <input
        value={newNote}
        onChange={handleNoteChange}
      />
      <button type="submit">
        save
      </button>
    </form>
  )
}
