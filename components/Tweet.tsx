import { Component, ReactNode } from "react";
import { NextRouter, withRouter } from "next/router";
import axios from "axios";
import PopupForm from "./PopupForm";

interface WithRouterProps {
  router: NextRouter;
}

interface Props extends WithRouterProps {
  tweet: {
    id: number;
    profileImg?: string;
    accountName: string;
    reTweet?: String;
    displayName: string;
    date: Date;
    post: string;
    postImg?: string;
  };
}

class Tweet extends Component<Props> {
  state = { deletePopup: false };

  formatDate = () => {
    let d = this.props.tweet.date?.toString().split(" ");
    return [d[1] + " " + d[2] + ", " + d[3]];
  };

  handleSelect = (type: string, event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    console.log(type, this.props.tweet.id);
    if (type == "user") {
      this.props.router.push(`/user/${this.props.tweet.accountName}`);
    } else if (type == "like") {
      alert("liked");
    } else if (type == "retweet") {
      alert("retweet");
    } else if (type == "delete") {
      this.setState({ deletePopup: true });
    }
  };

  handleCallbackDeletePopup = (popupData: Array<Object>) => {
    this.setState({ deletePopup: false });
    console.log(popupData);
  };

  render(): ReactNode {
    return (
      <>
        <div
          className="relative place-content-start grid grid-flow-col gap-x-4 border-b p-3 hover:cursor-pointer hover:bg-light-gray"
          onClick={() => {
            this.props.router.push(`/tweet/${this.props.tweet.id}`);
          }}
        >
          {this.props.tweet.reTweet && (
            <p className="col-start-1 flex text-sm text-dark-gray">
              {this.props.tweet.reTweet + " Retweeted"}
            </p>
          )}
          <div className="row-start-2 row-span-3 bg-light-gray rounded-full w-[48px] h-[48px] col-end-1 justify-self-end" />
          <div className="row-start-2 flex items-center">
            <p className="mr-2 font-semibold">{this.props.tweet.displayName}</p>
            <div
              className="mr-2 text-dark-gray hover:text-app-red"
              onClick={(e) => this.handleSelect("user", e)}
            >
              {"@" + this.props.tweet.accountName}
            </div>
            <p className="text-dark-gray">{"· " + this.formatDate()}</p>
          </div>
          <p className="">{this.props.tweet.post}</p>
          <div className="flex text-dark-gray pt-1">
            <div className="mr-5 hover:text-app-red">Reply</div>
            <div
              className="mr-5 hover:text-app-red"
              onClick={(e) => this.handleSelect("retweet", e)}
            >
              Retweet
            </div>
            <div
              className="mr-5 hover:text-app-red"
              onClick={(e) => this.handleSelect("like", e)}
            >
              Like
            </div>
            <div
              className="hover:text-app-red absolute top-3 right-3"
              onClick={(e) => this.handleSelect("delete", e)}
            >
              Delete
            </div>
          </div>
        </div>
        {this.state.deletePopup && (
          <PopupForm
            title="Delete Taveet?"
            desc="This can't be undone and it will be removed from your profile and any accounts that have followed you."
            confirmButtonL="Delete"
            cancelButton={true}
            field={[]}
            callback={this.handleCallbackDeletePopup}
          />
        )}
      </>
    );
  }
}
export default withRouter(Tweet);
