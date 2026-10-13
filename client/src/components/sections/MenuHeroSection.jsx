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
}) {
  const [slide, setSlide] = useState(0)
  const [suggestion, setSuggestion] = useState(0)
  const [suggestionsPaused, setSuggestionsPaused] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const inputRef = useRef(null)
  const hasFocusedSearchRef = useRef(false)
  const reducedMotion = useReducedMotion()

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
    <section className="bg-[#191518] px-4 pb-8 sm:px-8 lg:px-12">
      <div className="relative mx-auto h-[340px] max-w-7xl overflow-hidden rounded-[28px] border border-[#6c5264] bg-[#261c21] sm:h-[440px] lg:h-[500px]">
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

        {outlet && (
          <OutletDropdown
            outlet={outlet}
            onSelect={onSelectOutlet}
          />
        )}

        <div
          className="absolute inset-x-0 bottom-[88px] z-10 flex justify-center gap-2 sm:bottom-[105px]"
          role="group"
          aria-label="Carousel slides"
        >
          {slides.map((item, index) => (
            <button
              key={item.image}
              type="button"
              aria-label={'Show slide ' + (index + 1)}
              aria-current={slide === index}
              onClick={() => setSlide(index)}
              className={
                'h-1.5 rounded-full transition-all ' +
                (slide === index
                  ? 'w-7 bg-[#d6a8c5]'
                  : 'w-2 bg-white/70 hover:bg-white')
              }
            />
          ))}
        </div>

        <div className="absolute inset-x-4 bottom-5 z-10 mx-auto flex max-w-xl items-center gap-2 sm:bottom-7 sm:gap-3">
          <div className="flex h-12 min-w-0 flex-1 items-center gap-2.5 rounded-full border border-[#d8d0d4] bg-white px-4 text-[#938d8d] shadow-lg focus-within:ring-2 focus-within:ring-[#cf9fbd] sm:h-14 sm:px-5">
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
            className="grid size-12 shrink-0 place-items-center rounded-full border border-[#d8d0d4] bg-white text-[#292427] shadow-lg transition hover:bg-[#f3e6ed] sm:size-14"
          >
            <SlidersHorizontal size={18} />
          </button>
        </div>

        {filtersOpen && (
          <div
            id="menu-filters"
            className="absolute bottom-20 right-4 z-20 w-[min(320px,calc(100%-2rem))] rounded-2xl border border-[#77576b] bg-[#2b2229] p-5 text-[#f5ede3] shadow-2xl sm:bottom-24 sm:right-7"
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
