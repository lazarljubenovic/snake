import * as React from 'react'

interface Props {
  className?: string
}

const Screen: React.FunctionComponent<Props> = (props) => {
  const classNames = ['screen']
  if (props.className != null) classNames.push(props.className)
  const className = classNames.join(' ')
  
  return (
    <div className={className}>
      { props.children }
    </div>
  )
}

export default Screen
