import { useRef } from "react";
import "./register.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const cpassword = useRef();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if (cpassword.current.value !== password.current.value) {
      cpassword.current.setCustomValidity("Passwords don't match");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        navigate("/login");
      } catch (err) {
        var errorMessage = err;
        if (err.response.data.keyPattern) {
          if (err.response.data.keyPattern.email) {
            errorMessage = "User already registered with this email";
          } else if (err.response.data.keyPattern.username) {
            errorMessage = "Username already taken";
          } else {
            errorMessage = "Duplicate key error";
          }
        } else {
          errorMessage = err.response.data;
        }
        navigate("/error", { state: { errorMessage } });
      }
    }
  };

  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h3 className="registerLogo">MySocialWeb</h3>
          <span className="registerDesc">
            MySocialWeb helps you connect and share with the people in your
            life.
          </span>
        </div>
        <div className="registerRight">
          <form className="registerBox" onSubmit={handleClick}>
            <input
              type="text"
              className="registerInput"
              placeholder="Username"
              ref={username}
              required
            />

            <input
              type="email"
              className="registerInput"
              placeholder="Email"
              ref={email}
              required
            />
            <input
              type="password"
              className="registerInput"
              placeholder="Password"
              ref={password}
              minLength="6"
              required
            />
            <input
              type="password"
              className="registerInput"
              placeholder="Confirm Password"
              ref={cpassword}
              minLength="6"
              required
            />

            <button type="submit" className="registerBtn">
              Sign Up
            </button>
            <Link to={"/login"} style={{ textAlign: "center" }}>
              <button className="loginRegisterBtn">Log into Account</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
