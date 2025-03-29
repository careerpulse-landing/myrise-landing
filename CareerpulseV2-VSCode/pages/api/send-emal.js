export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    console.log("📨 Sending email to:", email);
    console.log("🔑 Using API Key:", process.env.RESEND_API_KEY); // Debugging

    // Send email via Resend API
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`, // ✅ Authentication added
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "MyRise <noreply@trackmyrise.live>",
        to: email,
        subject: "🎉 Welcome to MyRise – You’re In!",
        text: "Thanks for joining the waitlist! We'll notify you when we launch. 🚀",
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ Resend API Error:", data);
      return res.status(response.status).json({ message: "Failed to send email", error: data });
    }

    console.log("✅ Email sent successfully:", data);
    return res.status(200).json({ message: "Email sent!", data });
  } catch (error) {
    console.error("🔥 API ERROR:", error);
    return res.status(500).json({ message: "Failed to send email", error });
  }
}
