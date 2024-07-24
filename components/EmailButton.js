import React, { useState } from 'react';
import pako from 'pako';
import { Base64 } from 'js-base64';
import styles from './EmailButton.module.css';

const EmailButton = () => {
    const [compressedUrl, setCompressedUrl] = useState('');
    const [decompressedData, setDecompressedData] = useState('');

    const compressAndEncode = (data) => {
        const compressed = pako.deflate(data, { to: 'string' });
        const encoded = Base64.encodeURI(compressed);
        return encoded;
    };

    const decompressAndDecode = async (encodedData) => {
        const response = await fetch(`/api/decompress?data=${encodeURIComponent(encodedData)}`);
        const result = await response.json();
        return result.decompressed;
    };

    const handleCompressAndSendEmail = async () => {
        const baseUrl = 'https://testsite.com/Products/';
        const dataToCompress = 'fuses-overcurrent-protection/polyswitch-resettable-pptc-devices/radial-leaded-polyswitch-resettable-pptc-devices#ImVuYWJsZVF1ZXJ5U3ludGF4PXRydWUmY3E9KCU0MGxldmVsdGhyZWVjYXRlZ29yeSUzRCUzRCUyMlJhZGlhbCUyMExlYWRlZCUyMC0lMjBQb2x5U3dpdGNoJUMyJUFFJTIwUmVzZXR0YWJsZSUyMFBQVEMlMjBEZXZpY2VzJTIyKSglNDBsZXZlbG51bWJlciUzRDcpKCU0MGxldmVsdHdvY2F0ZWdvcnklM0QlM0QlMjJQb2x5U3dpdGNoJUMyJUFFJTIwUmVzZXR0YWJsZSUyMFBQVEMlMjBEZXZpY2VzJTIyKSglNDBsZXZlbG9uZWNhdGVnb3J5JTNEJTNEJTIyRnVzZXMlMjAlMjYlMjBPdmVyY3VycmVudCUyMFByb3RlY3Rpb24lMjIpIg==';

        const encodedData = compressAndEncode(dataToCompress);
        const newCompressedUrl = `${baseUrl}?data=${encodedData}`;

        // Update state with the compressed URL
        setCompressedUrl(newCompressedUrl);

        // Decompress the data to verify
        const newDecompressedData = await decompressAndDecode(encodedData);
        setDecompressedData(newDecompressedData);
    };

    return (
        <div>
            <button onClick={handleCompressAndSendEmail}>Compress and Show Data</button>
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
