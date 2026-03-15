// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css'

// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-tomorrow.css'

// used for rendering equations (optional)
import 'katex/dist/katex.min.css'

// style overiders for notion
import '../styles/globals.css';
import '../styles/notion.css';
import '../styles/heti.min.css';
import 'nprogress/nprogress.css';

import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import NProgress from 'nprogress';
import Router from 'next/router';

Router.events.on('routeChangeStart', (url) => {
    NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <Component {...pageProps} />
        </ThemeProvider>
    );
}
