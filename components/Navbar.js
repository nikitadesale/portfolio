'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useCommandBar } from './CommandBar';
import { HoverAnimation } from './HoverAnimation';

export default function Navbar() {
  const pathname = usePathname();
  const pages = ['About', 'Articles', 'Projects', 'Work', 'Uses', 'Credits'];
  const { toggle } = useCommandBar();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header className="text-primary absolute top-0 z-3 mt-3.25 flex min-h-14.75 w-full flex-wrap items-center text-xs lg:mt-0">
      <Link
        href="/"
        className="hover:bg-hover font-display text-primary ml-3 flex h-8.5 cursor-pointer appearance-none items-center rounded-lg border-none bg-transparent px-2.5 text-[2rem] leading-none font-bold no-underline transition-all duration-300 ease-in-out"
      >
        <span className="translate-y-0.25">N</span>
      </Link>
      <nav className="flex-basis-full hidden flex-1 text-center lg:order-0 lg:flex lg:flex-basis-initial">
        <ul className="relative top-0 m-0 inline-flex list-none p-0 lg:top-1.25 lg:justify-around">
          {pages.map((page) => {
            const path = `/${page.toLowerCase()}`;
            const isActive = pathname === path;

            return (
              <li key={page} className="relative">
                <HoverAnimation
                  id={page}
                  layoutId="nav"
                  backgroundClassName="top-1/2 right-0 left-0 -translate-y-1/2 p-5"
                >
                  <Link
                    href={path}
                    className={`after:bg-primary hover:text-primary relative inline-block cursor-pointer border-0 px-5 py-3 text-xs font-medium tracking-[.075rem] uppercase transition-all duration-300 ease-in-out after:absolute after:bottom-[.375rem] after:left-1/2 after:block after:h-px after:w-5 after:-translate-x-1/2 after:transition-all after:duration-300 after:ease-in-out after:content-[''] hover:opacity-100 focus:opacity-100 ${isActive ? 'text-primary after:opacity-100' : 'text-secondary after:opacity-0'}`}
                  >
                    {page}
                  </Link>
                </HoverAnimation>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="mr-3 ml-auto flex items-center gap-1">
        <button
          type="button"
          aria-label="Menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="hover:bg-hover text-primary flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-lg border-none bg-transparent p-0 transition-all duration-300 ease-in-out lg:hidden"
        >
          <i className={`ri-${isMenuOpen ? 'close' : 'menu'}-line text-2xl leading-8`} />
        </button>
        <button
          type="button"
          aria-label="Command"
          onClick={toggle}
          className="hover:bg-hover text-primary hidden h-8.5 cursor-pointer appearance-none rounded-lg border-none bg-transparent px-2 transition-all duration-300 ease-in-out lg:block"
        >
          <i className="ri-command-line text-2xl leading-8" />
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-20 bg-black/70 backdrop-blur-md lg:hidden"
          >
            <motion.nav
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="border-hover bg-background absolute top-14 right-3 left-3 rounded-xl border p-3"
            >
              <ul className="m-0 list-none p-0">
                {pages.map((page) => {
                  const path = `/${page.toLowerCase()}`;
                  const isActive = pathname === path;
                  return (
                    <li key={`mobile-${page}`}>
                      <Link
                        href={path}
                        className={`block rounded-lg px-3 py-2 text-sm font-medium tracking-[.04rem] uppercase no-underline transition-all ${isActive ? 'text-primary bg-hover' : 'text-secondary hover:text-primary hover:bg-hover'}`}
                      >
                        {page}
                      </Link>
                    </li>
                  );
                })}
                <li className="mt-2 border-t border-white/10 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false);
                      toggle();
                    }}
                    className="text-secondary hover:text-primary hover:bg-hover block w-full cursor-pointer rounded-lg border-none bg-transparent px-3 py-2 text-left text-sm font-medium tracking-[.04rem] uppercase"
                  >
                    Command Menu
                  </button>
                </li>
              </ul>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
