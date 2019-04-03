import * as React from 'react'

interface Props {
  score: number
}

const ScoreBar: React.FunctionComponent<Props> = (props) => {
  const { score } = props
  return (
    <dl className="score-bar">
      <dt>Score</dt>
      <dd>{score}</dd>
    </dl>
  )
}

export default ScoreBar
