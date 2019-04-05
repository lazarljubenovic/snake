import * as React from 'react'

interface Props {
}

const ShortInstructions: React.FunctionComponent<Props> = (props) => {
  return (
    <div className="short-instructions">
      <p>
        Arrow keys or WASD to move around.
        Swipe on touch screens.
        <br/>
        Collect as many dots as you can.
        Don't die.
      </p>
    </div>
  )
}

export default ShortInstructions
