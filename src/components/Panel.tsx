import { ReactNode } from 'react';

interface PanelProps {
  title?: string;
  eyebrow?: string;
  aside?: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function Panel({
  title,
  eyebrow,
  aside,
  children,
  className = '',
}: PanelProps) {
  return (
    <section className={`surface p-5 sm:p-6 ${className}`}>
      {(title || eyebrow || aside) && (
        <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
          <div>
            {eyebrow ? <p className="label mb-2">{eyebrow}</p> : null}
            {title ? <h3 className="text-lg font-semibold text-white">{title}</h3> : null}
          </div>
          {aside}
        </div>
      )}
      {children}
    </section>
  );
}
