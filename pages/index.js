import Head from 'next/head';
import cn from 'classnames';
import Layout, { siteTitle } from '../components/layout';
import styles from '../styles/Home.module.css';
// import { getSortedPostsData } from '../lib/posts';
import { getAllPostsInDatabases } from '../lib/notion';
import Date from '../components/date';

export async function getStaticProps() {
  // const allPostsData = getSortedPostsData();
  const allPostsData = await getAllPostsInDatabases();
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
        {allPostsData.map(({ id, date, title, author, readingTime }) => (
          <article className={cn(styles.postEntry, styles.tagEntry)}>
            <header className={styles.entryHeader}>
              <h2> {title}</h2>
            </header>
            <div className={styles.entryContent}>
              <p>hello this is first post</p>
            </div>
            <footer className={styles.entryFooter}>
              <span title='date'><Date dateString={date}></Date></span>&nbsp;·&nbsp;{author}
            </footer>
            <a className={styles.entryLink} aria-label={"post link to " + id} href={"/posts/" + id}></a>
          </article>
        ))}
      </section>
    </Layout >
  );
}
