import { Component, ReactNode } from "react";

interface Props {
  // children: React.ReactNode;
  title: string;
  desc: string;
  coverImage: any;
  profileImage: any;
  bio: string;
  cancelButton: boolean;
  callback: Function;
}

class PopupBio extends Component<Props> {
  state = {
    coverImage: this.props.coverImage,
    profileImage: this.props.profileImage,
    bio: this.props.bio,
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.callback(this.state);
  };

  onChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState((values) => ({ ...values, [name]: value }));
  };

  onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const files = event.target.files;
    const reader = new FileReader();
    if (files && files.length > 0) {
      reader.readAsDataURL(files[0]);
      reader.onload = (e) => {
        this.setState((values) => ({ ...values, [name]: e.target?.result }));
      };
    }
  };

  render(): ReactNode {
    return (
      <div className="absolute z-40 w-screen h-screen top-0 left-0 right-0 bottom-0 flex flex-wrap items-center justify-center bg-black bg-opacity-50">
        <form
          className="relative grid bg-white w-1/5 rounded-lg p-6"
          onSubmit={(event) => this.handleSubmit(event)}
        >
          <h1 className="text-2xl font-bold pb-2">{this.props.title}</h1>
          <p className="text-sm leading-5 text-dark-gray">{this.props.desc}</p>
          <div className="w-full py-2">
            {this.state.coverImage && (
              <img
                className="aspect-[3/1] object-cover"
                src={this.state.coverImage}
              />
            )}
            {this.state.profileImage && (
              <img
                className="z-50 relative aspect-[1/1] object-cover rounded-full max-h-28 -mt-14 mx-auto border-4 border-white"
                src={this.state.profileImage}
              />
            )}
            <p>Cover Image</p>
            <input
              className="w-full pb-4 line-clamp-1
              file:rounded-full file:border file:border-app-red
              file:py-1 file:px-4
              file:text-sm file:font-medium
              file:bg-transparent file:text-app-red file:hover:bg-light-gray file:hover:cursor-pointer"
              name="coverImage"
              type="file"
              accept=".jpg, .jpeg, .png"
              required
              onChange={(event) => this.onImageChange(event)}
            />
            <p>Profile Image</p>
            <input
              className="w-full pb-4 line-clamp-1
              file:rounded-full file:border file:border-app-red
              file:py-1 file:px-4
              file:text-sm file:font-medium
              file:bg-transparent file:text-app-red file:hover:bg-light-gray file:hover:cursor-pointer"
              name="profileImage"
              type="file"
              accept=".jpg, .jpeg, .png"
              required
              onChange={(event) => this.onImageChange(event)}
            />
            <p>Bio</p>
            <textarea
              className="border-b w-full outline-none resize-none"
              placeholder="bio"
              name="bio"
              rows={5}
              maxLength={160}
              value={this.state.bio}
              onChange={(event) => this.onChange(event)}
            />
          </div>
          <button className="w-full bg-app-red px-8 py-1.5 mt-4 rounded-full font-medium text-white m-auto hover:brightness-75">
            Save
          </button>
          {this.props.cancelButton && (
            <div
              className="w-full text-center bg-white border border-dark-gray px-8 py-1.5 mt-2 rounded-full font-medium text-dark-gray m-auto hover:bg-light-gray hover:cursor-pointer"
              onClick={(e) => this.props.callback()}
            >
              Cancel
            </div>
          )}
        </form>
      </div>
    );
  }
}
export default PopupBio;
