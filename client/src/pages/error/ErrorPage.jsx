import "./errorpage.css";
import { useLocation, Link } from "react-router-dom";

export default function ErrorPage() {
  const location = useLocation();
  const errorMessage = location.state.errorMessage;
  return (
    <>
      <div className="error">
        <div className="errorWrapper">
          <div className="errorLeft">
            <h3 className="logo">MySocialWeb</h3>
            <span className="errorDesc">
              MySocialWeb helps you connect and share with the people in your
              life.
            </span>
          </div>
          <div className="errorRight">
            <div className="error-container">
              <div className="error-icon">⚠️</div>
              <div className="error-heading">Oops! Something went wrong.</div>
              <div className="error-message">
                Sorry, the page you were looking for could not be found.
              </div>
                <p style={{color:"red"}}>This is the error message : {errorMessage}</p>
              <Link to={"/"}>
                <div className="error-home-link">Go to Home</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
