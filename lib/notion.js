import Notion from "@notion-cms/client";

const notion = new Notion({ auth: "secret_Jbt9BN8bFQ1UvYFtvoUFtkCZBsEdR9XBG45UI6kYmI6" });
export async function queryDatabase(id) {
    let pages = await notion.loadDatabase(id, {});
    console.log(pages);
    return pages.map((page) => {
        // {
        //   id: 'c25739f6-abd2-41a4-92c1-6fe9aecd6933',
        //   meta: {
        //     icon: '📝',
        //     cover: 'https://www.notion.so/images/page-cover/woodcuts_16.jpg',
        //     created_time: '2021-08-31T14:44:00.000Z'
        //   },
        //   props: {
        //     Tags: [Array],
        //     Abstract: 'Apache BooKeeper是一个可扩展、容错、低延迟的在线存储服务，提供了持久性、复制以及强一致的特性的Log系统',
        //     Created: null,
        //     Name: 'Bookeeper: A scalable, fault-tolerant, and low-latency storage service optimized for real-time workloads'
        //   }
        // },
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
