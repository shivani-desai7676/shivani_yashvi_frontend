import { useEffect, useState, useCallback } from "react";
import axios from "axios";

export default function AdminActivity({ type }) {
  const [data, setData] = useState([]);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  // ✅ wrap in useCallback (IMPORTANT)
  const fetchData = useCallback(async () => {
    try {
      const url =
        type === "history"
          ? `${API_URL}/api/admin/activity/history`
          : `${API_URL}/api/admin/activity/status`;

      const res = await axios.get(url);
      setData(res.data);
    } catch (err) {
      console.error("Error fetching activity:", err);
    }
  }, [type, API_URL]);

  // ✅ dependency fixed
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      {data.length === 0 ? (
        <p style={{ textAlign: "center" }}>No activity found</p>
      ) : (
        <table style={table}>
          <thead>
            <tr>
              <th>Email</th>
              {type === "history" && <th>Login Time</th>}
              {type === "history" && <th>Logout Time</th>}
              {type === "status" && <th>Status</th>}
            </tr>
          </thead>

          <tbody>
            {data.map((item, i) => (
              <tr key={i}>
                <td>{item.email}</td>

                {type === "history" && (
                  <>
                    <td>{new Date(item.loginTime).toLocaleString()}</td>
                    <td>
                      {item.logoutTime
                        ? new Date(item.logoutTime).toLocaleString()
                        : "Still Online"}
                    </td>
                  </>
                )}

                {type === "status" && (
                  <td>
                    <span
                      style={{
                        color: item.isOnline ? "green" : "red",
                        fontWeight: "bold"
                      }}
                    >
                      {item.isOnline ? "● Online" : "● Offline"}
                    </span>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const table = {
  width: "100%",
  borderCollapse: "collapse",
  background: "white"
};