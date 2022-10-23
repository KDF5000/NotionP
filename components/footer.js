import styles from './footer.module.css';

export default function Footer({ children, home }) {
    return (
        <footer class={styles.footer}>
            <span>&copy; 2022 <a href="/">PaperMod</a></span>
            <span>
                Powered by
                <a href="https://gohugo.io/" rel="noopener noreferrer" target="_blank">Hugo</a> &
                <a href="https://github.com/KDF5000/notion-PaperMod/" rel="noopener" target="_blank">Notion-PaperMod</a>
            </span>
        </footer >
    );
}