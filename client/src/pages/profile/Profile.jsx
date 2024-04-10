import Feed from "../../components/feed/Feed";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./profile.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import ProfileRightbar from "../../components/profile rightbar/ProfileRightbar";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const params = useParams();
  const username = params.username;

  useEffect(() => {
    const fetchUser = async () => {
      if (username !== undefined) {
        const res = await axios.get(`/users?username=${username}`);
        setUser(res.data);
      }
    };
    fetchUser();
  }, [username]);

  return (
    <>
      <Topbar />
      <div className="profileContainer">
        <div className="profileSidebarContainer">
        <Sidebar />
        </div>
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <Link
                to={
                  user.coverPicture
                    ? PF + user.coverPicture
                    : PF + "person/noCover.jpg"
                }
              >
                <img
                  className="profileCoverImg"
                  src={
                    user.coverPicture
                      ? PF + user.coverPicture
                      : PF + "person/noCover.jpg"
                  }
                  alt=""
                />
              </Link>
              <Link
                to={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.jpg"
                }
              >
                <img
                  className="profileUserImg"
                  src={
                    user.profilePicture
                      ? PF + user.profilePicture
                      : PF + "person/noAvatar.jpg"
                  }
                  alt=""
                />
              </Link>
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <div className="feedContainer">
              <Feed username={username} />
            </div>
            <div className="profileRightbarContainer">
              <ProfileRightbar user={user} />
            </div>
          </div>
          <div className="feedContainerForMobile">
            <Feed username={username} />
          </div>
        </div>
      </div>
    </>
  );
}
