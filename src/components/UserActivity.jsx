import { useEffect, useState } from "react";
import axios from "axios";

export default function UserActivity() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("You are not logged in. Please login to view your activity.");
      setLoading(false);
      return;
    }

    const fetchActivity = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/auth/activity`, {
          headers: { Authorization: token },
        });

        setActivities(res.data);
      } catch (err) {
        setError("There was an error fetching your activity. Please try again.");
        console.error("Error fetching activity:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, [API_URL]); // ✅ FIXED

  if (loading) return <p>Loading your activity...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Your Login/Logout Activity</h2>

      {activities.length === 0 ? (
        <p>No activity found</p>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Login Time</th>
              <th>Logout Time</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {activities.map((a) => {
              const isOffline = !a.isOnline;
              return (
                <tr key={a._id}>
                  <td>{a.name}</td>
                  <td>{a.email}</td>
                  <td>{new Date(a.lastLogin).toLocaleString()}</td>
                  <td>
                    {a.lastLogout
                      ? new Date(a.lastLogout).toLocaleString()
                      : "-"}
                  </td>
                  <td>
                    <span
                      style={{
                        color: isOffline ? "red" : "green",
                        fontWeight: "bold",
                      }}
                    >
                      {isOffline ? "❌ Offline" : "✅ Online"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  background: "white",
  marginTop: "20px",
  borderRadius: "8px",
};