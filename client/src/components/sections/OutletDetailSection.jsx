import { Link } from 'react-router-dom'
import { ArrowLeft, MapPin, Phone, Mail } from 'lucide-react'
import Button from '../ui/Button'

export default function OutletDetailSection({ outlet }) {
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(outlet.address)}&output=embed`

  return (
    <>
      <section className="relative flex min-h-[560px] items-end overflow-hidden bg-[#2b2029] pt-28 text-white sm:min-h-[640px]">
        <img
          src={outlet.image}
          alt={`Blabber All Day ${outlet.name} artwork`}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1c151b] via-[#1c151b]/55 to-[#1c151b]/20" />
        <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 sm:px-8 sm:pb-20 lg:px-12">
          <Link
            to="/outlet"
            className="mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.16em] text-[#f4d9e9] transition hover:text-white"
          >
            <ArrowLeft size={16} />
            All outlets
          </Link>
          <p className="text-xs font-bold uppercase tracking-[.24em] text-[#e9c3da]">
            Blabber All Day · {outlet.area}
          </p>
          <h1 className="mt-4 font-['Cormorant_Garamond'] text-[clamp(5rem,12vw,10rem)] font-semibold leading-[.75] tracking-[-.05em]">
            {outlet.name}
          </h1>
          <p className="mt-9 max-w-lg font-['Cormorant_Garamond'] text-3xl italic text-[#f4d9e9] sm:text-4xl">
            {outlet.line}
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[.85fr_1.15fr] lg:gap-16 lg:px-12 lg:py-28">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.24em] text-[#9a6689]">
            Come on in
          </p>
          <h2 className="mt-4 font-['Cormorant_Garamond'] text-5xl font-semibold leading-[.9] text-[#2b2029] sm:text-6xl">
            A seat for your <span className="italic text-[#a77497]">next story.</span>
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-[#65545f]">
            {outlet.description}
          </p>

          <div className="mt-10 space-y-6 border-t border-[#dfced9] pt-8">
            <div className="flex items-start gap-4">
              <MapPin
                size={20}
                className="mt-1 shrink-0 text-[#9a6689]"
              />
              <div>
                <h3 className="text-xs font-bold uppercase tracking-[.16em] text-[#9a6689]">
                  Find us
                </h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#473a43]">
                  {outlet.address}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone
                size={20}
                className="mt-1 shrink-0 text-[#9a6689]"
              />
              <div>
                <h3 className="text-xs font-bold uppercase tracking-[.16em] text-[#9a6689]">
                  Call this outlet
                </h3>
                <a
                  href={`tel:${outlet.phone.replace(/\s/g, '')}`}
                  className="mt-2 block text-sm font-semibold text-[#473a43] hover:text-[#9a6689]"
                >
                  {outlet.phone}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail
                size={20}
                className="mt-1 shrink-0 text-[#9a6689]"
              />
              <div>
                <h3 className="text-xs font-bold uppercase tracking-[.16em] text-[#9a6689]">
                  Write to us
                </h3>
                <a
                  href="mailto:blabberreservations@gmail.com"
                  className="mt-2 block text-sm font-semibold text-[#473a43] hover:text-[#9a6689]"
                >
                  blabberreservations@gmail.com
                </a>
              </div>
            </div>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button to={`/reservation?outlet=${outlet.slug}`}>
              Reserve a table
            </Button>
            <Button to={outlet.mapsUrl}>Open directions</Button>
            <Button
              to="/menu"
              variant="outline"
            >
              Explore the menu
            </Button>
          </div>
        </div>

        <div className="overflow-hidden rounded-[28px] border border-[#dbc6d4] bg-[#e9e0e6] p-2 shadow-[0_24px_70px_rgba(43,32,41,.12)]">
          <iframe
            title={`Map of Blabber All Day ${outlet.name}`}
            src={mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[400px] w-full rounded-[22px] border-0 sm:h-[560px]"
          />
        </div>
      </section>
    </>
  )
}
