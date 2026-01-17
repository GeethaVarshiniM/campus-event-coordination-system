import React, { useState } from "react";
import AdminLayout from "./AdminLayout";
import AdminHome from "./AdminHome";
import EventForm from "./EventForm";
import EventList from "./EventList";
import DepartmentPieChart from "./DepartmentPieChart";
import EventBarChart from "./EventBarChart";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("home");

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <AdminHome />;

      case "createEvent":
        return <EventForm />;

      case "events":
        return <EventList isAdmin={true} />;

      case "analytics":
        return (
          <>
            <h4 className="mb-4">Event Analytics</h4>
            <div className="row">
              <div className="col-md-6">
                <EventBarChart />
              </div>
              <div className="col-md-6">
                <DepartmentPieChart />
              </div>
            </div>
          </>
        );

      default:
        return <AdminHome />;
    }
  };

  return (
    <AdminLayout setActiveTab={setActiveTab}>
      {renderContent()}
    </AdminLayout>
  );
}

export default AdminDashboard;
