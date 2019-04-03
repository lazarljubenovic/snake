import * as React from 'react'

interface Props {

}

export class Welcome extends React.Component<Props> {

  public constructor(props: Props) {
    super(props)
  }

  public render() {
    return (
      <div className="welcome">
        Welcome!
      </div>
    )
  }

}
