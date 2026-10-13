import { useEffect, useRef, useState } from 'react'
import { SearchX } from 'lucide-react'
import MenuCard from '../ui/MenuCard'

const BATCH_SIZE = 48

export default function MenuGridSection({
  items,
  resetFilters,
  showOutlet = false,
}) {
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE)
  const loadMoreRef = useRef(null)
  const hasMore = visibleCount < items.length

  useEffect(() => {
    if (
      !hasMore ||
      !loadMoreRef.current ||
      !('IntersectionObserver' in window)
    ) {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((current) =>
            Math.min(current + BATCH_SIZE, items.length),
          )
        }
      },
      { rootMargin: '600px' },
    )

    observer.observe(loadMoreRef.current)
    return () => observer.disconnect()
  }, [hasMore, items.length, visibleCount])

  return (
    <section
      id="menu-results"
      className="mx-auto max-w-7xl scroll-mt-24 px-5 pb-24 pt-3 sm:px-8 lg:px-12"
    >
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[.2em] text-[#cba0bd]">
            Made for every craving
          </p>
          <h2 className="mt-2 font-['Cormorant_Garamond'] text-4xl tracking-[-.04em] text-[#f5ede3] sm:text-5xl">
            Menu
          </h2>
        </div>
        <span className="pb-1 text-xs text-[#b6a9b0]">
          {items.length} {items.length === 1 ? 'dish' : 'dishes'}
        </span>
      </div>

      {items.length ? (
        <div className="grid grid-cols-2 items-start gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {items.slice(0, visibleCount).map((item, index) => (
            <MenuCard
              key={item.id}
              item={item}
              showOutlet={showOutlet}
              variant={index % 2 === 0 ? 'light' : 'dark'}
              mobileVariant={['dark', 'light', 'light', 'dark'][index % 4]}
            />
          ))}
        </div>
      ) : (
        <div
          role="status"
          className="flex flex-col items-center rounded-3xl border border-[#604655] bg-[#282126] px-5 py-16 text-center"
        >
          <SearchX
            size={30}
            className="text-[#cba0bd]"
          />
          <h3 className="mt-4 font-['Cormorant_Garamond'] text-3xl">
            No dishes found
          </h3>
          <p className="mt-2 text-sm text-[#c9bcc3]">
            Try another search or category.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-5 rounded-full bg-[#aa769a] px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#191518]"
          >
            Reset filters
          </button>
        </div>
      )}

      {hasMore && (
        <div
          ref={loadMoreRef}
          className="mt-8 flex justify-center"
        >
          <button
            type="button"
            onClick={() =>
              setVisibleCount((current) =>
                Math.min(current + BATCH_SIZE, items.length),
              )
            }
            className="rounded-full border border-[#aa769a] px-6 py-3 text-xs font-bold uppercase tracking-[.12em] text-[#f5ede3] transition hover:bg-[#aa769a]"
          >
            Show more dishes
          </button>
        </div>
      )}

      <p className="mt-8 border-t border-[#4c3a46] pt-5 text-xs leading-relaxed text-[#a99aa3]">
        Menu items come from Zomato listings. Check each ordering app for
        current availability and prices.
      </p>
    </section>
  )
}
