import { createClient } from '@supabase/supabase-js';

// Initialize Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    console.log('📨 Saving email:', email);

    // Insert email into Supabase
    const { data, error } = await supabase.from('waitlist').insert([{ email }]);

    if (error) {
      console.error('❌ Supabase Error:', error);
      return res.status(500).json({ message: 'Failed to save email', error });
    }

    console.log('✅ Email saved successfully:', data);
    return res.status(200).json({ message: 'Email saved!', data });
  } catch (error) {
    console.error('🔥 API ERROR:', error);
    return res.status(500).json({ message: 'Failed to process request', error });
  }
}
