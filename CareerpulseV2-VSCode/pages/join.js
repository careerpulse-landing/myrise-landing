import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  // Insert email into Supabase database
  const { data, error } = await supabase.from("waitlist").insert([{ email }]);

  if (error) {
    console.error("Supabase Error:", error);
    return res.status(500).json({ message: `Supabase Error: ${error.message}` });
  }

  return res.status(200).json({ message: "You're on the waitlist!" });
}
