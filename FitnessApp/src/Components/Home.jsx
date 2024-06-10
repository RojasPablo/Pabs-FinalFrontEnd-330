import React from "react";
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { useContext } from "react";
import Profile from "./Profile";

const Home = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      {!user && (
        <div className="home-container">
          <h2>Welcome to Achievement Hunter</h2>
          <p>
            <br></br>
            Your one-stop destination for workout log management
            <br></br>&<br></br>
            achieving greater heights through our <span>Milestones</span>{" "}
            system.
            <br></br>
            <br></br>
            <span>Sign up for free today!</span>
          </p>
          <div className="login-links">
            <Link to="/signup" className="signup-link">
              Sign Up
            </Link>
            <div>
              <Link to="/login" className="login-link">
                Login
              </Link>
            </div>
          </div>
        </div>
      )}
      {user && <Profile />}
    </>
  );
};

export default Home;
