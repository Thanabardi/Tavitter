import { Component, ReactNode } from "react";
import axios from "axios";
import { NextRouter, withRouter } from "next/router";

interface WithRouterProps {
  router: NextRouter;
}

class Navbar extends Component<WithRouterProps> {
  state = {
    selectNav: false,
    searchText: "",
    accountName: "Van Darkholme",
    accountId: "vansamaofficial",
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
      alert("logout");
    }
  };

  render(): ReactNode {
    return (
      <div className="z-20 fixed top-0 w-full bg-white drop-shadow px-5 p-2 grid grid-flow-col place-content-between">
        <a href={"/"} className="text-2xl font-semibold hover:cursor-pointer">
          Tavitter
        </a>
        <form onSubmit={this.handleSubmit} className="w-full col-span-2">
          <label className="sr-only">Search</label>
          <div className="relative w-full">
            <input
              className="focus:text-black outline-none bg-light-gray text-dark-gray text-sm rounded-full block w-full h-8 px-5 p-2.5"
              id="search"
              type="text"
              placeholder="Search Tavitter"
              value={this.state.searchText}
              onChange={this.onChange}
              required
            />
          </div>
        </form>

        <button
          onClick={(e) => this.setState({ selectNav: !this.state.selectNav })}
          className="text-l font-semibold text-app-red m-auto border py-1 px-2 rounded-md"
        >
          {this.state.accountName}
        </button>
        {this.state.selectNav && (
          <div className="fixed top-12 right-5 bg-white w-fit rounded">
            <button
              onClick={(e) => this.handleSelect("profile", e)}
              className="w-full hover:bg-light-gray p-1 border-b"
            >
              Profile
            </button>
            <button
              onClick={(e) => this.handleSelect("logout", e)}
              className="w-full hover:bg-light-gray p-1 font-semibold"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    );
  }
}
export default withRouter(Navbar);
