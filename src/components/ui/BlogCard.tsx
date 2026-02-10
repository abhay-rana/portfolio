import { ArrowUpRight } from "lucide-react";
import { cn } from "~/lib/cn";
import type { BlogPost } from "~/types/data";

interface BlogCardProps {
  post: BlogPost;
  className?: string;
}

export function BlogCard({ post, className }: BlogCardProps) {
  return (
    <a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group block rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all duration-300 hover:border-zinc-700",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 text-xs text-zinc-500 mb-2">
            <time>{post.date}</time>
            <span>&middot;</span>
            <span>{post.readTime}</span>
          </div>
          <h3 className="text-lg font-semibold text-zinc-100 group-hover:text-blue-400 transition-colors">
            {post.title}
          </h3>
          <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{post.excerpt}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-zinc-800 px-2.5 py-0.5 text-xs text-zinc-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <ArrowUpRight
          size={18}
          className="text-zinc-600 group-hover:text-blue-400 transition-colors shrink-0 ml-4"
        />
      </div>
    </a>
  );
}
