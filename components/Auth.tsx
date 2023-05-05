import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import axios from "axios";

import PopupForm from "./PopupForm";
import PopupBio from "./PopupBio";
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
  const { data: session } = useSession()
  let [logInPopup, setLogInPopup] = useState(false);
  let [createAccPopup, setCreateAccPopup] = useState(false);
  let [createConsent, setCreateConsent] = useState(false);
  let [createProfilePopup, setCreateProfilePopup] = useState(false);

  useEffect(() => {
    if (session) {
      sessionStorage.setItem("user", JSON.stringify(session.user?.name));
    }
  }, [session]);

  async function getUserProfile() {
    let user = JSON.parse(sessionStorage.getItem("user") || "{}");
    await axios
      .get("/api/user/profile", {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      })
      .then((response) => {
        setLogInPopup(false);
        (user as any)["profile"] = response.data.profile.pop();
        (user as any)["username"] = response.data.username;
        sessionStorage.setItem("user", JSON.stringify(user));
        router.reload();
      })
      .catch((error) => {
        console.log(error);
        window.alert(error.response.data.message);
      });
  }

  async function handleCallbackLogIn(popupData: Object) {
    if (popupData) {
      await axios
        .post("/api/user/login", popupData)
        .then((response) => {
          setLogInPopup(false);
          sessionStorage.setItem("user", JSON.stringify(response.data));
          getUserProfile();
        })
        .catch((error) => {
          console.log(error);
          window.alert(error.response.data.message);
        });
    } else {
      setLogInPopup(false);
    }
  }

  function handleCallbackCreateCon(popupData: Object) {
    if (popupData) {
      setCreateAccPopup(true);
    }
    setCreateConsent(false);
  }

  async function handleCallbackCreateAcc(popupData: inputCreateAcc) {
    if (popupData) {
      if (popupData.password != popupData.confirm) {
        alert("Password do not match");
      } else {
        delete popupData.confirm;
        await axios
          .post("/api/user/signup", popupData)
          .then((response) => {
            setCreateAccPopup(false);
            setCreateProfilePopup(true);
            sessionStorage.setItem("user", JSON.stringify(response.data));
          })
          .catch((error) => {
            console.log(error);
            window.alert(error.response.data.message);
          });
      }
    } else {
      setCreateAccPopup(false);
    }
  }

  async function handleCallbackCreateProfile(popupData: Object) {
    let user = JSON.parse(sessionStorage.getItem("user") || "{}");
    if (popupData) {
      await axios
        .post("/api/user/profile", popupData, {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        })
        .then((response) => {
          setCreateProfilePopup(false);
          (user as any)["profile"] = response.data.profile.pop();
          (user as any)["username"] = response.data.username;
          sessionStorage.setItem("user", JSON.stringify(user));
          getUserProfile();
        })
        .catch((error) => {
          console.log(error);
          window.alert(error.response.data.message);
        });
    } else {
      setCreateProfilePopup(false);
    }
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
      {createProfilePopup && (
        <PopupBio
          title="Create profile"
          desc="Step 2 of 2"
          cancelButton={false}
          callback={handleCallbackCreateProfile}
        />
      )}
    </>
  );
};
export default Auth;
