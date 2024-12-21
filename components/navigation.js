import Link from 'next/link';
import { siteConfig } from '../site.config';

export function Navigation() {
  return (
    <nav className="py-6">
      <ul className="flex justify-center space-x-8 text-sm">
        {
          siteConfig.navigationLinks.map(({ title, link, pageId }) => (
            <li>
              {link && <Link href={link} className="text-muted-foreground hover:text-foreground">
                {title}
              </Link>}

              {pageId && <Link href={"/posts/" + pageId} className="text-muted-foreground hover:text-foreground">
                {title}
              </Link>}
            </li>
          ))
        }
      </ul>
    </nav >
  )
}