// pages/index.js
import Head from 'next/head';
import EmailButton from '../components/EmailButton';
import styles from '../styles/Home.module.css';

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Product Comparison</title>
                <meta name="description" content="Share your product comparison" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Share Product Comparison URL via Email
                </h1>

                <EmailButton />
            </main>
        </div>
    );
}
