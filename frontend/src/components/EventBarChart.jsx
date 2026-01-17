import React, { useEffect, useState } from "react";
import API from "../services/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

function EventBarChart({ eventId }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!eventId) return;

    API.get(`/registrations/stats/event/${eventId}`)
      .then(res => {
        const formatted = res.data.map(item => ({
          name: item[0],
          registrations: item[1]
        }));
        setData(formatted);
      });
  }, [eventId]);

  return (
    <div className="card shadow-lg border-0 h-100">
      <div className="card-body">
        <h6 className="fw-bold mb-3 text-primary">
          📊 Registrations Count
        </h6>

        {data.length === 0 ? (
          <p className="text-muted text-center">
            No data available for this event
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar
                dataKey="registrations"
                fill="url(#colorBar)"
                radius={[8, 8, 0, 0]}
              />
              <defs>
                <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#4f46e5" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

export default EventBarChart;
