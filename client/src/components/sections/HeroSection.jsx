import { Link } from 'react-router-dom'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import Button from '../ui/Button'

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[720px] items-center overflow-hidden bg-[#211b20] text-[#f8f2ec] sm:min-h-[760px]">
      <img
        src="/images/hero-restaurant.webp"
        alt="Blabber All Day dining space"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(24,18,22,.92)_0%,rgba(24,18,22,.7)_48%,rgba(24,18,22,.22)_100%)]" />
      <div className="relative mx-auto w-full max-w-7xl px-5 pb-24 pt-44 sm:px-8 lg:px-12">
        <p className="mb-5 text-[11px] font-bold uppercase tracking-[.27em] text-[#ddb3cd]">
          Good food. Better stories.
        </p>
        <h1 className="max-w-4xl font-['Cormorant_Garamond'] text-[clamp(4.3rem,10vw,9rem)] leading-[.82] tracking-[-.055em]">
          Stay for <span className="italic text-[#d6a8c5]">one more</span>{' '}
          story.
        </h1>
        <p className="mt-8 max-w-lg text-base leading-relaxed text-[#e8dce0] sm:text-lg">
          All-day plates, easy laughter, and a table that always has room for
          another conversation.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Button to="/menu">Explore our menu</Button>
          <Button
            to="https://www.google.com/maps/search/?api=1&query=Blabber+All+Day+Mumbai"
            variant="outline"
          >
            Visit us
          </Button>
        </div>
      </div>
      <Link
        to="/menu"
        className="absolute bottom-8 left-5 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.2em] text-[#f8f2ec] sm:left-8 lg:left-12"
      >
        See what’s cooking <ArrowDown size={15} />
      </Link>
      <div className="absolute bottom-8 right-5 hidden items-center gap-2 text-[11px] uppercase tracking-[.2em] text-[#f8f2ec] sm:flex lg:right-12">
        Juhu · Borivali · Thane <ArrowUpRight size={14} />
      </div>
    </section>
  )
}
