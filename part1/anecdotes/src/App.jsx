import { useState } from 'react'

const Buttons = ({text, handleClick}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(5)
  const [votes, setVotes] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0
  })
  console.log(selected);

  const handleQuote = () => {
    const random = Math.floor(Math.random() * anecdotes.length)
    setSelected(random)
    console.log(random);
  }

  const handleVote = () => {
    const turn = selected
    setVotes(prevVotes => {
      return { 
        ...prevVotes,
        [selected]: votes[turn] += 1 
        }
    })    
  }
  console.log('votes outside function',votes);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {anecdotes[selected]}
      <section>
        <Buttons
          handleClick={handleQuote}
          text={'next anecdote'}
        />
        <Buttons 
        handleClick={handleVote}
        text={'vote'}
        />
      </section>
    </div>
  )
}

export default App
