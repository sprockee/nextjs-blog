import React from 'react';
import pako from 'pako';

const EmailButton = () => {
    const compressAndEncode = (data) => {
        const compressed = pako.deflate(data, { to: 'string' });
        return btoa(compressed);
    };

    const sendEmail = () => {
        const baseUrl = 'https://testsite.com/Products/';
        const dataToCompress = 'fuses-overcurrent-protection/polyswitch-resettable-pptc-devices/radial-leaded-polyswitch-resettable-pptc-devices#ImVuYWJsZVF1ZXJ5U3ludGF4PXRydWUmY3E9KCU0MGxldmVsdGhyZWVjYXRlZ29yeSUzRCUzRCUyMlJhZGlhbCUyMExlYWRlZCUyMC0lMjBQb2x5U3dpdGNoJUMyJUFFJTIwUmVzZXR0YWJsZSUyMFBQVEMlMjBEZXZpY2VzJTIyKSglNDBsZXZlbG51bWJlciUzRDcpKCU0MGxldmVsdHdvY2F0ZWdvcnklM0QlM0QlMjJQb2x5U3dpdGNoJUMyJUFFJTIwUmVzZXR0YWJsZSUyMFBQVEMlMjBEZXZpY2VzJTIyKSglNDBsZXZlbG9uZWNhdGVnb3J5JTNEJTNEJTIyRnVzZXMlMjAlMjYlMjBPdmVyY3VycmVudCUyMFByb3RlY3Rpb24lMjIpIg==';

        const encodedData = compressAndEncode(dataToCompress);
        const compressedUrl = `${baseUrl}?data=${encodedData}`;

        console.log(compressedUrl);  // Output the compressed URL

        const mailtoLink = `mailto:?subject=Product Comparison&body=Check out this comparison: ${compressedUrl}`;
        window.location.href = mailtoLink;
    };

    return (
        <button onClick={sendEmail}>Share via Email</button>
    );
};

export default EmailButton;
