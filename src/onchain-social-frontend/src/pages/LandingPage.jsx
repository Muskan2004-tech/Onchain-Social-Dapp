import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="floating-blobs"></div> {/* Optional animated background */}
      <div className="landing-box animate-in">
        <h1 className="landing-title">Welcome to OnChain Social</h1>
        <p className="landing-description">
          A decentralized, secure, and blockchain-powered social network built
          for the future. Connect, share, and grow — with full control of your data.
        </p>
        <div className="button-group">
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/register")}>Register</button>
        </div>
        <p className="creator-tag">
         
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
