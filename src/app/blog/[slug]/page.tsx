import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { getAllSlugs, getPostBySlug } from "~/lib/blog";
import { BlogHeader } from "~/components/blog/BlogHeader";
import { ReadingProgress } from "~/components/blog/ReadingProgress";
import { siteConfig } from "~/data/site-config";

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | ${siteConfig.author}`,
    description: post.description,
    alternates: { canonical: `${siteConfig.url}/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      url: `${siteConfig.url}/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <ReadingProgress />
      <div className="pb-16 md:pb-24">
      {/* Gradient hero — pulls up behind navbar for seamless glow */}
      <div className="relative -mt-16 pt-16">
        <div className="absolute inset-x-0 top-0 h-[600px] bg-gradient-to-b from-red-500/[0.07] via-red-500/[0.03] to-transparent pointer-events-none" />
        <div className="relative mx-auto max-w-4xl px-4 pt-12 md:pt-16">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-red-400 transition-all duration-300 px-3 py-1.5 rounded-lg hover:bg-zinc-800/50 mb-8"
          >
            <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
            Back to Blog
          </Link>

          <BlogHeader post={post} />
        </div>
      </div>

      {/* Article body in glass container */}
      <div className="mx-auto max-w-[1000px] px-4">
        <div className="rounded-2xl bg-zinc-900/30 border border-zinc-800/50 p-6 md:p-10 lg:p-12">
          <article
            className="prose-blog blog-fade-in"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        <div className="mt-16 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />

        <Link
          href="/blog"
          className="group inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-red-400 transition-all duration-300 px-3 py-1.5 rounded-lg hover:bg-zinc-800/50 mt-8"
        >
          <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
          Back to Blog
        </Link>
      </div>
    </div>
    </>
  );
}
