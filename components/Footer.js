import styles from './Footer.module.css';
import { siteConfig } from '../site.config';

export default function Header({ children, home }) {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <p className={styles.message}>Inspire Creativity,&nbsp;Always Day 1</p>
                <p className={styles.copyright}>Power by <a href='http://github.com/KDF5000/NotionP'>NotionP</a>&nbsp;&nbsp;|&nbsp;&nbsp;Copyright © 2023 Pcursor</p>
            </div>
        </footer>
    );
}