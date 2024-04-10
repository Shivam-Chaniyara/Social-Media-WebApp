import "./post.css";
import MoreVerticalIcon from "@mui/icons-material/MoreHoriz";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Post({ post }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const likeSound = new Audio(PF + "like.mp3");
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});

  const { user: currentUser } = useContext(AuthContext);

  const likeHandler = () => {
    try {
      if (currentUser._id !== "undefined") {
        axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
      }
    } catch (err) {
    }
    likeSound.play();
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      if (post.userId !== undefined) {
        const res = await axios.get(`/users?userId=${post.userId}`);
        setUser(res.data);
      }
    };
    fetchUser();
  }, [post.userId]);

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.jpg"
                }
                alt=""
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{moment(post.createdAt).fromNow()}</span>
          </div>
          <div className="postTopRight">
            <MoreVerticalIcon />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.desc}</span>
          <Link to={PF + post.img}>
            <img className="postImg" src={PF + post.img} alt="" />
          </Link>
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="postLikeIcon"
              src={PF + "like.png"}
              onClick={likeHandler}
              alt=""
            />
            <img
              className="postLikeIcon"
              src={PF + "heart.png"}
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">
              {like} people liked this post
            </span>
          </div>
          <div className="postBottomRight">
            <div className="postCommentText">9 comments</div>
          </div>
        </div>
      </div>
    </div>
  );
}
