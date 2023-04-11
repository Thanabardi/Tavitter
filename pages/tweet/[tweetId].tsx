import { Component, ReactNode } from "react";
import { withRouter } from "next/router";
import { WithRouterProps } from "next/dist/client/with-router";

class TweetPage extends Component<WithRouterProps> {
  state = this.props.router.query;
  render(): ReactNode {
    return <p>{this.state.tweetId}</p>;
  }
}
export default withRouter(TweetPage);
