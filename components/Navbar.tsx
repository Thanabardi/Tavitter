import { Component, ReactNode } from "react";
import axios from "axios";

class Navbar extends Component {
  state = {
    accountName: "Van Darkholme",
    accountId: "vansamaofficial",
  };
  render(): ReactNode {
    return (
      <div className="z-20 fixed top-0 w-full bg-white drop-shadow px-5 p-2 grid grid-flow-col place-content-between">
        <a href={"/"} className="text-2xl font-semibold hover:cursor-pointer">
          Tavitter
        </a>
        <form className="w-full col-span-2">
          <label className="sr-only">Search</label>
          <div className="relative w-full">
            <input
              className="focus:text-black outline-none bg-light-gray text-dark-gray text-sm rounded-full block w-full h-8 px-5 p-2.5"
              id="search"
              type="text"
              placeholder="Search Tavitter"
              required
            />
          </div>
        </form>

        <a
          href={"/user/" + this.state.accountId}
          className="text-l font-semibold text-app-red m-auto"
        >
          {this.state.accountName}
        </a>
      </div>
    );
  }
}
export default Navbar;
