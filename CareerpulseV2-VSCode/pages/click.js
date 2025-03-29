import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  const { email, link } = req.query;
  if (!email || !link) {
    return res.status(400).send("Missing parameters.");
  }

  const logFile = path.join(process.cwd(), "clicks.json");
  let clicks = [];

  try {
    clicks = JSON.parse(fs.readFileSync(logFile, "utf-8"));
  } catch (error) {
    console.log("No previous logs, creating a new file.");
  }

  clicks.push({ email, link, timestamp: new Date().toISOString() });
  fs.writeFileSync(logFile, JSON.stringify(clicks, null, 2));

  res.redirect(`https://trackmyrise.live`); // Redirect to website after tracking
}
