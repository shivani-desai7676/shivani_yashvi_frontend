import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminFiles() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const API_URL = process.env.REACT_APP_API_URL;  // Use the environment variable

        const res = await axios.get(`${API_URL}/api/admin/users`); // Updated URL here
        console.log("Fetched users:", res.data);
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;

  return (
    <div>
      <h2>All Users</h2>
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Password (hashed)</th>
              <th>Verified</th>
              <th>OTP</th>
              <th>OTP Expiry</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id}>
                <td>{u.name || "-"}</td>
                <td>{u.email || "-"}</td>
                <td>{u.password || "-"}</td>
                <td>{u.isVerified ? "Yes" : "No"}</td>
                <td>{u.otp || "-"}</td>
                <td>{u.otpExpiry ? new Date(u.otpExpiry).toLocaleString() : "-"}</td>
                <td>{u.created_at ? new Date(u.created_at).toLocaleString() : "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}