import Head from 'next/head';
import cn from 'classnames';
import Layout, { siteTitle } from '../components/layout';
import styles from '../styles/Home.module.css';
import { queryDatabase } from '../lib/notion';
import Date from '../components/date';

export async function getStaticProps() {
  const allPostsData = await queryDatabase("f532a109abd34b259c6bd1334d277ec8");
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section>
        {allPostsData.map(({ id, title, created_time, abstract }) => (
          <article className={cn(styles.postEntry, styles.tagEntry)}>
            <header className={styles.entryHeader}>
              <h2> {title}</h2>
            </header>
            <div className={styles.entryContent}>
              <p>{abstract}</p>
            </div>
            <footer className={styles.entryFooter}>
              <span title='date'><Date dateString={created_time}></Date></span>
            </footer>
            <a className={styles.entryLink} aria-label={"post link to " + id} href={"/posts/" + id}></a>
          </article>
        ))}
      </section>
    </Layout >
  );
}
