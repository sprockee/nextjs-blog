import pako from 'pako';
import { Base64 } from 'js-base64';

const MAX_INPUT_LENGTH = 4096; // Define max length for the encoded string

export default function handler(req, res) {
  const { data } = req.query;

  if (!data) {
    return res.status(400).json({ error: 'Data is required' });
  }

  if (data.length > MAX_INPUT_LENGTH) {
    return res.status(413).json({ error: 'Input data too large' });
  }

  try {
    const decoded = Base64.toUint8Array(data); // Decode to Uint8Array
    const decompressed = pako.inflate(decoded, { to: 'string' });

    // Process the decompressed data
    res.status(200).json({ decompressed });
  } catch (error) {
    res.status(500).json({ error: 'Error decoding data' });
  }
}
