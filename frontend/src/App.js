import { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import EventList from "./components/EventList";
import AdminHome from "./components/AdminHome";

function App() {
  const [user, setUser] = useState(null);
  const [showSignup, setShowSignup] = useState(false);

  // Not logged in → Login / Signup
  if (!user) {
    return showSignup ? (
      <Signup goToLogin={() => setShowSignup(false)} />
    ) : (
      <Login
        setUser={setUser}
        goToSignup={() => setShowSignup(true)}
      />
    );
  }

  // ADMIN VIEW
  if (user.role === "ADMIN") {
    return (
      <div className="container mt-3">
        <AdminHome user={user} />

        {/* 🔥 THIS IS THE IMPORTANT PART */}
        <EventList user={user} isAdmin={true} />
      </div>
    );
  }

  // STUDENT VIEW
  return (
    <div className="container mt-3">
      <h4 className="text-center mb-3">
        Welcome {user.name} (Student)
      </h4>

      <EventList user={user} isAdmin={false} />
    </div>
  );
}

export default App;
