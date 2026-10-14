import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Phone, ShoppingBag } from 'lucide-react'
import OutletOrderDialog from './OutletOrderDialog'

const nextPhase = {
  map: 'map-to-art',
  'map-to-art': 'art',
  art: 'art-to-map',
  'art-to-map': 'map',
}

export default function OutletLocationCard({
  outlet,
  index = 0,
  headingLevel = 'h2',
  compact = false,
  uniformHeight = false,
  autoStart = false,
  disableEntrance = false,
}) {
  const Heading = headingLevel
  const [started, setStarted] = useState(autoStart)
  const [phase, setPhase] = useState('map')
  const [orderOpen, setOrderOpen] = useState(false)
  const reducedMotion = useReducedMotion()
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(outlet.address)}&output=embed`
  const neighbourhood = outlet.area.split(' · ')[0]
  const moving = phase === 'map-to-art' || phase === 'art-to-map'
  const mapX =
    phase === 'map-to-art' ? '-100%' : phase === 'art' ? '100%' : '0%'
  const artworkX =
    phase === 'map'
      ? '100%'
      : phase === 'art-to-map'
        ? '-100%'
        : '0%'
  const slideTransition = reducedMotion
    ? { duration: 0 }
    : { duration: 0.75, ease: [0.22, 1, 0.36, 1] }

  useEffect(() => {
    if (!started) return undefined

    const delay =
      phase === 'map' ? 4000 : phase === 'art' ? 2000 : reducedMotion ? 0 : 750
    const timer = window.setTimeout(() => setPhase(nextPhase[phase]), delay)
    return () => window.clearTimeout(timer)
  }, [started, phase, reducedMotion])

  return (
    <motion.article
      initial={disableEntrance || reducedMotion ? false : { opacity: 0, y: 28 }}
      whileInView={disableEntrance ? undefined : { opacity: 1, y: 0 }}
      onViewportEnter={() => setStarted(true)}
      viewport={{ once: true, amount: 0.15 }}
      transition={
        reducedMotion
          ? { duration: 0 }
          : { delay: index * 0.14, duration: 0.55, ease: [0.22, 1, 0.36, 1] }
      }
      className={`overflow-hidden rounded-[28px] border border-[#dcc9d5] bg-[#fffaf5] shadow-[0_18px_50px_rgba(43,32,41,.08)] ${compact ? 'flex h-[clamp(424px,calc(56.25vw+205px),464px)] flex-col md:h-[614px]' : uniformHeight ? 'flex w-full flex-1 flex-col' : ''}`}
    >
      <div
        className={`relative overflow-hidden bg-[#332631] ${compact ? 'aspect-[16/9] shrink-0 md:aspect-[5/4]' : uniformHeight ? 'aspect-[5/4] shrink-0' : 'aspect-[5/4]'}`}
      >
        <motion.div
          initial={false}
          animate={{ x: mapX }}
          transition={moving ? slideTransition : { duration: 0 }}
          aria-hidden={phase === 'art'}
          className="pointer-events-none absolute inset-0 bg-[#e9e0e6]"
        >
          <iframe
            title={`Map preview for Blabber All Day ${outlet.name}`}
            src={mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            tabIndex={-1}
            className="h-full w-full border-0"
          />
        </motion.div>
        <motion.img
          src={outlet.image}
          alt={`Blabber All Day ${outlet.name} artwork`}
          initial={{ x: '100%' }}
          animate={{ x: artworkX }}
          transition={moving ? slideTransition : { duration: 0 }}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#211820]/75 via-transparent to-[#211820]/15" />
        <Link
          to={`/outlet/${outlet.slug}`}
          aria-label={`Explore Blabber All Day ${outlet.name}`}
          className="absolute right-4 top-4 z-10 grid size-10 place-items-center rounded-full border border-white/70 bg-[#2b2029]/65 text-white backdrop-blur-sm transition hover:bg-[#aa769a]"
        >
          <ArrowUpRight size={20} />
        </Link>
        <span className="absolute bottom-5 left-5 z-10 max-w-[45%] text-[11px] font-bold uppercase tracking-[.16em] text-white sm:text-xs">
          {neighbourhood}
        </span>
        <span className="absolute bottom-4 right-6 z-10 font-['Cormorant_Garamond'] text-5xl font-semibold leading-none text-white sm:text-6xl">
          {outlet.name}
        </span>
      </div>

      <div
        className={`flex flex-col ${compact ? 'flex-1 gap-2 p-4 md:gap-4 md:p-6' : uniformHeight ? 'flex-1 gap-4 p-4 sm:p-6' : 'gap-4 p-6'}`}
      >
        <Heading
          className={`font-['Cormorant_Garamond'] font-semibold leading-none text-[#2b2029] ${compact ? 'text-2xl md:text-3xl' : 'text-3xl'}`}
        >
          {outlet.line}
        </Heading>
        <p className="text-sm leading-relaxed text-[#65545f]">
          {outlet.address}
        </p>
        <p className="flex items-center gap-2 text-sm font-semibold text-[#5d3d53]">
          <Phone size={16} />
          {outlet.phone}
        </p>
        <div className={`grid grid-cols-2 gap-3 pt-2 ${compact || uniformHeight ? 'mt-auto' : ''}`}>
          <a
            href={`tel:${outlet.phone.replace(/\s/g, '')}`}
            className={`inline-flex min-h-12 items-center justify-center whitespace-nowrap rounded-full border border-[#b78da8] font-bold uppercase tracking-[.07em] text-[#694962] transition hover:bg-[#f0e1eb] ${uniformHeight ? 'gap-1 px-2 text-[10px] sm:gap-2 sm:px-3 sm:text-xs' : 'gap-2 px-3 text-xs'}`}
          >
            Call now
            <Phone size={16} />
          </a>
          <button
            type="button"
            onClick={() => setOrderOpen(true)}
            className={`inline-flex min-h-12 items-center justify-center whitespace-nowrap rounded-full bg-[#aa769a] font-bold uppercase tracking-[.07em] text-white transition hover:bg-[#8d5c7d] ${uniformHeight ? 'gap-1 px-2 text-[10px] sm:gap-2 sm:px-3 sm:text-xs' : 'gap-2 px-3 text-xs'}`}
          >
            Order now
            <ShoppingBag size={16} />
          </button>
        </div>
      </div>
      {orderOpen && (
        <OutletOrderDialog
          outlet={outlet}
          onClose={() => setOrderOpen(false)}
        />
      )}
    </motion.article>
  )
}
