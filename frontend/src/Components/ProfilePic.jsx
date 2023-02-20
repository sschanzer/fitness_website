import React from "react";
import { MDBBtn } from "mdb-react-ui-kit";
import axios from "axios";

// The following code allows users to upload a profile picture to their accounts from their local devices

const ImgUpload = ({ onChange, src }) => (
  <label htmlFor="photo-upload" className="custom-file-upload fas">
    <div className="img-wrap img-upload">
      <img for="photo-upload" src={src} />
    </div>
    <input id="photo-upload" type="file" onChange={onChange} />
  </label>
);

const Profile = ({ onSubmit, src }) => (
  <div>
    <form className="profileCenter" onSubmit={onSubmit}>
      <label className="custom-file-upload fas">
        <div className="img-wrap">
          <img for="photo-upload" src={src} />
        </div>
      </label>

      <MDBBtn color="info" type="submit" className="edit">
        Edit Profile
      </MDBBtn>
    </form>
  </div>
);

const Edit = ({ onSubmit, children }) => (
  <div>
    <form className="profileCenter" onSubmit={onSubmit}>
      {children}
      <MDBBtn color="info" type="submit">
        Save
      </MDBBtn>
    </form>
  </div>
);

class CardProfile extends React.Component {
  state = {
    file: "",
    imagePreviewUrl: this.props.user.profile_pic,
    active: "edit",
  };

  photoUpload = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    let activeP = this.state.active === "edit" ? "profile" : "edit";
    this.setState({
      active: activeP,
    });
    console.log(e);
    let formdata = new FormData();
    let picture = document.getElementById("photo-upload");
    console.log(picture);
    if (picture) {
      formdata.append("profile_pic", picture.files[0]);
      let response = await axios.put("profile_pic/", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response);
    }
  };

  render() {
    const {
      imagePreviewUrl,

      active,
    } = this.state;
    return (
      <div>
        {active === "edit" ? (
          <Edit onSubmit={this.handleSubmit}>
            <ImgUpload onChange={this.photoUpload} src={imagePreviewUrl} />
          </Edit>
        ) : (
          <Profile onSubmit={this.handleSubmit} src={imagePreviewUrl} />
        )}
      </div>
    );
  }
}

export default CardProfile;
