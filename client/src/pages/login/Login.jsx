import "./login.css";
import { useContext, useRef } from "react";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const { isFetching, dispatch } = useContext(AuthContext);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await loginCall(
        { email: email.current.value, password: password.current.value },
        dispatch
      );
    } catch (err) {
      const errorMessage = err.response.data;
      navigate("/error", { state: { errorMessage } });
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">MySocialWeb</h3>
          <span className="loginDesc">
            MySocialWeb helps you connect and share with the people in your
            life.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              type="email"
              className="loginInput"
              placeholder="Email"
              ref={email}
              required
            />
            <input
              type="password"
              className="loginInput"
              placeholder="Password"
              minLength="6"
              ref={password}
              required
            />
            <button className="loginBtn" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="inherit" size="20px" />
              ) : (
                "Log in"
              )}
            </button>
            <span className="loginForgot">Forgotten Password?</span>
            <Link to={"/register"} style={{ textAlign: "center" }}>
              <button className="loginRegisterBtn">
                {isFetching ? (
                  <CircularProgress color="inherit" size="20px" />
                ) : (
                  "Create new account"
                )}
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
