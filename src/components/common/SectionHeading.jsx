export function SectionHeading({ eyebrow, title, children, align = '' }) {
  return <div className={`section-heading ${align}`}><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div>{children && <p>{children}</p>}</div>;
}
