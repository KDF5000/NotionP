import Layout, { siteTitle } from '../components/layout';
import { queryDatabase } from '../lib/notion';
import ArticleItem from '../components/articleItem.module';

export async function getStaticProps() {
  const allPostsData = await queryDatabase("f532a109abd34b259c6bd1334d277ec8");
  return {
    props: {
      allPostsData,
      revalidate: 10, // In seconds
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <article>
        {allPostsData.map(({ id, title, created_time, abstract }) => (
          <ArticleItem id={id} createTime={created_time} title={title}></ArticleItem>
        ))}
      </article>
    </Layout >
  );
}
