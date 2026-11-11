export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const response = await fetch('https://openapi.keycrm.app/v1/pipelines/cards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${process.env.KEYCRM_API_KEY}`,
      },
      body: JSON.stringify(req.body),
    });
    const data = await response.text();
    return res.status(response.status).send(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
