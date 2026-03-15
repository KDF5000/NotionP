import Notion from "@notion-cms/client";

export async function queryDatabase(id: string) {
    if (!process.env.NOTION_SECRET_KEY) {
        throw new Error("NOTION_SECRET_KEY is not defined");
    }
    const notion = new Notion({ auth: process.env.NOTION_SECRET_KEY });
    // @ts-ignore - The types might be incomplete or slightly different
    let pages = await notion.loadDatabase(id, {});
    // @ts-ignore
    return pages.map((page: any) => {
        return {
            id: page.id,
            created_time: page.meta.created_time,
            title: page.props.Name,
            abstract: page.props.Abstract,
            tags: page.props.Tags || [],
        }
    });
}

export async function retrievePage(id: string) {
    if (!process.env.NOTION_SECRET_KEY) {
        throw new Error("NOTION_SECRET_KEY is not defined");
    }
    const notion = new Notion({ auth: process.env.NOTION_SECRET_KEY });
    return notion.loadPage(id);
}
