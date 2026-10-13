import { Link } from 'react-router-dom'
import { ArrowUpRight, MapPin } from 'lucide-react'

export default function HeroAction({ to, children, variant = 'accent' }) {
  return (
    <Link
      to={to}
      className={
        'group flex min-h-16 w-full items-center justify-center rounded-[20px] border px-6 py-4 text-sm font-bold uppercase tracking-[.12em] shadow-[0_16px_40px_rgba(0,0,0,.2)] transition duration-300 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:min-h-20 sm:px-8 ' +
        (variant === 'light'
          ? 'border-white bg-[#f8f4ef] text-[#2b2029] hover:bg-white'
          : 'border-[#e4bfd6]/70 bg-[#aa769a] text-white hover:bg-[#945f84]')
      }
    >
      <span className="inline-flex items-center justify-center gap-3">
        {variant === 'light' && <MapPin size={19} strokeWidth={1.8} />}
        {children}
        <ArrowUpRight
          size={21}
          className="shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
        />
      </span>
    </Link>
  )
}
