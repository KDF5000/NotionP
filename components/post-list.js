
import Date from './date';

export function PostList({ posts }) {
  return (
    <div className="space-y-16">
      <section>
        {/* <h2 className="mb-8 text-2xl font-bold text-center">2024</h2> */}
        <ul className="space-y-4">
          {posts.map(({ id, title, created_time }) => (
            <li key={id} className="group flex items-center justify-between">
              <a
                href={"/posts/" + id}
                className="truncate text-lg hover:bg-gray-900 hover:text-white text-gray-800"
              >
                {title}
              </a>
              <span className="flex-grow mx-4 h-px bg-gray-800 min-w-4" />
              <span className="flex-shrink-0 text-right text-sm text-gray-800">
                <Date dateString={created_time}></Date>
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

