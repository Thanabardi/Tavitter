import { Component, ReactNode } from "react";
import axios from "axios";
import PopupBio from "./PopupBio";

interface Props {
  userId?: string | string[];
}

class UserProfile extends Component<Props> {
  state = {
    userId: this.props.userId,
    // coverImage: this.props.coverImage,
    // profileImage: this.props.profileImage,
    // bio: this.props.bio,
    bioPopup: false,
  };

  handleCallback = (popupData: Object) => {
    this.setState({ bioPopup: false });
    console.log(popupData);
  };

  render(): ReactNode {
    return (
      <>
        <div className="relative border-b border-light-gray pb-4">
          <button
            className="absolute top-2 right-2 w-fit px-2 rounded-full border border-app-red font-medium text-sm text-app-red m-auto hover:brightness-150"
            onClick={(e) => this.setState({ bioPopup: true })}
          >
            Edit profile
          </button>
          <div className="bg-light-gray h-[250px] w-[750px]" />
          <div className="bg-light-gray border-4 border-white rounded-full w-[170px] h-[170px] mx-auto -mt-20" />
          <p className="text-center text-3xl font-semibold">
            {this.state.userId}
          </p>
          <p className="text-center">
            <a
              href={"../user/" + this.state.userId}
              className="text-xl text-dark-gray hover:text-app-red"
            >
              {"@" + this.state.userId}
            </a>
          </p>
        </div>
        {this.state.bioPopup && (
          <PopupBio
            title="Edit profile"
            desc=""
            cancelButton={true}
            coverImage=""
            profileImage=""
            bio=""
            callback={this.handleCallback}
          />
        )}
      </>
    );
  }
}
export default UserProfile;
