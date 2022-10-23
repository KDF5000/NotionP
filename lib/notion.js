import { Client } from '@notionhq/client';

export async function queryDatabase() {
    const notion = new Client({ auth: "secret_Jbt9BN8bFQ1UvYFtvoUFtkCZBsEdR9XBG45UI6kYmI6" });
    const result = await notion.databases.query({
        database_id: "f532a109abd34b259c6bd1334d277ec8",
    });
    return result;
}

export async function getAllPostsInDatabases() {
    const databases = await queryDatabase();
    const posts = databases.results.map((row) => {
        console.log(row);
        const id = row.id;
        const titleCell = row.properties.Name?.title;
        console.log(titleCell[0]?.plain_text);
        const title = titleCell?.[0]?.plain_text;
        const date = row.created_time;
        const author = "KDF5000";
        const readingTime = 5;
        return { id, title, date, author, readingTime };
    });
    console.log(posts);
    return posts;
}