import { useState } from 'react'

const Title = ({title}) => {
  return <h1>{title}</h1>
}

const Button =({text, handleClick})=> {
  return (
    <button 
    onClick={handleClick}
    style={{marginInline:'4px'}}>
      {text}
    </button>
  )
}

const Statitics = ({text, state}) => {
  return (
    <div style={{display:'flex', gap:'6px'}}>
      <p>{text}</p>
      <p>{state}</p>
    </div>
  )
}

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const handleGood = () => {
    setGood(good + 1)
  }
  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }
  const handleBad = () => {
    setBad(bad + 1)
  }
  return (
    <div>
      <Title title={'give feedback'} />
      <Button handleClick={handleGood} text='good' />
      <Button handleClick={handleNeutral} text='neutral' />
      <Button handleClick={handleBad} text='bad' />
      <Title title={'Satistics'} />
      <Statitics state={good} text='good' />
      <Statitics state={neutral} text='neutral' />
      <Statitics state={bad} text='bad' />
    </div>
  )
}

export default App
