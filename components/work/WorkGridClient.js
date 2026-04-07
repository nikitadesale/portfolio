'use client';

import { differenceInMonths, format, parseISO } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';

function getDuration(start, end) {
  const startDate = parseISO(start);
  const endDate = end ? parseISO(end) : new Date();
  const months = differenceInMonths(endDate, startDate);
  if (months >= 12) {
    const years = Math.round((months / 12) * 10) / 10;
    return `${years} yr${years === 1 ? '' : 's'}`;
  }
  return `${months + 1} mos`;
}

function WorkCard({ item, onClick, index }) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.35 }}
      whileHover={{ y: -8, scale: 1.02 }}
      onClick={() => onClick(item)}
      className="border-hover bg-command hover:border-primary w-full cursor-pointer rounded-xl border p-5 text-left transition-colors"
    >
      {item.companyLogo ? (
        <div className="mb-3 flex h-16 w-full items-center justify-center">
          <img
            src={item.companyLogo}
            alt={`${item.company} logo`}
            className="max-h-16 max-w-44 object-contain mix-blend-screen"
          />
        </div>
      ) : null}
      <p className="text-primary m-0 text-xl font-semibold">{item.role}</p>
      <p className="text-secondary mt-1 mb-3 text-sm">
        {item.company} • {getDuration(item.startDate, item.endDate)}
      </p>
      <div className="flex flex-wrap gap-2">
        {item.technologies?.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="bg-hover text-secondary rounded-full px-2.5 py-1 text-xs"
          >
            {tech}
          </span>
        ))}
        {item.technologies?.length > 4 ? (
          <span className="text-secondary px-1 text-xs self-center">
            +{item.technologies.length - 4}
          </span>
        ) : null}
      </div>
    </motion.button>
  );
}

function WorkModal({ item, onClose }) {
  if (!item) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-30 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 8 }}
        transition={{ duration: 0.2 }}
        className="fixed top-1/2 left-1/2 z-[31] flex max-h-[88vh] w-[92vw] max-w-180 -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0a0910]"
      >
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="text-secondary hover:text-primary absolute top-3 right-3 z-10 border-0 bg-transparent text-xl cursor-pointer"
        >
          ×
        </button>
        <div className="overflow-y-auto p-5 md:p-7">
          {item.companyLogo ? (
            <div className="mb-4 flex justify-center">
              <img
                src={item.companyLogo}
                alt={`${item.company} logo`}
                className="max-h-24 max-w-60 object-contain mix-blend-screen"
              />
            </div>
          ) : null}
          <h2 className="text-primary m-0 text-center text-3xl">{item.role}</h2>
          <p className="text-secondary mt-1 mb-0 text-center">
            {item.company}
            {item.roleType ? ` • ${item.roleType}` : ''}
          </p>

          <div className="text-secondary mt-4 mb-4 flex flex-col gap-1 border-y border-white/10 py-2 text-sm md:flex-row md:justify-between">
            <span>
              {format(parseISO(item.startDate), 'MMM yyyy')} -{' '}
              {item.endDate ? format(parseISO(item.endDate), 'MMM yyyy') : 'Present'} •{' '}
              {getDuration(item.startDate, item.endDate)}
            </span>
            <span>{item.location}</span>
          </div>

          {item.highlights?.length ? (
            <div className="bg-hover mb-4 rounded-lg p-3">
              {item.highlights.map((h) => (
                <p key={h} className="text-secondary my-1 text-sm">
                  ✨ {h}
                </p>
              ))}
            </div>
          ) : null}

          <ul className="my-0 mb-4 pl-5">
            {item.description?.map((d) => (
              <li key={d} className="text-secondary mb-2">
                {d}
              </li>
            ))}
          </ul>

          {item.technologies?.length ? (
            <>
              <h3 className="text-primary mt-0 mb-2 text-base">Technologies</h3>
              <div className="mb-4 flex flex-wrap gap-2">
                {item.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="bg-hover text-secondary rounded-full px-3 py-1 text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </>
          ) : null}

          <a href={item.companyUrl} target="_blank" rel="noreferrer">
            Visit Company Website →
          </a>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function WorkGridClient({ items }) {
  const [selected, setSelected] = useState(null);
  const sorted = useMemo(
    () =>
      [...items].sort(
        (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
      ),
    [items]
  );

  return (
    <>
      <div className="grid grid-cols-1 gap-4 py-4 md:grid-cols-2">
        {sorted.map((item, index) => (
          <WorkCard key={`${item.role}-${item.startDate}`} item={item} index={index} onClick={setSelected} />
        ))}
      </div>
      {selected ? <WorkModal item={selected} onClose={() => setSelected(null)} /> : null}
    </>
  );
}

