import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const PostTweet = () => {
  const router = useRouter();
  let [login, setLogin] = useState(false);
  let [inputData, setInputData] = useState({
    msg: "",
    photo: [],
    video: [],
  });

  useEffect(() => {
    if (sessionStorage.getItem("user") != null) {
      setLogin(true);
    }
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let user = JSON.parse(sessionStorage.getItem("user") || "{}");
    await axios
      .post("/api/tweet", inputData, {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      })
      .then((response) => {
        router.push("/user/" + user.id);
      })
      .catch((error) => {
        console.log(error);
        window.alert(error.response.data.message);
      });
  }

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const name = event.target.name;
    const value = event.target.value;
    setInputData((values) => ({ ...values, [name]: value }));
  };

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const files = event.target.files;
    const reader = new FileReader();

    if (files && files.length > 0) {
      reader.readAsDataURL(files[0]);
      reader.onload = (e) => {
        setInputData((values) => ({ ...values, [name]: [e.target?.result] }));
      };
    }
  };

  return (
    <>
      {login && (
        <div className="fixed w-[23%] bg-white drop-shadow-xl rounded-xl mx-5 hidden xl:grid">
          <div className="m-4 grid grid-cols-1">
            <img
              className="row-span-2 col-end-1 row-end-1 w-[48px] aspect-[1/1] object-cover rounded-full"
              src={
                JSON.parse(sessionStorage.getItem("user") || "{}").profile.img
              }
            />
            <p className="pl-4 my-auto text-xl">
              {JSON.parse(sessionStorage.getItem("user") || "{}").profile.name}
            </p>
            <a
              href={
                "../user/" +
                JSON.parse(sessionStorage.getItem("user") || "{}").id
              }
              className="pl-4 my-auto text-sm text-dark-gray hover:text-app-red"
            >
              {"@" +
                JSON.parse(sessionStorage.getItem("user") || "{}").username}
            </a>
          </div>
          <form onSubmit={handleSubmit} className="row-span-4">
            <textarea
              className="outline-none w-full resize-none px-4"
              name="msg"
              placeholder="What's happening?"
              rows={10}
              maxLength={280}
              value={inputData.msg}
              onChange={onChange}
            />
            <div className="grid border-t border-light-gray mx-4 py-4 gap-2">
              {inputData.photo.map((photo) => {
                return (
                  <img
                    key={0}
                    className="object-cover rounded-md w-full m-auto col-start-1 hover:cursor-pointer"
                    onClick={(e) =>
                      setInputData((values) => ({ ...values, photo: [] }))
                    }
                    src={photo}
                  />
                );
              })}
              {inputData.video.map((video) => {
                return (
                  <video
                    loop
                    key={0}
                    className="object-cover rounded-md w-full m-auto col-start-2 hover:cursor-pointer"
                    onClick={(e) =>
                      setInputData((values) => ({ ...values, video: [] }))
                    }
                  >
                    <source src={video} type="video/mp4" />
                  </video>
                );
              })}
              <input
                className="w-full line-clamp-1 my-4 col-start-1
              file:rounded-full file:border file:border-app-red
              file:py-1 file:px-4
              file:text-sm file:font-medium
              file:bg-transparent file:text-app-red file:hover:bg-light-gray file:hover:cursor-pointer"
                name="photo"
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={(e) => onImageChange(e)}
              />
              <input
                className="w-full line-clamp-1 my-4 col-start-2
              file:rounded-full file:border file:border-app-red
              file:py-1 file:px-4
              file:text-sm file:font-medium
              file:bg-transparent file:text-app-red file:hover:bg-light-gray file:hover:cursor-pointer"
                name="video"
                type="file"
                accept="video/*"
                onChange={(e) => onImageChange(e)}
              />
              <button className="col-span-2 max-w-fit bg-app-red px-8 py-1.5 m-auto rounded-full font-medium text-white hover:brightness-75">
                Taveet
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default PostTweet;
