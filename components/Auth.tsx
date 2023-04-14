import { Component, ReactNode } from "react";
import axios from "axios";

import PopupForm from "./PopupForm";

interface Props {}

class Auth extends Component<Props> {
  state = {
    logInPopup: false,
    createAccPopup: false,
    createProfilePopup: false,
  };

  handleCallbackLogIn = (popupData: Array<Object>) => {
    this.setState({ logInPopup: false });
    console.log(popupData);
  };

  handleCallbackCreateAcc = (popupData: Array<Object>) => {
    this.setState({ createAccPopup: false });
    if (popupData) {
      this.setState({ createProfilePopup: true });
    }
    console.log(popupData);
  };

  handleCallbackCreateProfile = (popupData: Array<Object>) => {
    this.setState({ createProfilePopup: false });
    console.log(popupData);
  };

  render(): ReactNode {
    return (
      <>
        <div className="flex gap-2">
          <button
            className="w-fit bg-white py-1 px-4 rounded-full border border-app-red font-medium text-app-red m-auto hover:brightness-75"
            onClick={(e) => this.setState({ createAccPopup: true })}
          >
            Sign up
          </button>
          <button
            className="w-fit bg-app-red py-1 px-4 rounded-full font-medium text-white m-auto hover:brightness-75"
            onClick={(e) => this.setState({ logInPopup: true })}
          >
            Log in
          </button>
        </div>
        {this.state.logInPopup && (
          <PopupForm
            title="Log in"
            desc=""
            confirmButtonL="Log in"
            cancelButton={true}
            field={[
              { name: "Name", type: "text", placeHolder: "name", input: "" },
              { name: "Email", type: "email", placeHolder: "email", input: "" },
            ]}
            callback={this.handleCallbackLogIn}
          />
        )}
        {this.state.createAccPopup && (
          <PopupForm
            title="Create your account"
            desc="Step 1 of 2"
            confirmButtonL="Next"
            cancelButton={true}
            field={[
              { name: "Name", type: "text", placeHolder: "name", input: "" },
              { name: "Email", type: "email", placeHolder: "email", input: "" },
            ]}
            callback={this.handleCallbackCreateAcc}
          />
        )}
        {this.state.createProfilePopup && (
          <PopupForm
            title="Create your account"
            desc="Step 2 of 2"
            confirmButtonL="Confirm"
            cancelButton={false}
            field={[
              { name: "Name", type: "text", placeHolder: "name", input: "" },
              { name: "Email", type: "email", placeHolder: "email", input: "" },
            ]}
            callback={this.handleCallbackCreateProfile}
          />
        )}
      </>
    );
  }
}
export default Auth;
