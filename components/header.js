import styles from './header.module.css';

export default function Header({ children, home }) {
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <div className={styles.headerTitle}>
                    <a href="/" accesskey="h" title="PaperMod (Alt + H)">OpenHex's blog</a>
                </div>
                <ul id={styles.menu}>
                    <li>
                        <a href="http://openhex.cn/" title="Tags">
                            <span>Github</span>
                        </a>
                    </li>
                </ul>
            </nav >
        </header >
    );
}