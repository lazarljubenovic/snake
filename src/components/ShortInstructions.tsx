import * as React from 'react'

interface Props {
}

const ShortInstructions: React.FunctionComponent<Props> = (props) => {
  return (
    <div className="short-instructions">
      <p>Arrow keys or WASD to move around. Collect as many dots as you can.</p>
    </div>
  )
}

export default ShortInstructions
