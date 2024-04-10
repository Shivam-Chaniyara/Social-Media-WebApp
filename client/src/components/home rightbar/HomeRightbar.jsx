import "./homerightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import Ad from "../ads/Ad";

export default function HomeRightbar() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <>
      <div className="rightbar">
        <div className="rightbarWrapper">
          <div className="birthdayContainer">
            <img className="birthdayImg" src={PF + "gift.png"} alt="" />
            <span className="birthdayText">
              <b>John Doe</b> and <b>3 other friends</b> have a birthday today
            </span>
          </div>
          <Ad />
          <h4 className="rightbarTitle">Online Friends</h4>
          <ul className="rightbarFriendList">
            {Users.map((u) => (
              <Online key={u.id} user={u} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
