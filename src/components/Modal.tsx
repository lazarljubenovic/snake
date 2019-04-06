import * as React from 'react'

interface Props {
  className?: string
}

const Modal: React.FunctionComponent<Props> = (props) => {
  const classNames = ['modal']
  if (props.className != null) classNames.push(props.className)
  const className = classNames.join(' ')

  return (
    <div className="modal-wrapper">
      <div className={className}>
        {props.children}
      </div>
    </div>
  )
}

export default Modal
