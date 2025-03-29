import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  const { email } = req.query;
  if (!email) {
    return res.status(400).send("Missing email parameter.");
  }

  const logFile = path.join(process.cwd(), "email-opens.json");
  let opens = [];

  try {
    opens = JSON.parse(fs.readFileSync(logFile, "utf-8"));
  } catch (error) {
    console.log("No previous logs, creating a new file.");
  }

  if (!opens.includes(email)) {
    opens.push(email);
    fs.writeFileSync(logFile, JSON.stringify(opens, null, 2));
  }

  // Return a 1x1 pixel image for tracking
  res.setHeader("Content-Type", "image/gif");
  res.send(Buffer.alloc(1)); // Tiny transparent image
}
