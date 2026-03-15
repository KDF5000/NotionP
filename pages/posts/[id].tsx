import Layout from '../../components/layout';
import { queryDatabase } from '../../lib/notion';
import { NotionAPI } from 'notion-client';
import { NotionRenderer } from 'react-notion-x';
import { getPageTitle } from 'notion-utils';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { siteConfig } from '../../site.config';
import { mapImageUrl } from '../../lib/map-image-url';
import { GetStaticProps, GetStaticPaths } from 'next';
import { ExtendedRecordMap } from 'notion-types';

export const getStaticPaths: GetStaticPaths = async () => {
    const metas = await queryDatabase(siteConfig.rootDatabaseId);
    const paths = metas.map((meta: any) => {
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

type Props = {
    title: string;
    recordMap: ExtendedRecordMap;
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
    const notion = new NotionAPI();
    const id = params?.id as string;
    const recordMap = await notion.getPage(id);
    Object.entries(recordMap.block || {}).forEach(([blockId, block]) => {
        const value: any = (block as any)?.value;
        if (value && !value.id) {
            value.id = blockId;
        }
    });
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

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function Post({ title, recordMap }: Props) {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <Layout title={title}>
            <article className="heti">
                <header className="mb-10 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {title}
                    </h1>
                </header>
                <NotionRenderer
                    recordMap={recordMap}
                    fullPage={true}
                    darkMode={mounted && theme === 'dark'}
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
            </article>
        </Layout >
    );
}
