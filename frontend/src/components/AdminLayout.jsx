import React from "react";

function AdminLayout({ children, setActiveTab }) {
  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      
      {/* SIDEBAR */}
      <div
        style={{
          width: "250px",
          backgroundColor: "#1f2937",
          color: "white",
          padding: "20px",
        }}
      >
        <h4 className="text-center mb-4">Admin Panel</h4>

        <button
          className="btn btn-outline-light w-100 mb-2"
          onClick={() => setActiveTab("home")}
        >
          Dashboard
        </button>

        <button
          className="btn btn-outline-light w-100 mb-2"
          onClick={() => setActiveTab("createEvent")}
        >
          Create Event
        </button>

        <button
          className="btn btn-outline-light w-100 mb-2"
          onClick={() => setActiveTab("events")}
        >
          Manage Events
        </button>

        <button
          className="btn btn-outline-light w-100"
          onClick={() => setActiveTab("analytics")}
        >
          Analytics
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-grow-1 p-4 bg-light">
        {children}
      </div>
    </div>
  );
}

export default AdminLayout;
