import styles from './Header.module.css';
import { siteConfig } from '../site.config';

export default function Header({ children, home }) {
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <div className={styles.headerTitle}>
                    <a href="/" accessKey="h" title={siteConfig.name + " (Alt + H)"}>{siteConfig.name}</a>
                </div>
                <ul id={styles.menu}>
                    {
                        siteConfig.navigationLinks.map(({ title, link, pageId }) => (
                            <li key={title}>
                                {link && <a href={link} title={title}><span>{title}</span></a>}
                                {pageId && <a href={"/posts/" + pageId} title={title}><span>{title}</span></a>}
                            </li>
                        ))
                    }
                </ul>
            </nav >
        </header >
    );
}