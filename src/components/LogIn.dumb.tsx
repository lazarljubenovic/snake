import * as React from 'react'
import bind from 'bind-decorator';
import FullScreenLoading from './FullScreenLoading';

interface Props {
  isLoading?: boolean
  onFacebook: () => Promise<any>
  onGoogle: () => Promise<any>
  onBack: () => void
}

class LogInDumb extends React.Component<Props> {

  public render() {
    return (
      <>

        {
          this.props.isLoading &&
          <FullScreenLoading />
        }

        <div className="options">
          <button onClick={this.facebook}>Facebook</button>
          <button onClick={this.google}>Google</button>
        </div>

        <div className="actions">
          <button onClick={this.props.onBack}>Back</button>
        </div>

      </>
    )
  }

  @bind private async facebook() {
    await this.props.onFacebook()
    this.props.onBack()
  }

  @bind private async google() {
    await this.props.onGoogle()
    this.props.onBack()
  }
}

export default LogInDumb
