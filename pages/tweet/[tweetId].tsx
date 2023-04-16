import { Component, ReactNode } from "react";
import { NextRouter, withRouter } from "next/router";
import Navbar from "@/components/Navbar";
import TweetFeed from "@/components/TweetFeed";
import PostTweet from "@/components/PostTweet";
import Tweet from "@/components/Tweet";

interface WithRouterProps {
  router: NextRouter;
}

class TweetPage extends Component<WithRouterProps> {
  state = {
    replyText: "",
  };

  handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log(this.state.replyText);
  };

  onChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    this.setState({ replyText: event.target.value });
  };

  render(): ReactNode {
    const tweet = {
      id: 1,
      profileImg: "",
      accountName: "vansamaofficial",
      reTweet: "Van Darkholme",
      displayName: "Van Darkholme",
      date: new Date("2023-4-11"),
      post: "I was subconsciously fingering myself one morning, and then I realized I was supposed to be wiping my ass.",
      postImg: "",
    };
    return (
      <>
        <Navbar />
        <div className="grid grid-cols-4 h-screen">
          <div className="pt-16"></div>
          <div className="pt-12 bg-white col-span-2 border border-light-gray">
            <Tweet tweet={tweet} />

            <form
              onSubmit={this.handleSubmit}
              className="flex gap-4 border-b p-3 h-fit"
            >
              <div className="flex-none bg-light-gray rounded-full w-[48px] h-[48px]" />
              <textarea
                className="flex-1 h-full w-full resize-none outline-none"
                id="replyTweet"
                placeholder="Taveet Your reply"
                rows={4}
                maxLength={280}
                value={this.state.replyText}
                onChange={this.onChange}
                required
              />
              <button className="flex-none bg-app-red px-6 py-1 rounded-full font-medium text-white m-auto hover:brightness-75">
                Reply
              </button>
            </form>

            {this.props.router.isReady && (
              <TweetFeed userId={this.props.router.query.userId} />
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
