import Layout from '../../components/layout';
import { queryDatabase } from '../../lib/notion';
import { NotionAPI } from 'notion-client';
import { NotionRenderer } from 'react-notion-x';
import { getPageTitle } from 'notion-utils';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { siteConfig } from '../../site.config';
import { mapImageUrl } from '../../lib/map-image-url';

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
    import('react-notion-x/build/third-party/code').then(async (m) => {
        // additional prism syntaxes
        await Promise.all([
            import('prismjs/components/prism-markup-templating.js'),
            import('prismjs/components/prism-markup.js'),
            import('prismjs/components/prism-bash.js'),
            import('prismjs/components/prism-c.js'),
            import('prismjs/components/prism-cpp.js'),
            import('prismjs/components/prism-csharp.js'),
            import('prismjs/components/prism-docker.js'),
            import('prismjs/components/prism-java.js'),
            import('prismjs/components/prism-js-templates.js'),
            import('prismjs/components/prism-coffeescript.js'),
            import('prismjs/components/prism-diff.js'),
            import('prismjs/components/prism-git.js'),
            import('prismjs/components/prism-go.js'),
            import('prismjs/components/prism-graphql.js'),
            import('prismjs/components/prism-handlebars.js'),
            import('prismjs/components/prism-less.js'),
            import('prismjs/components/prism-makefile.js'),
            import('prismjs/components/prism-markdown.js'),
            import('prismjs/components/prism-objectivec.js'),
            import('prismjs/components/prism-ocaml.js'),
            import('prismjs/components/prism-python.js'),
            import('prismjs/components/prism-reason.js'),
            import('prismjs/components/prism-rust.js'),
            import('prismjs/components/prism-sass.js'),
            import('prismjs/components/prism-scss.js'),
            import('prismjs/components/prism-solidity.js'),
            import('prismjs/components/prism-sql.js'),
            import('prismjs/components/prism-stylus.js'),
            import('prismjs/components/prism-swift.js'),
            import('prismjs/components/prism-wasm.js'),
            import('prismjs/components/prism-yaml.js')
        ])
        return m.Code
    })
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

export default function Post({ title, recordMap }) {
    return (
        <Layout title={title}>
            <NotionRenderer
                recordMap={recordMap}
                fullPage={true}
                darkMode={false}
                mapImageUrl={mapImageUrl}
                components={{
                    nextImage: Image,
                    Code,
                    Collection,
                    Equation,
                    Modal,
                    Pdf
                }}
            />
        </Layout >
    );
}
