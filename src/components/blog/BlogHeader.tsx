import type { BlogPostMeta } from "~/types/data";

interface BlogHeaderProps {
  post: BlogPostMeta;
}

export function BlogHeader({ post }: BlogHeaderProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="mb-6">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
        {post.title}
      </h1>
      <div className="flex flex-wrap items-center gap-3 mt-4 text-sm text-zinc-400">
        <time dateTime={post.date}>{formattedDate}</time>
        <span className="w-1 h-1 rounded-full bg-red-500" />
        <span>{post.readTime}</span>
      </div>
      {post.description && (
        <p className="mt-4 text-lg text-zinc-400 leading-relaxed max-w-2xl">
          {post.description}
        </p>
      )}
      <div className="flex flex-wrap gap-2 mt-6">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="px-3.5 py-1.5 text-xs font-medium rounded-full bg-red-500/10 text-red-400 border border-red-500/20"
          >
            {tag}
          </span>
        ))}
      </div>
      {post.coverImage && (
        <div className="mt-8 -mx-2 md:-mx-6">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full rounded-xl border border-zinc-800/50"
          />
        </div>
      )}
      <div className="mt-8 h-px bg-gradient-to-r from-transparent via-red-500/60 to-transparent" />
    </header>
  );
}
