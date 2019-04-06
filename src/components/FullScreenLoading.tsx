import * as React from 'react'
import bind from 'bind-decorator'

interface Props {

}

interface State {
  index: number
}

export default class FullScreenLoading extends React.Component<Props, State> {

  public state = {
    index: 0,
  }

  private timer: any

  public componentDidMount() {
    this.timer = setInterval(this.next, 100)
  }

  public componentWillUnmount() {
    clearInterval(this.timer)
  }

  @bind private next() {
    const index = (this.state.index + 1) % 3
    this.setState({ index })
  }

  public render() {
    return (
      <div className="full-screen-loading">
        <span>Please wait</span>
        {this.state.index == 0 && <span>.</span>}
        {this.state.index == 1 && <span>..</span>}
        {this.state.index == 2 && <span>...</span>}
      </div>
    )
  }

}
