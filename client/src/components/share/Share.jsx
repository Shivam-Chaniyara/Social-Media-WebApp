import "./share.css";
import PhotoVideoIcon from "@mui/icons-material/PhotoLibrary";
import TagIcon from "@mui/icons-material/Label";
import LocationIcon from "@mui/icons-material/Place";
import FeelingIcon from "@mui/icons-material/EmojiEmotions";
import { CircularProgress } from "@mui/material";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import CancelIcon from "@mui/icons-material/Cancel";
import { Link } from "react-router-dom";

export default function Share() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const { user } = useContext(AuthContext);
  const desc = useRef();
  const [file, setFile] = useState(null);
  const [fileUploading, setFileUploading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      if (file || desc.current.value !== "") {
        setFileUploading(true);
        await axios.post("/posts", newPost);
        setFileUploading(false);
        window.location.reload();
      }
    } catch (err) {}
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <Link to={"/profile/" + user.username}>
            <img
              className="shareProfileImg"
              src={
                user.profilePicture
                  ? PF + user.profilePicture
                  : PF + "person/noAvatar.jpg"
              }
              alt=""
            />
          </Link>
          <input
            type="text"
            className="shareInput"
            placeholder={`What's on your mind, ${user.username}?`}
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <CancelIcon
              className="shareCancelImg"
              onClick={() => setFile(null)}
            />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PhotoVideoIcon htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo/Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                name="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <TagIcon htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
          </div>
          <div className="shareOptions">
            <div className="shareOption">
              <LocationIcon htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <FeelingIcon htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button
            type="submit"
            className="shareButton"
            disabled={fileUploading}
          >
            {fileUploading ? (
              <CircularProgress color="inherit" size="20px" />
            ) : (
              "Share"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
