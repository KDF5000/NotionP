import Layout from '../../components/layout';
import { queryDatabase } from '../../lib/notion';
import { NotionAPI } from 'notion-client';
import { NotionRenderer } from 'react-notion-x';
import { getPageTitle } from 'notion-utils';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { siteConfig } from '../../site.config';

export async function getStaticPaths() {
    const metas = await queryDatabase(siteConfig.rootDatabaseId);
    const paths = metas.map((meta) => {
        return {
            params: {
                id: meta.id,
            }
        }
    });
    return {
        paths,
        fallback: 'blocking',
    };
}

export async function getStaticProps({ params }) {
    const notionx = new NotionAPI();
    const recordMap = await notionx.getPage(params.id);
    const title = getPageTitle(recordMap);
    return {
        props: {
            title,
            recordMap
        },
        revalidate: 10,
    };
}


// ************************ notion render option *************************
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

export default function Post({ recordMap }) {
    return (
        <Layout>
            <NotionRenderer
                recordMap={recordMap}
                fullPage={true}
                darkMode={false}
                components={{
                    nextImage: Image,
                    Code,
                    Collection,
                    Equation,
                    Modal,
                    Pdf,
                }} />
        </Layout >
    );
}