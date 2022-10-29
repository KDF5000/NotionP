import Layout from '../../components/layout';
import { retrievePage, queryDatabase } from '../../lib/notion';
import { NotionAPI } from 'notion-client';
import { NotionRenderer } from 'react-notion-x';
import dynamic from 'next/dynamic'

const Code = dynamic(() =>
    import('react-notion-x/build/third-party/code').then((m) => m.Code)
)
const Collection = dynamic(() =>
    import('react-notion-x/build/third-party/collection').then(
        (m) => m.Collection
    )
)
const Equation = dynamic(() =>
    import('react-notion-x/build/third-party/equation').then((m) => m.Equation)
)
const Pdf = dynamic(
    () => import('react-notion-x/build/third-party/pdf').then((m) => m.Pdf),
    {
        ssr: false
    }
)
const Modal = dynamic(
    () => import('react-notion-x/build/third-party/modal').then((m) => m.Modal),
    {
        ssr: false
    }
)

export async function getStaticProps({ params }) {
    const notionx = new NotionAPI();
    const recordMap = await notionx.getPage(params.id);

    return {
        props: {
            recordMap,
        },
    };
}

export async function getStaticPaths() {
    const metas = await queryDatabase("f532a109abd34b259c6bd1334d277ec8");
    const paths = metas.map((meta) => {
        return {
            params: {
                id: meta.id,
            }
        }
    });
    return {
        paths,
        fallback: false,
    };
}

export default function Post({ page, recordMap }) {
    return (
        // <Layout>
        <NotionRenderer
            recordMap={recordMap}
            fullPage={false}
            darkMode={false}
            components={{
                Code,
                Collection,
                Equation,
                Modal,
                Pdf
            }} />
        // </Layout >
    );
}