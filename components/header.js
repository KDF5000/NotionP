import styles from './header.module.css';

export default function Header({ children, home }) {
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <div className={styles.logo}>
                    <a href="/" accesskey="h" title="PaperMod (Alt + H)">PaperMod</a>
                    <div className={styles.logoswitches}>
                        <button id={styles.themetoggle} accesskey="t" title="(Alt + T)">
                            <svg id={styles.moon} xmlns="http://www.w3.org/2000/svg" width="24" height="18" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                            </svg>
                            <svg id={styles.sun} xmlns="http://www.w3.org/2000/svg" width="24" height="18" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <circle cx="12" cy="12" r="5"></circle>
                                <line x1="12" y1="1" x2="12" y2="3"></line>
                                <line x1="12" y1="21" x2="12" y2="23"></line>
                                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                                <line x1="1" y1="12" x2="3" y2="12"></line>
                                <line x1="21" y1="12" x2="23" y2="12"></line>
                                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                            </svg>
                        </button>
                        <ul className={styles.langswitch}><li>|</li>
                            <li>
                                <a href="https://adityatelange.github.io/hugo-PaperMod/fr/" title="French"
                                    aria-label=":fr:">🇫🇷</a>
                            </li>
                            <li>
                                <a href="https://adityatelange.github.io/hugo-PaperMod/fa/" title="Fa"
                                    aria-label="Fa">Fa</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <ul id={styles.menu}>
                    <li>
                        <a href="https://adityatelange.github.io/hugo-PaperMod/archives" title="Archive">
                            <span>Archive</span>
                        </a>
                    </li>
                    <li>
                        <a href="https://adityatelange.github.io/hugo-PaperMod/search/" title="Search">
                            <span>Search</span>
                        </a>
                    </li>
                    <li>
                        <a href="https://adityatelange.github.io/hugo-PaperMod/tags/" title="Tags">
                            <span>Tags</span>
                        </a>
                    </li>
                    <li>
                        <a href="https://discord.gg/ahpmTvhVmp" title="Discord">
                            <span>Discord</span>&nbsp;
                            <svg fill="none" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round"
                                stroke-linejoin="round" stroke-width="2.5" viewBox="0 0 24 24" height="12" width="12">
                                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                                <path d="M15 3h6v6"></path>
                                <path d="M10 14L21 3"></path>
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/adityatelange/hugo-PaperMod/wiki/" title="WiKi">
                            <span>WiKi</span>&nbsp;
                            <svg fill="none" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round"
                                stroke-linejoin="round" stroke-width="2.5" viewBox="0 0 24 24" height="12" width="12">
                                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                                <path d="M15 3h6v6"></path>
                                <path d="M10 14L21 3"></path>
                            </svg>
                        </a>
                    </li>
                </ul>
            </nav >
        </header >
    );
}