import { Component, ReactNode } from "react";
import axios from "axios";

interface Props {
  userId?: string | string[];
}

class UserProfile extends Component<Props> {
  state = { userId: this.props.userId };
  render(): ReactNode {
    return (
      <div className="border-b border-light-gray pb-4">
        <div className="bg-light-gray w-full h-[260px]" />
        <div className="bg-light-gray border-4 border-white rounded-full w-[170px] h-[170px] items-center mx-auto -mt-20" />
        <p className="text-center text-3xl font-semibold">
          {this.state.userId}
        </p>
        <a
          href={"../user/" + this.state.userId}
          className="block text-center text-xl text-dark-gray hover:text-app-red"
        >
          {"@" + this.state.userId}
        </a>
      </div>
    );
  }
}
export default UserProfile;
