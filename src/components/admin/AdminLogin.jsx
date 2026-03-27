import { useState } from "react";

export default function AdminLogin({ onNext }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const sendOtp = async () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }

    setLoading(true);

    try {
      const API_URL = process.env.REACT_APP_API_URL;  // Use the environment variable

      const res = await fetch(`${API_URL}/api/admin/send-otp`, {  // Updated URL here
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      // Check if server response is OK
      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      // Parse JSON safely
      const data = await res.json();

      if (data.success) {
        alert("OTP Sent Successfully!");
        onNext(email);
      } else {
        alert(data.message || "Failed to send OTP");
      }

    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Something went wrong. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Admin Login</h2>

      <input
        type="email"
        placeholder="Enter Admin Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <button onClick={sendOtp} disabled={loading}>
        {loading ? "Sending..." : "Send OTP"}
      </button>
    </div>
  );
}