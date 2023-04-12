import { Component, ReactNode } from "react";
import axios from "axios";

class PostTweet extends Component {
  state = {
    accountName: "vansamaofficial",
    displayName: "Van Darkholme",
    tweetText: "",
  };

  handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log(this.state.tweetText);
  };

  onChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    this.setState({ tweetText: event.target.value });
  };

  render(): ReactNode {
    return (
      <div className="fixed w-[23%] bg-white drop-shadow-xl rounded-xl mx-5 hidden xl:grid">
        <div className="m-4 grid grid-cols-1">
          <div className="row-span-2 bg-light-gray rounded-full w-[48px] h-[48px] col-end-1 row-end-1" />
          <p className="pl-4 my-auto text-xl">{this.state.displayName}</p>
          <a
            href={"../user/" + this.state.accountName}
            className="pl-4 my-auto text-sm text-dark-gray hover:text-app-red"
          >
            {"@" + this.state.accountName}
          </a>
        </div>
        <form onSubmit={this.handleSubmit} className="row-span-4">
          <textarea
            className="outline-none w-full resize-none px-4"
            id="postTweet"
            placeholder="What's happening?"
            rows={10}
            maxLength={250}
            value={this.state.tweetText}
            onChange={this.onChange}
            required
          />
          <div className="border-t border-light-gray mx-4 grid">
            <div className="text-app-red">+ photo</div>
            <div className="text-app-red text-right">+ video</div>
            <button className="col-span-2 max-w-fit bg-app-red px-8 py-1.5 mb-3 rounded-full font-medium text-white m-auto">
              Taveet
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default PostTweet;
