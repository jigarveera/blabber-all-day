import { Link } from 'react-router-dom'
import outlets from '../../data/outlets'
import { INSTAGRAM_URL, WHATSAPP_URL } from '../../data/socials'
import BrandLogo from '../ui/BrandLogo'
import InstagramIcon from '../ui/InstagramIcon'
import WhatsAppIcon from '../ui/WhatsAppIcon'

export default function Footer() {
  return (
    <footer className="relative isolate mt-8 bg-[#2b2029] text-[#f8f2ec]">
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 32"
        preserveAspectRatio="none"
        className="pointer-events-none absolute bottom-full left-0 h-8 w-full text-[#2b2029]"
      >
        <defs>
          <pattern
            id="footer-torn-edge"
            width="96"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 14 8 12 17 16 26 13 35 18 44 15 53 17 62 12 71 16 80 14 89 18 96 14V32H0Z"
              fill="currentColor"
            />
          </pattern>
        </defs>
        <rect
          width="1440"
          height="32"
          fill="url(#footer-torn-edge)"
        />
      </svg>

      <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_8%_20%,rgba(170,118,154,.19),transparent_35%),radial-gradient(circle_at_85%_85%,rgba(214,168,197,.1),transparent_32%)]" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 pb-12 pt-14 sm:px-8 lg:grid-cols-[1.3fr_.7fr_1.3fr] lg:gap-16 lg:px-12 lg:pt-16">
        <div>
          <div className="flex items-center justify-between gap-5 sm:justify-start sm:gap-7">
            <BrandLogo
              variant="light"
              className="w-36"
            />
            <div className="flex items-center gap-2">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Blabber All Day on Instagram"
                className="grid size-10 place-items-center rounded-full border border-[#a17a92] text-[#e4bdd3] transition hover:border-[#e4bdd3] hover:bg-[#aa769a] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <InstagramIcon size={19} />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with Blabber All Day on WhatsApp"
                className="grid size-10 place-items-center rounded-full border border-[#a17a92] text-[#e4bdd3] transition hover:border-[#e4bdd3] hover:bg-[#aa769a] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <WhatsAppIcon size={19} />
              </a>
            </div>
          </div>
          <p className="mt-6 max-w-xs font-['Cormorant_Garamond'] text-2xl leading-snug text-[#e8d9e2]">
            Come hungry. Leave with a story worth telling.
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#bbabb5]">
            Good food and good company, all day across Mumbai.
          </p>
        </div>

        <nav
          aria-label="Footer navigation"
          className="flex flex-col items-start gap-4"
        >
          <h2 className="text-[11px] font-bold uppercase tracking-[.2em] text-[#cfa7bf]">
            Explore
          </h2>
          <Link
            to="/"
            className="text-sm transition hover:text-[#e4bdd3]"
          >
            Home
          </Link>
          <Link
            to="/menu"
            className="text-sm transition hover:text-[#e4bdd3]"
          >
            Menu
          </Link>
          <Link
            to="/outlet"
            className="text-sm transition hover:text-[#e4bdd3]"
          >
            Our outlets
          </Link>
          <Link
            to="/reservation"
            className="text-sm transition hover:text-[#e4bdd3]"
          >
            Reservations
          </Link>
          <Link
            to="/faq"
            className="text-sm transition hover:text-[#e4bdd3]"
          >
            FAQs
          </Link>
        </nav>

        <div>
          <h2 className="text-[11px] font-bold uppercase tracking-[.2em] text-[#cfa7bf]">
            Find your table
          </h2>
          <div className="mt-4 grid gap-5 sm:grid-cols-3 lg:grid-cols-1">
            {outlets.map((outlet) => (
              <div
                key={outlet.slug}
                className="flex flex-col gap-1"
              >
                <Link
                  to={`/outlet/${outlet.slug}`}
                  className="font-['Cormorant_Garamond'] text-xl font-semibold transition hover:text-[#e4bdd3]"
                >
                  {outlet.name}
                </Link>
                <a
                  href={`tel:${outlet.phone.replace(/\s/g, '')}`}
                  className="text-xs text-[#bbabb5] transition hover:text-white"
                >
                  {outlet.phone}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative border-t border-[#785969]/60 px-5 py-5 text-[11px] text-[#bbaab5] sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <p>© {new Date().getFullYear()} Blabber All Day · Mumbai</p>
          <nav
            aria-label="Legal links"
            className="flex flex-wrap gap-x-5 gap-y-2"
          >
            <Link
              to="/privacy-policy"
              className="transition hover:text-white"
            >
              Privacy
            </Link>
            <Link
              to="/cookie-policy"
              className="transition hover:text-white"
            >
              Cookies
            </Link>
            <Link
              to="/terms-of-use"
              className="transition hover:text-white"
            >
              Terms
            </Link>
            <Link
              to="/reservations-and-orders"
              className="transition hover:text-white"
            >
              Reservations & orders
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
