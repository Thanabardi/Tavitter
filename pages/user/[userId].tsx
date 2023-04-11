import { Component, ReactNode } from "react";
import { NextRouter, withRouter } from "next/router";
import Navbar from "@/components/Navbar";
import TweetFeed from "@/components/TweetFeed";
import PostTweet from "@/components/PostTweet";
import UserProfile from "@/components/UserProfile";

interface WithRouterProps {
  router: NextRouter;
}

class TweetPage extends Component<WithRouterProps> {
  render(): ReactNode {
    return (
      <>
        <Navbar />
        <div className="grid grid-cols-4 h-screen">
          <div className="pt-16"></div>
          <div className="pt-12 bg-white col-span-2 border border-light-gray">
            {this.props.router.isReady && (
              <div>
                <UserProfile userId={this.props.router.query.userId} />
                <TweetFeed userId={this.props.router.query.userId} />
              </div>
            )}
          </div>
          <div className="pt-16">
            <PostTweet />
          </div>
        </div>
      </>
    );
  }
}
export default withRouter(TweetPage);
