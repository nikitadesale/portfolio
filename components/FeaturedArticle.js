'use client';

import readingTime from 'reading-time';

import { HoverAnimation } from './HoverAnimation';

export default function FeaturedArticle(props) {
  const stats = readingTime(props.content);

  return (
    <a
      href={props.href}
      className="w-full border-0 no-underline first:ml-0 hover:opacity-100"
    >
      <HoverAnimation
        id={props.index}
        layoutId="featuredArticles"
        className="relative block w-full p-5"
      >
        <div className="relative mb-5 aspect-video w-full overflow-hidden rounded-lg">
          <div
            className="h-full w-full bg-cover bg-center bg-no-repeat grayscale"
            style={{ backgroundImage: `url(${props.image})` }}
          />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-[rgba(8,7,11,0.15)] via-[rgba(8,7,11,0.35)] to-[rgba(8,7,11,0.7)]" />
        </div>
        <div className="mr-5 max-w-112.5 md:mr-0 md:max-w-full">
          <h3 className="text-primary m-0">{props.title}</h3>
          <p className="text-secondary m-0 line-clamp-2">{props.description}</p>
          <p className="text-primary my-1.25 mt-1.25 inline-block text-xs font-medium tracking-[0.075rem] uppercase">
            {stats.text}
          </p>
        </div>
      </HoverAnimation>
    </a>
  );
}
