export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method Not Allowed" });
    }
  
    try {
      const event = req.body;
  
      console.log("📩 Received Webhook Event:", event);
  
      if (event.type === "email.delivered") {
        console.log(`✅ Email delivered to ${event.email}`);
      } else if (event.type === "email.opened") {
        console.log(`👀 Email opened by ${event.email}`);
      } else if (event.type === "email.clicked") {
        console.log(`🔗 Email link clicked by ${event.email}`);
      }
  
      return res.status(200).json({ message: "Webhook received" });
    } catch (error) {
      console.error("🔥 Webhook Error:", error);
      return res.status(500).json({ message: "Webhook processing failed", error });
    }
  }
  