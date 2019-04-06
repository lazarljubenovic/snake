import * as React from 'react'
import Modal from './Modal';

interface Props {
  actionText?: string
  onAction: () => void
}

const Alert: React.FunctionComponent<Props> = (props) => {
  const { children, actionText = 'Ok' } = props
  return (
    <Modal className="alert">
      <p>{children}</p>
      <button onClick={props.onAction}>{actionText}</button>
    </Modal>
  )
}

export default Alert
