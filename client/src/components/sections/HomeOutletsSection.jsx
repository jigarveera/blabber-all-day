import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import outlets from '../../data/outlets'
import OutletLocationCard from '../ui/OutletLocationCard'

const carouselOutlets = [outlets[outlets.length - 1], ...outlets, outlets[0]]
const lastRealIndex = outlets.length
const lastCarouselIndex = carouselOutlets.length - 1

export default function HomeOutletsSection() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const activeIndexRef = useRef(1)
  const scrollEndTimerRef = useRef(null)
  const pausedUntilRef = useRef(0)
  const hoveredRef = useRef(false)
  const [activeIndex, setActiveIndex] = useState(1)
  const inView = useInView(sectionRef, { amount: 0.15 })
  const reducedMotion = useReducedMotion()

  const showOutlet = useCallback(
    (index, behavior = 'smooth') => {
      const track = trackRef.current
      const card = track?.children[index]
      if (!track || !card) return

      activeIndexRef.current = index
      setActiveIndex(index)
      track.scrollTo({
        left: card.offsetLeft + card.offsetWidth / 2 - track.clientWidth / 2,
        behavior: reducedMotion || behavior === 'instant' ? 'instant' : 'smooth',
      })
    },
    [reducedMotion],
  )

  const normalizeLoop = useCallback(() => {
    if (activeIndexRef.current === 0) {
      showOutlet(lastRealIndex, 'instant')
    } else if (activeIndexRef.current === lastCarouselIndex) {
      showOutlet(1, 'instant')
    }
  }, [showOutlet])

  useLayoutEffect(() => {
    showOutlet(1, 'instant')
  }, [showOutlet])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return undefined

    track.addEventListener('scrollend', normalizeLoop)
    return () => {
      track.removeEventListener('scrollend', normalizeLoop)
      window.clearTimeout(scrollEndTimerRef.current)
    }
  }, [normalizeLoop])

  useEffect(() => {
    if (!inView || reducedMotion) return undefined

    const timer = window.setInterval(() => {
      if (
        Date.now() < pausedUntilRef.current ||
        hoveredRef.current ||
        trackRef.current?.contains(document.activeElement) ||
        document.querySelector('[role="dialog"][aria-modal="true"]')
      )
        return

      showOutlet(activeIndexRef.current + 1)
    }, 4800)

    return () => window.clearInterval(timer)
  }, [inView, reducedMotion, showOutlet])

  const pauseAutoplay = () => {
    pausedUntilRef.current = Date.now() + 8000
  }

  const updateActiveIndex = () => {
    const track = trackRef.current
    if (!track) return

    const center = track.scrollLeft + track.clientWidth / 2
    let nearest = 0
    let distance = Infinity

    Array.from(track.children).forEach((card, index) => {
      const nextDistance = Math.abs(
        card.offsetLeft + card.offsetWidth / 2 - center,
      )
      if (nextDistance < distance) {
        distance = nextDistance
        nearest = index
      }
    })

    activeIndexRef.current = nearest
    setActiveIndex(nearest)
    window.clearTimeout(scrollEndTimerRef.current)
    scrollEndTimerRef.current = window.setTimeout(normalizeLoop, 200)
  }

  return (
    <section
      ref={sectionRef}
      data-header-theme="dark"
      aria-labelledby="home-outlets-heading"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#251b24] pb-6 pt-[104px] text-[#f8f2ec] sm:pb-10 sm:pt-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_15%,rgba(170,118,154,.22),transparent_42%),radial-gradient(circle_at_100%_70%,rgba(116,67,99,.28),transparent_45%)]" />
      <h2
        id="home-outlets-heading"
        className="relative mx-auto max-w-5xl px-5 text-center font-['Cormorant_Garamond'] text-[clamp(2.75rem,11vw,3.8rem)] font-semibold leading-[.85] tracking-[-.05em] md:text-[clamp(3.8rem,8vw,8rem)]"
      >
        Find a place to <span className="italic text-[#d6a8c5]">linger.</span>
      </h2>

      <div className="relative flex min-h-0 flex-1 items-center">
        <div
          ref={trackRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Blabber All Day outlets"
          onScroll={updateActiveIndex}
          onPointerDown={pauseAutoplay}
          onWheel={pauseAutoplay}
          onMouseEnter={() => {
            hoveredRef.current = true
          }}
          onMouseLeave={() => {
            hoveredRef.current = false
          }}
          onFocusCapture={pauseAutoplay}
          className="relative mx-auto flex w-full max-w-[960px] snap-x snap-mandatory items-center gap-4 overflow-x-auto px-[calc(50%-min(37.5vw,190px))] py-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {carouselOutlets.map((outlet, index) => {
            const clone = index === 0 || index === lastCarouselIndex

            return (
              <div
                key={`${outlet.slug}-${index}`}
                role={clone ? undefined : 'group'}
                aria-roledescription={clone ? undefined : 'slide'}
                aria-label={
                  clone
                    ? undefined
                    : `${index} of ${outlets.length}: ${outlet.name}`
                }
                aria-hidden={clone || undefined}
                inert={clone}
                className={
                  'relative flex w-[min(75vw,380px)] shrink-0 snap-center px-2 transition-transform duration-700 ease-out motion-reduce:transition-none ' +
                  (activeIndex === index ? 'z-10 scale-110' : 'z-0 scale-100')
                }
              >
                <OutletLocationCard
                  outlet={outlet}
                  index={(index - 1 + outlets.length) % outlets.length}
                  headingLevel="h3"
                  uniformHeight
                  autoStart
                  disableEntrance
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
