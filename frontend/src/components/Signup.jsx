import React, { useState } from "react";
import API from "../services/api";

function Signup({ goToLogin }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    regNumber: "",
    phone: "",
    department: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const signup = () => {
    API.post("/auth/signup", form)
      .then(() => {
        alert("Signup successful! Please login.");
        goToLogin(); // 🔥 switch back to login
      })
      .catch(err => {
        alert(err.response?.data || "Signup failed");
      });
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <div className="card shadow p-4" style={{ width: "450px" }}>
        <h4 className="text-center mb-3">Student Sign Up</h4>

        <input
          name="name"
          placeholder="Name"
          className="form-control mb-2"
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          className="form-control mb-2"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="form-control mb-2"
          onChange={handleChange}
        />

        <input
          name="regNumber"
          placeholder="Register Number"
          className="form-control mb-2"
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone"
          className="form-control mb-2"
          onChange={handleChange}
        />

        <input
          name="department"
          placeholder="Department"
          className="form-control mb-3"
          onChange={handleChange}
        />

        <button className="btn btn-success w-100" onClick={signup}>
          Create Account
        </button>

        <p className="text-center mt-3">
          Already have an account?{" "}
          <button
            className="btn btn-link p-0"
            onClick={goToLogin}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default Signup;
