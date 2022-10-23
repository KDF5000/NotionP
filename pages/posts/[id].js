import Head from 'next/head';
import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Date from '../../components/date';
import styles from '../../styles/id.module.css';

export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);
    return {
        props: {
            postData,
        },
    };
}

export default function Post({ postData }) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>

            <article className={styles.singlePage}>
                <header className={styles.postHeader}>
                    <h1 className={styles.postTile}>
                        {postData.title}
                    </h1>
                    <div className={styles.postMeta}>
                        <span title='date'><Date dateString={postData.date}></Date></span>&nbsp;·&nbsp;{postData.readingTime} min&nbsp;·&nbsp;{postData.author}
                    </div>
                </header>

                {/* {{- partial "toc.html" . }} */}
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>
        </Layout >
    );
}