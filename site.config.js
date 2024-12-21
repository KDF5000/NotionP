export const siteConfig = {
    // the site's root Database id (required)
    rootDatabaseId: 'xxx',
    // notion integration secret key. 
    notionSecretKey: 'xxx',

    // basic site info (required)
    name: 'PCursor',
    domain: 'pcursor.run',
    author: 'DF.K',

    // open graph metadata (optional)
    description: 'a space for distributed system, storage system, database system learning and sharing',

    navigationLinks: [
        {
            title: "文章列表",
            link: "/"
        },
        {
            title: '关于',
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
