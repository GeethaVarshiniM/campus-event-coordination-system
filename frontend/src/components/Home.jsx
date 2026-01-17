import React from "react";

function Home({ setShowLogin, setShowSignup }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/college.jpg')", // ✅ FIXED
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
          padding: "20px",
        }}
      >
        <div>
          <h1 className="fw-bold mb-3">
            Welcome to <br />
            <span className="text-warning">
              College Event Management System
            </span>
          </h1>

          <p className="lead mb-4">
            Discover Events • Register Easily • Manage Seamlessly
          </p>

          <div className="d-flex justify-content-center gap-3">
            <button
              className="btn btn-success btn-lg px-4"
              onClick={() => setShowLogin(true)}
            >
              Login
            </button>

            <button
              className="btn btn-outline-light btn-lg px-4"
              onClick={() => setShowSignup(true)}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
