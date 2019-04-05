import React from 'react'

export interface Props {
  value: number
  valueChange: (value: number) => void

  min?: number
  max?: number
  step?: number
  format?: (value: number) => string
}

const defaultFormat = (value: number) => value.toString()

const Counter: React.FunctionComponent<Props> = (props) => {
  const {
    value,
    valueChange,
    min = -Infinity, 
    max = +Infinity, 
    step = 1,
    format = defaultFormat,
  } = props

  const increment = () => valueChange(value + step)
  const decrement = () => valueChange(value - step)

  const isDecDisabled = value - step < min
  const isIncDisabled = value + step > max

  return (
    <div className="counter">
      <button className="basic" onClick={decrement} disabled={isDecDisabled}>{'<'}</button>
      <span>{format(value)}</span>
      <button className="basic" onClick={increment} disabled={isIncDisabled}>{'>'}</button>
    </div>
  )
}

export default Counter
