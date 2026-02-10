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
        "group block rounded-xl glass glass-hover p-6 transition-all duration-300",
        "hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 text-xs text-[#a1a1aa]/60 mb-2 font-mono">
            <time>{post.date}</time>
            <span>&middot;</span>
            <span>{post.readTime}</span>
          </div>
          <h3 className="text-lg font-semibold text-[#fafafa] group-hover:text-blue-400 transition-colors">
            {post.title}
          </h3>
          <p className="mt-2 text-sm text-[#a1a1aa] leading-relaxed">{post.excerpt}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-xs text-[#a1a1aa] font-mono"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <ArrowUpRight
          size={18}
          className="text-[#a1a1aa]/40 group-hover:text-blue-400 group-hover:rotate-12 transition-all duration-300 shrink-0 ml-4"
        />
      </div>
    </a>
  );
}
