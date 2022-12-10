import ArticleItem from './ArticleItem';

export default function Index({ posts }) {
    return (
        <article>
            {posts.map(({ id, title, created_time, abstract }) => (
                <ArticleItem key={id} id={id} createTime={created_time} title={title}></ArticleItem>
            ))}
        </article>
    );
}