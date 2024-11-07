import { useState } from 'react'

const Title = ({ title }) => {
  return <h1>{title}</h1>
}

const Button = ({ text, handleClick }) => {
  return (
    <button
      onClick={handleClick}
      style={{ marginInline: '4px' }}>
      {text}
    </button>
  )
}

const Statitics = ({ text, state }) => {
  return (
    <div style={{ display: 'flex', gap: '6px' }}>
      <p>{text}</p>
      
        
        <p>{state} {text === 'average' && '%'}</p>
      
    </div>
  )
}

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [score, setScore] = useState([])
  const [average, setAverage] = useState(0)

  const handleGood = () => {
    setScore(prevScore => {
      const newScore = prevScore.concat(1)
      setAverage(newScore.reduce((a, b) => a + b, 0) / newScore.length)
      return newScore
    })
    setTotal(good + neutral + bad + 1)
    setGood(good + 1)
  }
  const handleNeutral = () => {
    setScore(prevScore => {
      const newScore = prevScore.concat(0)
      setAverage(newScore.reduce((a, b) => a + b, 0) / newScore.length)
      return newScore
    });
    setTotal(good + bad + neutral + 1)
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setScore(prevScore => {
      const newScore = prevScore.concat(-1)
      setAverage(newScore.reduce((a, b) => a + b, 0) / newScore.length)
      return newScore
    })
    setTotal(good + neutral + bad + 1)
    setBad(bad + 1)
  }
  console.log(average);


  return (
    <div>
      <Title title={'give feedback'} />
      <Button handleClick={handleGood} text='good' />
      <Button handleClick={handleNeutral} text='neutral' />
      <Button handleClick={handleBad} text='bad' />
      <Title title={'Satistics'} />
      {

        total !== 0
          ?
          <>
            <Statitics state={good} text='good' />
            <Statitics state={neutral} text='neutral' />
            <Statitics state={bad} text='bad' />
            <Statitics state={total} text='total' />
            <Statitics state={average} text='average' />
          </>
          :
          <p>No feedback given</p>
      }
    </div>
  )
}

export default App
