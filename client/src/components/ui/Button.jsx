import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

export default function Button({
  to,
  children,
  variant = 'filled',
  size = 'md',
  className = '',
}) {
  const base =
    'inline-flex items-center justify-center gap-3 rounded-full font-semibold uppercase tracking-[.12em] transition duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#aa769a] '
  const color =
    variant === 'outline'
      ? 'border border-[#aa769a] text-[#aa769a] hover:bg-[#aa769a] hover:text-[#211b20] '
      : 'bg-[#ae7e9f] text-[#211b20] hover:bg-[#d6aec8] '
  const dimensions =
    size === 'sm' ? 'px-5 py-3 text-[10px] ' : 'px-7 py-4 text-xs '
  const content = (
    <>
      {children}
      <ArrowUpRight size={16} />
    </>
  )
  const classes = base + color + dimensions + className
  return to.startsWith('http') ? (
    <a
      className={classes}
      href={to}
      target="_blank"
      rel="noreferrer"
    >
      {content}
    </a>
  ) : (
    <Link
      className={classes}
      to={to}
    >
      {content}
    </Link>
  )
}
