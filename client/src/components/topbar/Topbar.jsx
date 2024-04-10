import "./topbar.css";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Sidebar from "../sidebar/Sidebar";

export default function Topbar() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState("false");
  const [showMenu, setShowMenu] = useState("false");

  const logoutHandler = (e) => {
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload(false);
  };

  const searchHandler = (e) => {
    e.preventDefault();
    setShowSearch(!showSearch);
  };

  const menuHandler = (e) => {
    e.preventDefault();
    setShowMenu(!showMenu);
  };

  return (
    <>
      <div className="topbarContainer">
        <div className="topbarLeft">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="logoText">MySocialWeb</span>
            <img src={PF + "logo.png"} className="logoImg" alt="" />
          </Link>
        </div>
        <div className="topbarCenter">
          <div className="searchBar">
            <SearchIcon className="searchIcon" onClick={searchHandler} />
            <input
              type="text"
              placeholder="Search for friends, posts and videos"
              className="searchInput"
            />
            <input
              type="text"
              placeholder="Search for friends, posts and videos"
              className={`searchInputForMobile ${showSearch ? "" : "showSearch"}`}
            />
          </div>
        </div>
        <div className="topbarRight">
          <div className="topbarLinks">
            <span className="topbarLink">
              <MenuIcon onClick={menuHandler} />
            </span>
            <div className={`sidebarMobile ${showMenu ? "" : "showMenu"}`}>
              <Sidebar />
            </div>
          </div>
          <div className="topbarIcons">
            <div className="topbarIconItem">
              <PersonIcon />
              <span className="topbarIconBadge">1</span>
            </div>
            <div className="topbarIconItem">
              <ChatIcon />
              <span className="topbarIconBadge">2</span>
            </div>
            <div className="topbarIconItem">
              <NotificationsIcon />
              <span className="topbarIconBadge">1</span>
            </div>
          </div>
          <Link to={`/profile/${user.username}`}>
            <img
              src={
                user.profilePicture
                  ? PF + user.profilePicture
                  : PF + "/person/noAvatar.jpg"
              }
              alt=""
              className="topbarImg"
            />
          </Link>
          <LogoutIcon className="logoutIcon" onClick={logoutHandler} />
        </div>
      </div>
    </>
  );
}
