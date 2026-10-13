import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import OutletDropdown from '../ui/OutletDropdown'

const slides = [
  { image: '/images/food-1.webp', alt: 'Fresh Blabber All Day food' },
  { image: '/images/bao.jpg', alt: 'Blabber fried chicken bao' },
  {
    image: '/images/malay-curry.jpg',
    alt: 'Malay fish curry with blue pea rice',
  },
]

const suggestions = [
  'Blabber Fried Chicken Bao',
  'Fettuccine Al Pesto',
  'Diavola Pizza',
  'Avocado Cucumber Sushi',
  'Malay Fish Curry With Blue Pea Rice',
]

export default function MenuHeroSection({
  query,
  setQuery,
  diet,
  setDiet,
  sort,
  setSort,
  outlet,
  onSelectOutlet,
  compact,
  setCompact,
}) {
  const [slide, setSlide] = useState(0)
  const [suggestion, setSuggestion] = useState(0)
  const [suggestionsPaused, setSuggestionsPaused] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const sectionRef = useRef(null)
  const inputRef = useRef(null)
  const hasFocusedSearchRef = useRef(false)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const updatePosition = () => {
      const atTop = sectionRef.current?.getBoundingClientRect().top <= 0
      setCompact(window.scrollY > 12 && atTop)
    }

    updatePosition()
    window.addEventListener('scroll', updatePosition, { passive: true })
    window.addEventListener('resize', updatePosition)
    return () => {
      window.removeEventListener('scroll', updatePosition)
      window.removeEventListener('resize', updatePosition)
    }
  }, [outlet, setCompact])

  useEffect(() => {
    if (!outlet || hasFocusedSearchRef.current) return undefined
    const timer = window.setTimeout(() => {
      inputRef.current?.focus({ preventScroll: true })
      hasFocusedSearchRef.current = true
    }, 650)
    return () => window.clearTimeout(timer)
  }, [outlet])

  useEffect(() => {
    const timer = window.setInterval(
      () => setSlide((index) => (index + 1) % slides.length),
      5000,
    )
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    if (query || suggestionsPaused) return undefined
    const timer = window.setInterval(
      () => setSuggestion((index) => (index + 1) % suggestions.length),
      2000,
    )
    return () => window.clearInterval(timer)
  }, [query, suggestionsPaused])

  const selectSuggestion = (name) => {
    setQuery(name)
    inputRef.current?.focus({ preventScroll: true })
  }

  return (
    <section
      ref={sectionRef}
      className={
        'sticky top-0 z-40 bg-[#191518] transition-[padding] duration-500 ease-in-out motion-reduce:transition-none ' +
        (compact
          ? 'px-0 pt-0'
          : 'px-5 pt-24 sm:px-8 sm:pt-28 lg:px-12')
      }
    >
      <div
        className={
          'relative mx-auto border border-[#6c5264] bg-[#261c21] transition-[height,max-width,border-radius] duration-500 ease-in-out motion-reduce:transition-none ' +
          (compact
            ? 'h-[148px] w-full max-w-none rounded-b-[24px] rounded-t-none border-t-0 sm:h-[246px] sm:rounded-b-[28px]'
            : 'h-[clamp(245px,76vw,340px)] max-w-7xl rounded-[28px] sm:h-[440px] lg:h-[500px]')
        }
      >
        <div className="absolute inset-0 overflow-hidden rounded-[inherit]">
          {slides.map((item, index) => (
            <img
              key={item.image}
              src={item.image}
              alt={index === slide ? item.alt : ''}
              aria-hidden={index !== slide}
              className={
                'absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ' +
                (index === slide ? 'opacity-100' : 'opacity-0')
              }
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/20" />
        </div>

        {outlet && (
          <OutletDropdown
            outlet={outlet}
            onSelect={onSelectOutlet}
            compact={compact}
          />
        )}

        {!compact && (
          <div
            className="absolute inset-x-0 bottom-[62px] z-10 flex items-center justify-center gap-1.5"
            aria-label="Carousel slides"
          >
            {slides.map((item, index) => (
              <button
                key={item.image}
                type="button"
                onClick={() => setSlide(index)}
                aria-label={`Show slide ${index + 1}`}
                aria-current={index === slide ? 'true' : undefined}
                className={
                  'h-1.5 rounded-full transition-all duration-300 ' +
                  (index === slide ? 'w-6 bg-[#d6a8c5]' : 'w-1.5 bg-white/80')
                }
              />
            ))}
          </div>
        )}

        <div
          className={
            'absolute inset-x-3 z-10 mx-auto flex max-w-xl items-center gap-2 sm:inset-x-4 sm:bottom-4 sm:gap-4 ' +
            (compact ? 'bottom-4' : 'bottom-3')
          }
        >
          <div className="flex h-10 min-w-0 flex-1 items-center gap-2 rounded-full border border-[#d8d0d4] bg-white px-3 text-[#938d8d] shadow-lg focus-within:ring-2 focus-within:ring-[#cf9fbd] sm:h-14 sm:gap-2.5 sm:px-5">
            <Search
              size={19}
              strokeWidth={1.7}
              className="shrink-0"
            />
            <div className="relative min-w-0 flex-1">
              <input
                ref={inputRef}
                type="text"
                role="searchbox"
                enterKeyHint="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                aria-label="Search the menu"
                className="relative z-0 w-full bg-transparent text-sm text-[#241d20] outline-none"
              />
              {!query && (
                <AnimatePresence
                  initial={false}
                  mode="wait"
                >
                  <motion.div
                    key={suggestion}
                    initial={reducedMotion ? false : { y: 18, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={reducedMotion ? undefined : { y: -18, opacity: 0 }}
                    transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                    onMouseEnter={() => setSuggestionsPaused(true)}
                    onMouseLeave={() => setSuggestionsPaused(false)}
                    onFocusCapture={() => setSuggestionsPaused(true)}
                    onBlurCapture={() => setSuggestionsPaused(false)}
                    className="pointer-events-none absolute inset-0 z-10 flex items-center overflow-hidden whitespace-nowrap text-sm"
                  >
                    <span className="text-[#a29a9f]">Looking for&nbsp;</span>
                    <a
                      href="#menu-results"
                      onClick={() => selectSuggestion(suggestions[suggestion])}
                      className="pointer-events-auto truncate font-semibold text-[#875574] underline underline-offset-2"
                    >
                      {suggestions[suggestion]}
                    </a>
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery('')
                  inputRef.current?.focus({ preventScroll: true })
                }}
                aria-label="Clear search"
                className="shrink-0 text-[#827a7e]"
              >
                <X size={17} />
              </button>
            )}
          </div>
          <button
            type="button"
            aria-label="Menu filters"
            aria-expanded={filtersOpen}
            aria-controls="menu-filters"
            onClick={() => setFiltersOpen((value) => !value)}
            className="grid size-10 shrink-0 place-items-center rounded-full border border-[#d8d0d4] bg-white text-[#292427] shadow-lg transition hover:bg-[#f3e6ed] sm:size-14"
          >
            <SlidersHorizontal size={18} />
          </button>
        </div>

        {filtersOpen && (
          <div
            id="menu-filters"
            className={
              'absolute right-4 z-20 w-[min(320px,calc(100%-2rem))] rounded-2xl border border-[#77576b] bg-[#2b2229] p-5 text-[#f5ede3] shadow-2xl sm:right-7 ' +
              (compact ? 'top-full mt-2' : 'bottom-20 sm:bottom-24')
            }
          >
            <div className="flex items-center justify-between">
              <h2 className="font-['Cormorant_Garamond'] text-2xl">
                Filter menu
              </h2>
              <button
                type="button"
                onClick={() => setFiltersOpen(false)}
                aria-label="Close filters"
                className="rounded-full p-1 hover:bg-[#4a3543]"
              >
                <X size={18} />
              </button>
            </div>
            <label className="mt-5 block text-xs font-bold uppercase tracking-[.13em] text-[#d4a8c2]">
              Diet
              <select
                value={diet}
                onChange={(event) => setDiet(event.target.value)}
                className="mt-2 h-11 w-full rounded-xl border border-[#78576b] bg-[#211a20] px-3 text-sm font-normal normal-case tracking-normal text-[#f5ede3]"
              >
                <option>All</option>
                <option>Veg</option>
                <option>Non-veg</option>
                <option>Egg</option>
              </select>
            </label>
            <label className="mt-4 block text-xs font-bold uppercase tracking-[.13em] text-[#d4a8c2]">
              Sort by
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                className="mt-2 h-11 w-full rounded-xl border border-[#78576b] bg-[#211a20] px-3 text-sm font-normal normal-case tracking-normal text-[#f5ede3]"
              >
                <option value="featured">Menu order</option>
                <option value="az">Name A–Z</option>
                <option value="za">Name Z–A</option>
              </select>
            </label>
            <button
              type="button"
              onClick={() => setFiltersOpen(false)}
              className="mt-5 w-full rounded-full bg-[#aa769a] px-4 py-3 text-xs font-bold uppercase tracking-[.12em] text-[#191518]"
            >
              Show dishes
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
