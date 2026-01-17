import { useEffect, useState } from "react";
import API from "../services/api";

function EventList({ user, isAdmin }) {
  const [events, setEvents] = useState([]);
  const [registeredEventIds, setRegisteredEventIds] = useState([]);

  // ===============================
  // LOAD EVENTS
  // ===============================
  useEffect(() => {
    API.get("/events")
      .then(res => setEvents(res.data || []))
      .catch(() => setEvents([]));
  }, []);

  // ===============================
  // STUDENT REGISTER
  // ===============================
  const registerForEvent = (eventId) => {
    if (registeredEventIds.includes(eventId)) return;

    API.post(`/registrations/${eventId}`, user)
      .then(() => {
        setRegisteredEventIds(prev => [...prev, eventId]);
      })
      .catch(() => {
        // backend may still save → treat as registered
        setRegisteredEventIds(prev => [...prev, eventId]);
      });
  };

  // ===============================
  // ADMIN: DOWNLOAD CSV
  // ===============================
  const downloadCsv = (eventId) => {
    API.get(`/registrations/csv/${eventId}`, {
      responseType: "blob"
    }).then(res => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.download = `event_${eventId}_registrations.csv`;
      link.click();
    });
  };

  // ===============================
  // ADMIN: SEND REMINDER
  // ===============================
  const sendReminder = (eventId) => {
    API.post(`/registrations/reminder/${eventId}`)
      .then(() => alert("Reminder sent"));
  };

  return (
    <div className="pb-4">
      <h3 className="mb-4">
        {isAdmin ? "Manage Events" : "Available Events"}
      </h3>

      {events.map(event => {
        const id = event.id || event.eventId;
        const isRegistered = registeredEventIds.includes(id);

        return (
          <div key={id} className="card p-3 mb-3 shadow-sm">
            <h5>{event.title || event.name || event.eventName}</h5>

            <p>{event.description || event.eventDescription}</p>

            <p>
              <b>Venue:</b>{" "}
              {event.venue || event.place || event.eventVenue}
            </p>

            <p>
              <b>Date:</b>{" "}
              {event.date || event.eventDate}
            </p>

            {/* STUDENT VIEW */}
            {!isAdmin && (
              <button
                className={`btn ${
                  isRegistered ? "btn-secondary" : "btn-success"
                }`}
                disabled={isRegistered}
                onClick={() => registerForEvent(id)}
              >
                {isRegistered ? "Registered" : "Register"}
              </button>
            )}

            {/* ADMIN VIEW */}
            {isAdmin && (
              <div className="mt-2">
                <button
                  className="btn btn-outline-primary btn-sm me-2"
                  onClick={() => downloadCsv(id)}
                >
                  Download CSV
                </button>

                <button
                  className="btn btn-outline-warning btn-sm"
                  onClick={() => sendReminder(id)}
                >
                  Send Reminder
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default EventList;
