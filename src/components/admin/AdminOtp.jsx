import { useState } from "react";

export default function AdminOtp({ email, onVerified }) {
  const [otp, setOtp] = useState("");

  const verifyOtp = async () => {
    const API_URL = process.env.REACT_APP_API_URL;  // Use the environment variable

    try {
      const res = await fetch(`${API_URL}/api/admin/verify-otp`, {  // Updated URL here
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          otp
        })
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("admin", email);
        onVerified();
      } else {
        alert("Invalid OTP");
      }

    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Enter OTP</h2>

      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <br /><br />

      <button onClick={verifyOtp}>
        Verify OTP
      </button>
    </div>
  );
}