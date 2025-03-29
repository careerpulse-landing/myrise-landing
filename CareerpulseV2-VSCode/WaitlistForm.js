import { useState } from "react";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setMessage(data.message);

      if (response.ok) setEmail("");
    } catch (err) {
      console.error("Network Error:", err);
      setMessage("❌ Error sending email.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto flex flex-col gap-4">
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-3 rounded-md text-black shadow-md"
        required
      />
      <button type="submit" className="bg-rose-500 text-white py-2 rounded-md font-semibold">
        Join the Waitlist
      </button>
      {message && <p className="text-green-400">{message}</p>}
    </form>
  );
}
