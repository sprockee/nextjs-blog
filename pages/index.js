// pages/index.js
import Head from 'next/head';
import { useState } from 'react';
import EmailButton from '../components/EmailButton';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [urlToCompress, setUrlToCompress] = useState('');

  const handleUrlChange = (event) => {
    setUrlToCompress(event.target.value);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Product Comparison</title>
        <meta name="description" content="Share your product comparison" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Share Product Comparison URL via Email</h1>

        <input
          type="text"
          value={urlToCompress}
          onChange={handleUrlChange}
          placeholder="Enter URL to compress"
          className={styles.inputField} // Assuming you'll add some styling
        />

        <EmailButton url={urlToCompress} />
      </main>
    </div>
  );
}
