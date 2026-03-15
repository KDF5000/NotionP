import Link from 'next/link';
import { siteConfig } from '../site.config';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function Navigation() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="py-6 flex items-center justify-between">
      <ul className="flex justify-center space-x-8 text-sm list-none mx-auto">
        {
          siteConfig.navigationLinks.map(({ title, link, pageId }) => (
            <li key={title}>
              {link && <Link href={link} className="text-muted-foreground hover:text-foreground dark:text-gray-300 dark:hover:text-white transition-colors">
                {title}
              </Link>}

              {pageId && <Link href={"/posts/" + pageId} className="text-muted-foreground hover:text-foreground dark:text-gray-300 dark:hover:text-white transition-colors">
                {title}
              </Link>}
            </li>
          ))
        }
      </ul>
      
      {mounted && (
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
          aria-label="Toggle Dark Mode"
        >
          {theme === 'dark' ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </button>
      )}
    </nav >
  )
}
