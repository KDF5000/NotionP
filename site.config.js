export const siteConfig = {
    // the site's root Database id (required)
    rootDatabaseId: 'f532a109abd34b259c6bd1334d277ec8',
    // notion integration secret key. 
    // TODO: remove it
    notionSecretKey: 'secret_Jbt9BN8bFQ1UvYFtvoUFtkCZBsEdR9XBG45UI6kYmI6',

    // basic site info (required)
    name: 'OpenHex`s blog',
    domain: 'openhex.cn',
    author: 'DF.K',

    // open graph metadata (optional)
    description: 'a space for distributed system, storage system, database system learning and sharing',

    navigationLinks: [
        {
            title: 'About',
            // link: "",
            pageId: '1be9d9982f954978870eac75d5677382',
        },
        {
            title: 'Github',
            link: 'https://github.com/KDF5000',
            // pageId: "",
        },
    ]
}
