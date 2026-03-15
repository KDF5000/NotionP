import Date from './date';
import { useState, useMemo } from 'react';

type Post = {
    id: string;
    created_time: string;
    title: string;
    abstract?: string;
    tags?: string[];
}

type Props = {
    posts: Post[];
}

export function PostList({ posts }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach(post => {
      post.tags?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [posts]);

  // Filter posts
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = selectedTag ? post.tags?.includes(selectedTag) : true;
      return matchesSearch && matchesTag;
    });
  }, [posts, searchTerm, selectedTag]);

  return (
    <div className="space-y-8">
      {/* Search and Filter Section */}
      <div className="space-y-4">
        <input
          type="text"
          placeholder="搜索文章..."
          className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                selectedTag === null
                  ? 'bg-gray-900 text-white dark:bg-white dark:text-black'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              全部
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  selectedTag === tag
                    ? 'bg-gray-900 text-white dark:bg-white dark:text-black'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      <section>
        {/* <h2 className="mb-8 text-2xl font-bold text-center">2024</h2> */}
        <ul className="space-y-4">
          {filteredPosts.length > 0 ? (
            filteredPosts.map(({ id, title, created_time }) => (
              <li key={id} className="group flex items-center justify-between">
                <a
                  href={"/posts/" + id}
                  className="truncate text-lg hover:bg-gray-900 hover:text-white text-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white transition-colors rounded px-2 -mx-2"
                >
                  {title}
                </a>
                <span className="flex-grow mx-4 h-px bg-gray-800 min-w-4 dark:bg-gray-600 transition-colors" />
                <span className="flex-shrink-0 text-right text-sm text-gray-800 dark:text-gray-400 transition-colors">
                  <Date dateString={created_time}></Date>
                </span>
              </li>
            ))
          ) : (
            <li className="text-center text-gray-500 dark:text-gray-400 py-8">
              没有找到相关文章
            </li>
          )}
        </ul>
      </section>
    </div>
  )
}
