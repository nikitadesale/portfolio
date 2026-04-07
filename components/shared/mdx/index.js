import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypePrism from 'rehype-prism-plus';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeUnwrapImages from 'rehype-unwrap-images';
import remarkGfm from 'remark-gfm';

const mdxOptions = (format = 'md') => {
  return {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeRaw,
        rehypeUnwrapImages,
        rehypeSlug,
        rehypePrism
      ],
      format: format
    }
  };
};

export const CustomMDX = ({ source, format = 'md' }) => (
  <MDXRemote source={source} options={mdxOptions(format)} />
);
