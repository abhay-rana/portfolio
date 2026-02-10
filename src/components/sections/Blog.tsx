"use client";

import { motion } from "framer-motion";
import { blogPosts } from "~/data/blog";
import { AnimatedSection } from "~/components/ui/AnimatedSection";
import { SectionHeading } from "~/components/ui/SectionHeading";
import { BlogCard } from "~/components/ui/BlogCard";
import { staggerContainer, staggerItem } from "~/lib/motion";

export function Blog() {
  return (
    <AnimatedSection id="blog">
      <div className="mx-auto max-w-4xl">
        <SectionHeading title="Blog" subtitle="Thoughts on code, architecture, and design" />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-4"
        >
          {blogPosts.map((post) => (
            <motion.div key={post.id} variants={staggerItem}>
              <BlogCard post={post} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
