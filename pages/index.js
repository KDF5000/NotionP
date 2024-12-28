import { queryDatabase } from '../lib/notion';
import { Navigation } from '../components/navigation';
import { Footer } from '../components/footer';
import { siteConfig } from '../site.config';
import { PostList } from '../components/post-list';
import Layout from '../components/layout';

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
    <Layout title={siteConfig.name}>
      <header className="mb-16 text-center">
        <h1 className="mb-2 text-3xl font-bold">分布式存储思考</h1>
        <p className="text-muted-foreground">
          探索构建简单可靠的分布式存储与数据库系统
        </p>
      </header>
      <h2 className="mb-8 text-xl font-semibold">所有文章：</h2>
      <PostList posts={allPostsData} />
    </Layout>
  )
}
