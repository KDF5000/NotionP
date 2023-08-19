import styles from './ArticleItem.module.css';
import Date from './date';

export default function ArticleItem({ id, createTime, title }) {
    return (
        <p className={styles.item}>
            <span className={styles.date}><Date dateString={createTime}></Date></span>
            <span><a href={"/posts/" + id}>{title}</a></span>
        </p>
    );
}