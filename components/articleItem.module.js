import styles from "./articleItem.module.css";
import Date from './date';

export default function ArticleItem({ id, createTime, title }) {
    return (
        <p className={styles.item}>
            <code className={styles.code}><Date dateString={createTime}></Date></code>
            <a href={"/posts/" + id}>{title}</a>
        </p >
    );
}