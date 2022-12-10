import Layout from '../components/Layout';
import { queryDatabase } from '../lib/notion';
import PostIndex from '../components/PostIndex';
import { siteConfig } from '../site.config';

export async function getStaticProps() {
  const allPostsData = await queryDatabase(siteConfig.rootDatabaseId);
  return {
    props: {
      allPostsData,
    },
    revalidate: 10, // In seconds
  };
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <PostIndex posts={allPostsData} />
    </Layout >
  );
}
