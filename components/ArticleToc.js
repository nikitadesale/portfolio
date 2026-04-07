export default function ArticleToc({ items }) {
  if (!items?.length) return null;

  return (
    <nav
      aria-label="On this page"
      className="border-secondary/60 bg-background/80 text-secondary rounded-lg border px-4 py-3 text-sm backdrop-blur-sm xl:border-0 xl:bg-transparent xl:p-0 xl:backdrop-blur-none"
    >
      <p className="text-primary mb-2.5 text-[0.6875rem] font-medium tracking-[0.12em] uppercase">
        On this page
      </p>
      <ul className="m-0 list-none space-y-1.5 p-0">
        {items.map((item) => (
          <li
            key={item.id}
            className={
              item.depth === 3 ? 'ml-3 border-l border-white/10 pl-2.5' : ''
            }
          >
            <a
              href={`#${item.id}`}
              className="text-secondary hover:text-primary focus:text-primary block leading-snug transition-colors duration-200 no-underline"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
