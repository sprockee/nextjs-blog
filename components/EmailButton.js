import React, { useState } from 'react';
import pako from 'pako';
import { Base64 } from 'js-base64';
import styles from './EmailButton.module.css';

const EmailButton = ({ url }) => {
  const [compressedUrl, setCompressedUrl] = useState('');
  const [decompressedData, setDecompressedData] = useState('');
  const [error, setError] = useState('');

  const compressAndEncode = (data) => {
    try {
      const compressed = pako.deflate(data, { to: 'string' });
      const encoded = Base64.encodeURI(compressed);
      return encoded;
    } catch (e) {
      console.error('Compression/Encoding error:', e);
      setError('Error during data compression.');
      return null;
    }
  };

  // Client-side decompression function
  const decompressClientSide = (encodedData) => {
    try {
      const decodedData = Base64.toUint8Array(encodedData);
      const decompressed = pako.inflate(decodedData, { to: 'string' });
      return decompressed;
    } catch (e) {
      console.error('Client-side decompression error:', e);
      setError('Error during data decompression.');
      return null;
    }
  };

  const handleCompressAndSendEmail = () => { // Removed async
    if (!url || url.trim() === '') {
      setError('Please enter a URL to compress.');
      setCompressedUrl('');
      setDecompressedData('');
      return;
    }
    setError('');

    const baseUrl = 'https://testsite.com/Products/';
    const dataToCompress = url;

    const encodedData = compressAndEncode(dataToCompress);

    if (!encodedData) {
      // Error already set by compressAndEncode
      setCompressedUrl('');
      setDecompressedData('');
      return;
    }

    const newCompressedUrl = `${baseUrl}?data=${encodedData}`;
    setCompressedUrl(newCompressedUrl);

    // Decompress the data client-side to verify
    const newDecompressedData = decompressClientSide(encodedData);
    if (newDecompressedData !== null) {
      setDecompressedData(newDecompressedData);
    } else {
      // Error already set by decompressClientSide
      setDecompressedData('');
      // Optionally, prevent email sending if decompression fails for verification
      // For now, we'll still attempt to send the email as the compressed URL is formed.
    }

    // Open email client with mailto
    try {
      const mailtoLink = `mailto:?subject=Product Comparison&body=Check out this product comparison:${newCompressedUrl}`;
      window.location.href = mailtoLink;
    } catch (e) {
      console.error('Failed to open email client:', e);
      setError('Could not open email client. Please copy the URL manually.');
      // We still keep compressedUrl and decompressedData visible for the user
    }
  };

  return (
    <div>
      <button
        className={styles.button}
        onClick={handleCompressAndSendEmail}
        disabled={!url || url.trim() === ''}
      >
        Send Email
      </button>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.urlContainer}>
        <h3>Compressed URL:</h3>
        <p className={styles.url}>{compressedUrl}</p>
      </div>
      <div className={styles.urlContainer}>
        <h3>Decompressed Data:</h3>
        <p className={styles.url}>{decompressedData}</p>
      </div>
    </div>
  );
};

export default EmailButton;
