import Layout from '../components/layout';
import Link from 'next/link';

export default function Custom404() {
  return (
    <Layout title="404 - Page Not Found">
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
          页面未找到
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
          抱歉，您访问的页面似乎不存在。可能是链接已失效，或者页面已被移除。
        </p>
        <Link 
          href="/" 
          className="px-6 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-700 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition-colors"
        >
          返回首页
        </Link>
      </div>
    </Layout>
  );
}
