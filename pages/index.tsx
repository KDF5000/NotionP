import { queryDatabase } from '../lib/notion';
import { Navigation } from '../components/navigation';
import { Footer } from '../components/footer';
import { siteConfig } from '../site.config';
import { PostList } from '../components/post-list';
import Layout from '../components/layout';
import { GetStaticProps } from 'next';

type Props = {
  allPostsData: any[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const allPostsData = await queryDatabase(siteConfig.rootDatabaseId);
  const sortedPosts = [...allPostsData].sort((a, b) => {
    const timeA = a?.created_time ? new Date(a.created_time).getTime() : 0;
    const timeB = b?.created_time ? new Date(b.created_time).getTime() : 0;
    return timeB - timeA;
  });
  return {
    props: {
      allPostsData: sortedPosts,
    },
    revalidate: 10, // In seconds
  };
}

export default function Home({ allPostsData }: Props) {
  return (
    <Layout title={siteConfig.name}>
      <header className="mb-16 text-center">
        <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white transition-colors">分布式存储思考</h1>
        <p className="text-muted-foreground dark:text-gray-400 transition-colors">
          探索构建简单可靠的分布式存储与数据库系统
        </p>
      </header>
      <h2 className="mb-8 text-xl font-semibold text-gray-900 dark:text-white transition-colors">所有文章：</h2>
      <PostList posts={allPostsData} />
    </Layout>
  )
}
