import "./home.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import HomeRightbar from "../../components/home rightbar/HomeRightbar";

export default function Home() {
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <div className="homeSidebarContainer">
          <Sidebar />
        </div>
        <Feed />
        <div className="homeRightbarContainer">
          <HomeRightbar />
        </div>
      </div>
    </>
  );
}
