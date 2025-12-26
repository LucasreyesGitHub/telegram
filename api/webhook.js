
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(200).send('OK')
  }

  const message = req.body.message
  if (!message || !message.text) {
    return res.status(200).send('No text')
  }

  const data = {
    chat_id: message.chat.id,
    username: message.from.username || 'sin_username',
    text: message.text,
    created_at: new Date().toISOString()
  }

  const { error } = await supabase
    .from('messages')
    .insert([data])

  if (error) {
    console.error(error)
    return res.status(500).json({ error })
  }

  res.status(200).json({ ok: true })
}
