import LZString from 'lz-string';
import { Base64 } from 'js-base64';

export default function handler(req, res) {
    const { data } = req.query;

    if (!data) {
        return res.status(400).json({ error: 'Data is required' });
    }

    try {
        const decoded = Base64.decode(data);
        const decompressed = LZString.decompress(decoded);

        // Process the decompressed data
        res.status(200).json({ decompressed });
    } catch (error) {
        res.status(500).json({ error: 'Error decoding data' });
    }
}
