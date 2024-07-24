import pako from 'pako';

export default function handler(req, res) {
    const { data } = req.query;

    if (!data) {
        return res.status(400).json({ error: 'Data is required' });
    }

    try {
        const compressed = atob(data);
        const decompressed = pako.inflate(compressed, { to: 'string' });

        // Process the decompressed data
        res.status(200).json({ decompressed });
    } catch (error) {
        res.status(500).json({ error: 'Error decoding data' });
    }
}
