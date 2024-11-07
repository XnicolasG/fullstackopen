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

const StatisticLine = ({ text, value }) => {

  return (
    <tr>
      <th>{text}</th>
      <th>{value} {text === 'positive' && '%'}</th>
    </tr>
  )
}

const Statitics = (props) => {
  const { good,
    neutral,
    bad,
    total,
    positive,
    average } = props

  return (
    <table >
      <tbody>
        <StatisticLine text='good' value={good} />
        <StatisticLine text='neutral' value={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text='total' value={total} />
        <StatisticLine text='average' value={average} />
        <StatisticLine text='positive' value={positive} />
      </tbody>
    </table>
  )
}

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [score, setScore] = useState([])
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGood = () => {
    setScore(prevScore => {
      const newScore = prevScore.concat(1);
      setAverage((newScore.reduce((a, b) => a + b, 0) / newScore.length).toFixed(2))
      return newScore
    })
    setTotal(prevTotal => {
      const newTotal = prevTotal + 1
      setGood(prevGood => {
        const newGood = prevGood + 1
        setPositive(((newGood / newTotal) * 100).toFixed(1))
        return newGood
      })
      return newTotal;
    });
  };

  const handleNeutral = () => {
    setScore(prevScore => {
      const newScore = prevScore.concat(0)
      setAverage((newScore.reduce((a, b) => a + b, 0) / newScore.length).toFixed(2))
      return newScore
    });
    setTotal(prevTotal => {
      const newTotal = prevTotal + 1
      setPositive(((good / newTotal) * 100).toFixed(1))
      return newTotal;
    })
    setNeutral(prevNeutral => prevNeutral + 1)
  }

  const handleBad = () => {
    setScore(prevScore => {
      const newScore = prevScore.concat(-1)
      setAverage((newScore.reduce((a, b) => a + b, 0) / newScore.length).toFixed(2))
      return newScore
    })
    setTotal(prevTotal => {
      const newTotal = prevTotal + 1
      setPositive(((good / newTotal) * 100).toFixed(1))
      return newTotal
    })
    setBad(prevBad => prevBad + 1)
  }
  console.log(positive);


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
            <Statitics
              good={good}
              neutral={neutral}
              bad={bad}
              total={total}
              positive={positive}
              average={average}
            />
          </>
          :
          <p>No feedback given</p>
      }
    </div>
  )
}

export default App
