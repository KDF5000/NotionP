import Notion from "@notion-cms/client";
import { siteConfig } from "../site.config";

export async function queryDatabase(id) {
    const notion = new Notion({ auth: siteConfig.notionSecretKey });
    let pages = await notion.loadDatabase(id, {});
    return pages.map((page) => {
        return {
            id: page.id,
            created_time: page.meta.created_time,
            title: page.props.Name,
            abstract: page.props.Abstract,
        }
    });
}

export async function retrievePage(id) {
    return notion.loadPage(id);
}
