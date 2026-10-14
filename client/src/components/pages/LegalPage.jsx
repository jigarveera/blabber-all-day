import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import legalPages, { contactEmail } from '../../data/legalPages'
import outlets from '../../data/outlets'

const policyLinks = [
  { type: 'privacy', to: '/privacy-policy', label: 'Privacy policy' },
  { type: 'cookies', to: '/cookie-policy', label: 'Cookie policy' },
  { type: 'terms', to: '/terms-of-use', label: 'Terms of use' },
  {
    type: 'reservations',
    to: '/reservations-and-orders',
    label: 'Reservations & orders',
  },
]

export default function LegalPage({ type }) {
  const policy = legalPages[type]

  useEffect(() => {
    const previousTitle = document.title
    document.title = `${policy.title} | Blabber All Day`
    return () => {
      document.title = previousTitle
    }
  }, [policy.title])

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f7f1ec] text-[#2b2029]">
      <section className="relative overflow-hidden bg-[#eadce5] px-5 pb-16 pt-32 sm:px-8 sm:pb-20 lg:px-12">
        <div className="pointer-events-none absolute -right-24 -top-28 size-[28rem] rounded-full bg-[#c698b7]/35 blur-[90px]" />
        <div className="relative mx-auto max-w-7xl">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.16em] text-[#704c66] transition hover:text-[#2b2029]"
          >
            <ArrowLeft size={16} />
            Back to Blabber
          </Link>
          <p className="mt-12 text-[11px] font-bold uppercase tracking-[.25em] text-[#8d5c7d]">
            The fine details
          </p>
          <h1 className="mt-4 max-w-4xl font-['Cormorant_Garamond'] text-[clamp(3.6rem,9vw,7.5rem)] font-semibold leading-[.85] tracking-[-.05em]">
            {policy.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#5e4b59] sm:text-lg">
            {policy.intro}
          </p>
          <p className="mt-8 text-xs font-semibold uppercase tracking-[.16em] text-[#855c78]">
            Last updated 14 October 2026
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16 lg:px-12">
        <nav
          aria-label="On this page"
          className="hidden self-start lg:sticky lg:top-28 lg:flex lg:flex-col lg:gap-4"
        >
          <p className="text-[11px] font-bold uppercase tracking-[.2em] text-[#916382]">
            On this page
          </p>
          {policy.sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="text-sm leading-snug text-[#665360] transition hover:text-[#9a6689]"
            >
              {section.title}
            </a>
          ))}
        </nav>

        <div className="min-w-0 max-w-3xl space-y-5">
          {policy.sections.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-28 rounded-[26px] border border-[#e1d2dc] bg-[#fffaf6] p-6 shadow-[0_16px_40px_rgba(43,32,41,.05)] sm:p-8"
            >
              <p className="text-[11px] font-bold uppercase tracking-[.2em] text-[#a77497]">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h2 className="mt-3 font-['Cormorant_Garamond'] text-3xl font-semibold leading-none sm:text-4xl">
                {section.title}
              </h2>
              <div className="mt-5 space-y-4 text-sm leading-7 text-[#5e4b59] sm:text-base sm:leading-8">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}

          {policy.resources && (
            <div className="rounded-[26px] border border-[#ddc7d5] bg-[#f1e4ec] p-6 sm:p-8">
              <h2 className="font-['Cormorant_Garamond'] text-3xl font-semibold">
                More information
              </h2>
              <div className="mt-4 flex flex-wrap gap-3">
                {policy.resources.map((resource) => (
                  <a
                    key={resource.href}
                    href={resource.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-[#caa8be] px-4 py-2 text-sm font-semibold text-[#694962] transition hover:bg-white"
                  >
                    {resource.label}
                    <ArrowUpRight size={16} />
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="rounded-[26px] bg-[#2b2029] p-6 text-[#f8f2ec] sm:p-8">
            <h2 className="font-['Cormorant_Garamond'] text-3xl font-semibold">
              Need to ask us something?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#e4d2de]">
              Write to Blabber All Day about this page or information you have
              shared with us.
            </p>
            <a
              href={`mailto:${contactEmail}`}
              className="mt-5 inline-block max-w-full break-all rounded-full bg-[#aa769a] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#8d5c7d]"
            >
              {contactEmail}
            </a>
            <p className="mt-5 text-xs leading-relaxed text-[#d9c4d1]">
              Blabber All Day · {outlets[0].address}
              <br />
              {outlets[0].phone}
            </p>
          </div>
        </div>
      </section>

      <nav
        aria-label="Other policies"
        className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 lg:px-12"
      >
        <p className="mb-4 text-[11px] font-bold uppercase tracking-[.2em] text-[#916382]">
          Other policies
        </p>
        <div className="flex flex-wrap gap-3">
          {policyLinks
            .filter((link) => link.type !== type)
            .map((link) => (
              <Link
                key={link.type}
                to={link.to}
                className="rounded-full border border-[#cfb8c7] px-5 py-2.5 text-sm font-semibold text-[#694962] transition hover:bg-[#eadce5]"
              >
                {link.label}
              </Link>
            ))}
        </div>
      </nav>
    </div>
  )
}
