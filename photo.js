export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { ref, maxwidth = 800 } = req.query;
  const KEY = process.env.GOOGLE_PLACES_KEY;
  const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxwidth}&photo_reference=${ref}&key=${KEY}`;
  const r = await fetch(url);
  const buf = await r.arrayBuffer();
  const ct = r.headers.get('content-type') || 'image/jpeg';
  res.setHeader('Content-Type', ct);
  res.setHeader('Cache-Control', 'public, max-age=86400');
  res.status(200).send(Buffer.from(buf));
}
