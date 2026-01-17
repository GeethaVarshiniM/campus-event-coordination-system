import React, { useEffect, useState } from "react";
import API from "../services/api";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
  Legend
} from "recharts";

const COLORS = [
  "#6366f1",
  "#22c55e",
  "#f97316",
  "#ef4444",
  "#06b6d4",
  "#a855f7"
];

function DepartmentPieChart({ eventId }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!eventId) return;

    API.get(`/registrations/stats/department/${eventId}`)
      .then(res => {
        const formatted = res.data.map(item => ({
          name: item[0],
          value: item[1]
        }));
        setData(formatted);
      });
  }, [eventId]);

  return (
    <div className="card shadow-lg border-0 h-100">
      <div className="card-body">
        <h6 className="fw-bold mb-3 text-success">
          🏫 Department Participation
        </h6>

        {data.length === 0 ? (
          <p className="text-muted text-center">
            No registrations yet
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={4}
              >
                {data.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

export default DepartmentPieChart;
