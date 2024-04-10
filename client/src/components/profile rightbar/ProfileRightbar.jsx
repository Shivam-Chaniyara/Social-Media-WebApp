import "./profilerightbar.css";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import HomeIcon from "@mui/icons-material/Home";
import LocationIcon from "@mui/icons-material/LocationOn";
import LoveIcon from "@mui/icons-material/Favorite";
import Ad from "../ads/Ad";

export default function ProfileRightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?._id)
  );
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    setFollowed(currentUser.followings.includes(user?._id));
  }, [currentUser, user]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        if (user._id !== undefined) {
          const friendList = await axios.get("/users/friends/" + user._id);
          setFriends(friendList.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

  const followHandler = async () => {
    try {
      if (followed) {
        await axios.put("/users/" + user._id + "/unfollow", {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put("/users/" + user._id + "/follow", {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="rightbar">
        <div className="rightbarWrapper">
          {user.username !== currentUser.username && (
            <button className="rightbarFollowButton" onClick={followHandler}>
              {followed ? "Unfollow" : "Follow"}
              {followed ? <RemoveIcon /> : <AddIcon />}
            </button>
          )}
          <h4 className="rightbarTitle">User information</h4>
          <div className="rightbarInfo">
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">
                <HomeIcon className="userInfoIcon" />
                Lives in
                <span className="rightbarInfoValue">{user.city}</span>
              </span>
            </div>
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">
                <LocationIcon className="userInfoIcon" />
                From
                <span className="rightbarInfoValue">{user.from}</span>
              </span>
            </div>
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">
                <LoveIcon className="userInfoIcon" />
                {user.relationship === 1
                  ? "Single"
                  : user.relationship === 2
                  ? "Married"
                  : "-"}
              </span>
            </div>
          </div>
          <h4 className="rightbarTitle">User friends</h4>
          <div className="rightbarFollowings">
            {friends.map((friend, index) => (
              <Link
                to={`/profile/${friend.username}`}
                style={{ textDecoration: "none" }}
                key={index}
              >
                <div className="rightbarFollowing">
                  <img
                    className="rightbarFollowingImg"
                    src={
                      friend.profilePicture
                        ? PF + friend.profilePicture
                        : PF + "person/noAvatar.jpg"
                    }
                    alt=""
                  />
                  <span className="rightbarFollowingName">
                    {friend.username}
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <Ad />
        </div>
      </div>
    </>
  );
}
