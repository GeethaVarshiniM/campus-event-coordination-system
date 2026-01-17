import React, { useState } from "react";
import API from "../services/api";

function EventForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState(""); // STRING date
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !venue || !date) {
      alert("All fields are required");
      return;
    }

    setLoading(true);

    API.post("/events", {
      title,
      description,
      venue,
      date // sent as STRING
    })
      .then(() => {
        alert("Event created successfully");
        setTitle("");
        setDescription("");
        setVenue("");
        setDate("");
      })
      .catch((err) => {
        console.error(err);
        alert("Unable to create event. Check backend logs.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Create Event</h5>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* TITLE */}
            <div className="mb-3">
              <label className="form-label">Event Title</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter event title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* DESCRIPTION */}
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                rows="5"
                placeholder="Enter event description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            {/* VENUE */}
            <div className="mb-3">
              <label className="form-label">Venue</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter venue"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                required
              />
            </div>

            {/* DATE AS TEXT */}
            <div className="mb-4">
              <label className="form-label">Event Date</label>
              <input
                type="text"
                className="form-control"
                placeholder="YYYY-MM-DD (example: 2026-01-01)"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-success w-100"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Event"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EventForm;
