import GithubSlugger from 'github-slugger';
import { toString } from 'mdast-util-to-string';
import remarkParse from 'remark-parse';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';

/**
 * Extract h2/h3 from markdown for an in-page table of contents.
 * Slugs match {@link https://github.com/rehypejs/rehype-slug rehype-slug} / GitHub-styleHeading ids.
 */
export function extractToc(markdown) {
  if (!markdown?.trim()) return [];

  const tree = unified().use(remarkParse).parse(markdown);
  const slugger = new GithubSlugger();
  const items = [];

  visit(tree, 'heading', (node) => {
    if (node.depth !== 2 && node.depth !== 3) return;
    const text = toString(node).trim();
    if (!text) return;
    items.push({
      depth: node.depth,
      text,
      id: slugger.slug(text)
    });
  });

  return items;
}
