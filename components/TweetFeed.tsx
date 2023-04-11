import { Component, ReactNode } from "react";
import axios from "axios";
import Tweet from "./Tweet";

interface Props {
  userId?: string | string[];
}

class TweetFeed extends Component<Props> {
  state = {
    userId: this.props.userId,
    tweets: [
      {
        id: 1,
        profileImg: "",
        accountName: "vansamaofficial",
        reTweet: "Van Darkholme",
        displayName: "Van Darkholme",
        date: new Date("2023-4-11"),
        post: "I was subconsciously fingering myself one morning, and then I realized I was supposed to be wiping my ass.",
        postImg: "",
      },
      {
        id: 2,
        profileImg: "",
        accountName: "vansamaofficial",
        reTweet: undefined,
        displayName: "Van Darkholme",
        date: new Date("2023-4-11"),
        post: "I was subconsciously fingering myself one morning, and then I realized I was supposed to be wiping my ass.",
        postImg: "",
      },
      {
        id: 3,
        profileImg: "",
        accountName: "vansamaofficial",
        reTweet: undefined,
        displayName: "Van Darkholme",
        date: new Date("2023-4-11"),
        post: "I was subconsciously fingering myself one morning, and then I realized I was supposed to be wiping my ass.",
        postImg: "",
      },
      {
        id: 4,
        profileImg: "",
        accountName: "vansamaofficial",
        reTweet: undefined,
        displayName: "Van Darkholme",
        date: new Date("2023-4-11"),
        post: "I was subconsciously fingering myself one morning, and then I realized I was supposed to be wiping my ass.",
        postImg: "",
      },
    ],
  };
  render(): ReactNode {
    console.log(this.state.userId);

    return (
      <div className="">
        {this.state.tweets.map((tweet) => (
          <Tweet key={tweet.id} tweet={tweet} />
        ))}
      </div>
    );
  }
}
export default TweetFeed;
