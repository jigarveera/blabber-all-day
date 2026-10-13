import { ArrowUpRight, Phone } from 'lucide-react'
import outlets from '../../data/outlets'
import ReservationForm from '../ui/ReservationForm'

export default function ReservationSection({ page = false, defaultOutlet = '' }) {
  const Heading = page ? 'h1' : 'h2'

  return (
    <section
      id="reservations"
      data-header-theme="light"
      aria-labelledby="reservation-heading"
      className={`relative isolate overflow-hidden bg-[#f1ebe6] text-[#2b2029] ${page ? 'min-h-[100svh] px-5 pb-28 pt-32 sm:px-8 sm:pt-36 lg:px-12' : 'px-5 pb-28 pt-24 sm:px-8 sm:pb-36 sm:pt-32 lg:px-12'}`}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_0%_8%,rgba(193,149,177,.24),transparent_35%),radial-gradient(circle_at_100%_100%,rgba(213,183,201,.19),transparent_36%)]" />
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-x-16 lg:gap-y-8 xl:gap-x-24">
        <div className="lg:col-start-1 lg:row-start-1 lg:self-end">
          <Heading
            id="reservation-heading"
            className="max-w-xl font-['Cormorant_Garamond'] text-[clamp(4rem,8vw,7.5rem)] font-semibold leading-[.78] tracking-[-.055em]"
          >
            Let’s make <span className="italic text-[#a77497]">room</span> for
            you.
          </Heading>
        </div>

        <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
          <ReservationForm
            key={defaultOutlet}
            defaultOutlet={defaultOutlet}
          />
        </div>

        <div className="lg:col-start-1 lg:row-start-2">
          <figure className="relative h-[260px] overflow-hidden rounded-[28px] bg-[#3a2b34] sm:h-[320px] sm:rounded-[34px]">
            <img
              src="/images/hero-restaurant-4.webp"
              alt="A welcoming corner at Blabber All Day"
              loading={page ? 'eager' : 'lazy'}
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-[#1f171e]/35" />
            <figcaption className="absolute inset-0 flex items-center justify-center px-6 text-center font-['Cormorant_Garamond'] text-3xl font-medium italic leading-none text-white sm:px-8 sm:text-4xl">
              “The best stories start around a table.”
            </figcaption>
          </figure>

          <div className="mt-8 hidden border-t border-[#d5c4cf] pt-6 sm:block">
            <div className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.2em] text-[#916382]">
              <Phone
                size={15}
                strokeWidth={1.8}
              />
              Prefer to call?
            </div>
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {outlets.map((outlet) => (
                <a
                  key={outlet.slug}
                  href={`tel:${outlet.phone.replace(/\s/g, '')}`}
                  className="group flex items-center justify-between gap-3 rounded-[18px] border border-[#d6c6d0] bg-white/50 px-4 py-3 transition hover:border-[#aa769a] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#aa769a]"
                >
                  <span>
                    <span className="block font-['Cormorant_Garamond'] text-xl font-semibold leading-none">
                      {outlet.name}
                    </span>
                    <span className="mt-1 block text-[11px] text-[#75646f]">
                      {outlet.phone}
                    </span>
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="shrink-0 text-[#916382] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
