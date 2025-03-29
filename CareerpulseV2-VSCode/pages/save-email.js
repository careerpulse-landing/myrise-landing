// pages/api/save-email.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  const { error, data } = await supabase
    .from('waitlist')
    .insert([{ email }]);

  if (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error saving email', error });
  }

  return res.status(200).json({ message: '✅ Email saved!', data });
}
