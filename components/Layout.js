import styles from './Layout.module.css';
import Head from 'next/head';
import Header from './Header';
import { siteConfig } from '../site.config';

export default function Layout({ children, home }) {
    return (
        <div>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <meta name="robots" content="index, follow" />
                <meta name="description" content={siteConfig.description} />
                <meta name="author" content={siteConfig.author} />
                <meta name="og:title" content={siteConfig.name} />
                <meta
                    property="og:image"
                    content={`https://og-image.vercel.app/${encodeURI(
                        siteConfig.name,
                    )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                />
                <script async src="https://umami.pcursor.run/script.js" data-website-id="aab0d374-3cc2-4ef3-8c6c-91f67226cfa2"></script>
            </Head>

            <Header></Header>
            <main className={styles.container}>{children}</main>
            {/* <Footer></Footer> */}
        </div >

    );
}
