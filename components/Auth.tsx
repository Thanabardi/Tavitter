import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

import PopupForm from "./PopupForm";
import PopupAuth from "./PopupAuth";

interface inputCreateAcc {
  username: string;
  email: string;
  password: string;
  confirm?: string;
  phone: string;
}

const Auth = () => {
  const router = useRouter();
  let [logInPopup, setLogInPopup] = useState(false);
  let [createAccPopup, setCreateAccPopup] = useState(false);
  let [createConsent, setCreateConsent] = useState(false);

  async function handleCallbackLogIn(popupData: Object) {
    if (popupData) {
      signIn("tavitter-login", { ...popupData, redirect: false }).then(
        ({ ok, error }) => {
          if (ok) {
            router.reload();
          } else {
            console.log(error);
            alert(error);
          }
        }
      );
    } else {
      setLogInPopup(false);
    }
  }

  async function handleCallbackCreateAcc(popupData: inputCreateAcc) {
    if (popupData) {
      if (popupData.password != popupData.confirm) {
        alert("Password do not match");
      } else {
        delete popupData.confirm;
        signIn("tavitter-signup", { ...popupData, redirect: false }).then(
          ({ ok, error }) => {
            if (ok) {
              setCreateAccPopup(false);
              router.reload();
            } else {
              console.log(error);
              alert(error);
            }
          }
        );
      }
    } else {
      setCreateAccPopup(false);
    }
  }

  function handleCallbackCreateCon(popupData: Object) {
    if (popupData) {
      setCreateAccPopup(true);
    }
    setCreateConsent(false);
  }

  return (
    <>
      <div className="flex gap-2">
        <button
          className="w-fit bg-white py-1 px-4 rounded-full border border-app-red font-medium text-app-red m-auto hover:bg-light-gray"
          onClick={(e) => setCreateConsent(true)}
        >
          Sign up
        </button>
        <button
          className="w-fit bg-app-red py-1 px-4 rounded-full font-medium text-white m-auto hover:brightness-75"
          onClick={(e) => setLogInPopup(true)}
        >
          Log in
        </button>
      </div>
      {logInPopup && (
        <PopupAuth
          title="Log in"
          desc=""
          confirmButtonL="Log in"
          type="login"
          field={[
            {
              name: "Email",
              type: "email",
              placeHolder: "email@tavitter.com",
              input: "",
            },
            {
              name: "Password",
              type: "password",
              placeHolder: "P@55word",
              input: "",
            },
          ]}
          callback={handleCallbackLogIn}
        />
      )}
      {createConsent && (
        <PopupForm
          title="Terms of Service"
          desc="You may use the Services only if you agree to form a binding contract with us and are not a person barred from receiving services under the laws of the applicable jurisdiction. In any case, you must be at least 13 years old, or in the case of Periscope 16 years old, to use the Services. If you are accepting these Terms and using the Services on behalf of a company, organization, government, or other legal entity, you represent and warrant that you are authorized to do so and have the authority to bind such entity to these Terms, in which case the words “you” and “your” as used in these Terms shall refer to such entity."
          confirmButtonL="Accept"
          hyperlink="/term"
          cancelButton={true}
          field={[]}
          callback={handleCallbackCreateCon}
        />
      )}
      {createAccPopup && (
        <PopupAuth
          title="Create your account"
          desc="Step 1 of 2"
          confirmButtonL="Next"
          type="signup"
          field={[
            {
              name: "Username",
              type: "text",
              placeHolder: "MyTavitUsername",
              input: "",
            },
            {
              name: "Email",
              type: "email",
              placeHolder: "email@tavitter.com",
              input: "",
            },
            {
              name: "Password",
              type: "password",
              placeHolder: "P@55word",
              input: "",
            },
            {
              name: "Confirm",
              type: "password",
              placeHolder: "P@55word",
              input: "",
            },
            {
              name: "Phone",
              type: "number",
              placeHolder: "0123456789",
              input: "",
            },
          ]}
          callback={handleCallbackCreateAcc}
        />
      )}
    </>
  );
};
export default Auth;
