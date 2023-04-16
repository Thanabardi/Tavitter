import { Component, ReactNode } from "react";
import { NextRouter, withRouter } from "next/router";
import axios from "axios";

import PopupForm from "./PopupForm";
import Auth from "./Auth";

interface WithRouterProps {
  router: NextRouter;
}

class Navbar extends Component<WithRouterProps> {
  state = {
    selectNav: false,
    logoutPopup: false,
    editPopup: false,
    searchText: "",
    accountName: "Van Darkholme",
    accountId: "vansamaofficial",
  };

  handleCallbackLogoutPopup = (popupData: Array<Object>) => {
    this.setState({ logoutPopup: false, selectNav: false });
    console.log(popupData);
  };

  handleCallbackEditPopup = (popupData: Array<Object>) => {
    this.setState({ editPopup: false, selectNav: false });
    console.log(popupData);
  };

  handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log(this.state.searchText);
  };

  onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ searchText: event.target.value });
  };

  handleSelect = (type: string, event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    if (type == "profile") {
      this.props.router.push(`/user/${this.state.accountId}`);
    } else if (type == "logout") {
      this.setState({ logoutPopup: true });
    } else if (type == "edit") {
      this.setState({ editPopup: true });
    }
  };

  render(): ReactNode {
    return (
      <>
        <div className="z-20 fixed top-0 w-full bg-white drop-shadow px-5 p-2 grid grid-flow-col place-content-between">
          <a href={"/"} className="text-2xl font-semibold hover:cursor-pointer">
            Tavitter
          </a>
          <form onSubmit={this.handleSubmit} className="w-full col-span-2">
            <input
              className="focus:text-black outline-none bg-light-gray text-dark-gray text-sm rounded-full block w-full h-8 px-5 p-2.5"
              id="search"
              type="text"
              placeholder="Search Tavitter"
              value={this.state.searchText}
              onChange={this.onChange}
              required
            />
          </form>
          {true ? (
            <Auth />
          ) : (
            <>
              <button
                onClick={(e) =>
                  this.setState({ selectNav: !this.state.selectNav })
                }
                className="text-l font-semibold bg-white text-app-red m-auto border py-1 px-2 rounded-md hover:bg-light-gray"
              >
                {this.state.accountName}
              </button>
              {this.state.selectNav && (
                <div className="fixed grid w-1/12 top-12 right-5 bg-white rounded shadow-lg">
                  <button
                    onClick={(e) => this.handleSelect("profile", e)}
                    className="hover:bg-light-gray p-1 border-b text-left"
                  >
                    Profile
                  </button>
                  <button
                    onClick={(e) => this.handleSelect("edit", e)}
                    className="hover:bg-light-gray p-1 border-b text-left"
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={(e) => this.handleSelect("logout", e)}
                    className="hover:bg-light-gray p-1 font-semibold"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          )}
        </div>
        {this.state.logoutPopup && (
          <PopupForm
            title="Log out of Tavitter?"
            desc="You can always log back in at any time."
            confirmButtonL="Log out"
            cancelButton={true}
            field={[]}
            callback={this.handleCallbackLogoutPopup}
          />
        )}
        {this.state.editPopup && (
          <PopupForm
            title="Edit profile"
            desc=""
            confirmButtonL="Done"
            cancelButton={true}
            field={[
              {
                name: "Name",
                type: "text",
                placeHolder: "name",
                input: "",
              },
              {
                name: "Description",
                type: "text",
                placeHolder: "description",
                input: "",
              },
            ]}
            callback={this.handleCallbackEditPopup}
          />
        )}
      </>
    );
  }
}
export default withRouter(Navbar);
