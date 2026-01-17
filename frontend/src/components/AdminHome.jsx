import { useState } from "react";
import EventForm from "./EventForm";
import EventList from "./EventList";

function AdminHome({ user }) {
  const [activePage, setActivePage] = useState(null);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      {/* ===== LEFT SIDEBAR ===== */}
      <div
        style={{
          width: "220px",
          background: "#1e293b",
          color: "white",
          padding: "20px",
          flexShrink: 0
        }}
      >
        <h4>Admin Panel</h4>
        <hr />

        <button
          onClick={() => setActivePage("create")}
          className="btn btn-light w-100 mb-2"
        >
          Create Event
        </button>

        <button
          onClick={() => setActivePage("manage")}
          className="btn btn-light w-100 mb-2"
        >
          Manage Events
        </button>

        <button
          className="btn btn-danger w-100 mt-4"
          onClick={() => window.location.reload()}
        >
          Logout
        </button>
      </div>

      {/* ===== RIGHT CONTENT ===== */}
      <div
        style={{
          flex: 1,
          padding: "30px",
          overflowY: "auto"
        }}
      >
        {activePage === null && (
          <p className="text-muted">
            Please select an option from the admin panel.
          </p>
        )}

        {activePage === "create" && <EventForm />}

        {activePage === "manage" && (
          <EventList user={user} isAdmin={true} />
        )}
      </div>
    </div>
  );
}

export default AdminHome;
